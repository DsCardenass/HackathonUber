import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConductorEntity } from 'src/conductor/conductor.entity/conductor.entity';
import { ViajeEntity } from 'src/viaje/viaje.entity/viaje.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class ConductorViajeService {
    constructor(
        @InjectRepository(ConductorEntity)
        private readonly conductorRepository: Repository<ConductorEntity>,

        @InjectRepository(ViajeEntity)
        private readonly viajeRepository: Repository<ViajeEntity>
    ) { }

    async addConductorViaje(conductorId: string, viajeId: string): Promise<ConductorEntity> {
        const viaje = await this.viajeRepository.findOne(viajeId);
        if (!viaje) {
          throw new BusinessLogicException("El viaje no fue encontrado", BusinessError.NOT_FOUND);
        }
        const conductor = await this.conductorRepository.findOne({
          where: { id: conductorId },
          relations: ["viaje"],
        });
        if (!conductor) {
          throw new BusinessLogicException("El conductor no fue encontrado", BusinessError.NOT_FOUND);
        }
        if (conductor.viaje) {
          throw new BusinessLogicException("El conductor ya tiene un viaje asignado", BusinessError.INVALID_DATA);
        }
        conductor.viaje = viaje;
        return await this.conductorRepository.save(conductor);
      }
    
      async findViajeByConductorIdViajeId(conductorId: string, viajeId: string): Promise<ViajeEntity> {
        const viaje: ViajeEntity = await this.viajeRepository.findOne({ where: { id: viajeId } });
        if (!viaje)
          throw new BusinessLogicException("The viaje with the given id was not found", BusinessError.NOT_FOUND)
    
        const conductor: ConductorEntity = await this.conductorRepository.findOne({ where: { id: conductorId }, relations: ["viajes"] });
        if (!conductor)
          throw new BusinessLogicException("The conductor with the given id was not found", BusinessError.NOT_FOUND)
    
        const conductorViaje: ViajeEntity = conductor.viaje.find(e => e.id === viaje.id);
    
        if (!conductorViaje)
          throw new BusinessLogicException("The viaje with the given id is not associated to the conductor", BusinessError.PRECONDITION_FAILED)
    
        return conductorViaje;
      }
    
      async findViajesByConductorId(conductorId: string): Promise<ViajeEntity[]> {
        const conductor: ConductorEntity = await this.conductorRepository.findOne({ where: { id: conductorId }, relations: ["viajes"] });
        if (!conductor)
          throw new BusinessLogicException("The conductor with the given id was not found", BusinessError.NOT_FOUND)
    
        return conductor.viaje;
      }
    
      async associateViajesConductor(conductorId: string, viajes: ViajeEntity[]): Promise<ConductorEntity> {
        const conductor: ConductorEntity = await this.conductorRepository.findOne({ where: { id: conductorId }, relations: ["viajes"] });
    
        if (!conductor)
          throw new BusinessLogicException("The conductor with the given id was not found", BusinessError.NOT_FOUND)
    
        for (let i = 0; i < viajes.length; i++) {
          const viaje: ViajeEntity = await this.viajeRepository.findOne({ where: { id: viajes[i].id } });
          if (!viaje)
            throw new BusinessLogicException("The viaje with the given id was not found", BusinessError.NOT_FOUND)
        }
    
        conductor.viaje = viajes;
        return await this.conductorRepository.save(conductor);
      }
    
      async deleteViajeConductor(conductorId: string, viajeId: string) {
        const viaje: ViajeEntity = await this.viajeRepository.findOne({ where: { id: viajeId } });
        if (!viaje)
          throw new BusinessLogicException("The viaje with the given id was not found", BusinessError.NOT_FOUND)
    
        const conductor: ConductorEntity = await this.conductorRepository.findOne({ where: { id: conductorId }, relations: ["viajes"] });
        if (!conductor)
          throw new BusinessLogicException("The conductor with the given id was not found", BusinessError.NOT_FOUND)
    
        const conductorViaje: ViajeEntity = conductor.viaje.find(e => e.id === viaje.id);
    
        if (!conductorViaje)
          throw new BusinessLogicException("The viaje with the given id is not associated to the conductor", BusinessError.PRECONDITION_FAILED)
    
        conductor.viaje = conductor.viaje.filter(e => e.id !== viajeId);
        await this.conductorRepository.save(conductor);
      }
}
