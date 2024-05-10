import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConductorEntity } from 'src/conductor/conductor.entity/conductor.entity';
import { VehiculoEntity } from 'src/vehiculo/vehiculo.entity/vehiculo.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class ConductorVehiculoService {
  constructor(
    @InjectRepository(ConductorEntity)
    private readonly conductorRepository: Repository<ConductorEntity>,

    @InjectRepository(VehiculoEntity)
    private readonly vehiculoRepository: Repository<VehiculoEntity>
  ) { }

  async addConductorVehiculo(conductorId: string, vehiculoId: string): Promise<ConductorEntity> {
    const vehiculo: VehiculoEntity = await this.vehiculoRepository.findOne({ where: { id: vehiculoId } });
    if (!vehiculo)
      throw new BusinessLogicException("El vehiculo no fue encontrado", BusinessError.NOT_FOUND);

    const conductor: ConductorEntity = await this.conductorRepository.findOne({ where: { id: conductorId }, relations: ["viaje", "vehiculo"] })
    if (!conductor)
      throw new BusinessLogicException("El conductor no fue encontrado", BusinessError.NOT_FOUND);

    conductor.vehiculo = [...conductor.vehiculo, vehiculo];
    return await this.conductorRepository.save(conductor);
  }

  async findVehiculoByConductorIdVehiculoId(conductorId: string, vehiculoId: string): Promise<VehiculoEntity> {
    const vehiculo: VehiculoEntity = await this.vehiculoRepository.findOne({ where: { id: vehiculoId } });
    if (!vehiculo)
      throw new BusinessLogicException("The vehiculo with the given id was not found", BusinessError.NOT_FOUND)

    const conductor: ConductorEntity = await this.conductorRepository.findOne({ where: { id: conductorId }, relations: ["vehiculo"] });
    if (!conductor)
      throw new BusinessLogicException("The conductor with the given id was not found", BusinessError.NOT_FOUND)

    const conductorVehiculo: VehiculoEntity = conductor.vehiculo.find(e => e.id === vehiculo.id);

    if (!conductorVehiculo)
      throw new BusinessLogicException("The vehiculo with the given id is not associated to the conductor", BusinessError.PRECONDITION_FAILED)

    return conductorVehiculo;
  }

  async findVehiculosByConductorId(conductorId: string): Promise<VehiculoEntity[]> {
    const conductor: ConductorEntity = await this.conductorRepository.findOne({ where: { id: conductorId }, relations: ["vehiculos"] });
    if (!conductor)
      throw new BusinessLogicException("The conductor with the given id was not found", BusinessError.NOT_FOUND)

    return conductor.vehiculo;
  }

  async associateVehiculosConductor(conductorId: string, vehiculos: VehiculoEntity[]): Promise<ConductorEntity> {
    const conductor: ConductorEntity = await this.conductorRepository.findOne({ where: { id: conductorId }, relations: ["vehiculos"] });

    if (!conductor)
      throw new BusinessLogicException("The conductor with the given id was not found", BusinessError.NOT_FOUND)

    for (let i = 0; i < vehiculos.length; i++) {
      const vehiculo: VehiculoEntity = await this.vehiculoRepository.findOne({ where: { id: vehiculos[i].id } });
      if (!vehiculo)
        throw new BusinessLogicException("The vehiculo with the given id was not found", BusinessError.NOT_FOUND)
    }

    conductor.vehiculo = vehiculos;
    return await this.conductorRepository.save(conductor);
  }

  async deleteVehiculoConductor(conductorId: string, vehiculoId: string) {
    const vehiculo: VehiculoEntity = await this.vehiculoRepository.findOne({ where: { id: vehiculoId } });
    if (!vehiculo)
      throw new BusinessLogicException("The vehiculo with the given id was not found", BusinessError.NOT_FOUND)

    const conductor: ConductorEntity = await this.conductorRepository.findOne({ where: { id: conductorId }, relations: ["vehiculos"] });
    if (!conductor)
      throw new BusinessLogicException("The conductor with the given id was not found", BusinessError.NOT_FOUND)

    const conductorVehiculo: VehiculoEntity = conductor.vehiculo.find(e => e.id === vehiculo.id);

    if (!conductorVehiculo)
      throw new BusinessLogicException("The vehiculo with the given id is not associated to the conductor", BusinessError.PRECONDITION_FAILED)

    conductor.vehiculo = conductor.vehiculo.filter(e => e.id !== vehiculoId);
    await this.conductorRepository.save(conductor);
  }
}
