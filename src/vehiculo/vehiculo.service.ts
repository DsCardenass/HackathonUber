import { Injectable } from '@nestjs/common';
import { VehiculoEntity } from './vehiculo.entity/vehiculo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class VehiculoService {
        constructor(
            @InjectRepository(VehiculoEntity)
            private readonly vehiculoRepository: Repository<VehiculoEntity>
        ) { }

    async findAll(): Promise<VehiculoEntity[]> {
        return await this.vehiculoRepository.find({ relations: ["conductor"] });
    }

    async findOne(id: string): Promise<VehiculoEntity> {
        const vehiculo: VehiculoEntity = await this.vehiculoRepository.findOne({ where: { id }, relations: ["conductor"] });
        if (!vehiculo)
            throw new BusinessLogicException("El vehiculo con el id no fue encontrado", BusinessError.NOT_FOUND);

        return vehiculo;
    }

    async create(vehiculo: VehiculoEntity): Promise<VehiculoEntity> {
        return await this.vehiculoRepository.save(vehiculo);
    }

    async update(id: string, vehiculo: VehiculoEntity): Promise<VehiculoEntity> {
        const persistedVehiculo: VehiculoEntity = await this.vehiculoRepository.findOne({ where: { id } });
        if (!persistedVehiculo)
            throw new BusinessLogicException("El vehiculo con el id no fue encontrado", BusinessError.NOT_FOUND);

        return await this.vehiculoRepository.save({ ...persistedVehiculo, ...vehiculo });
    }

    async delete(id: string) {
        const vehiculo: VehiculoEntity = await this.vehiculoRepository.findOne({ where: { id } });
        if (!vehiculo)
            throw new BusinessLogicException("El vehiculo con el id no fue encontrado", BusinessError.NOT_FOUND);

        await this.vehiculoRepository.remove(vehiculo);
    }
}
