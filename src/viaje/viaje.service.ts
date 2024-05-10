import { Injectable } from '@nestjs/common';
import { ViajeEntity } from './viaje.entity/viaje.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class ViajeService {
        constructor(
            @InjectRepository(ViajeEntity)
            private readonly viajeRepository: Repository<ViajeEntity>
        ) { }
    async findAll(): Promise<ViajeEntity[]> {
        return await this.viajeRepository.find({ relations: ["ubicacion", "conductor", "usuario"] });
    }

    async findOne(id: string): Promise<ViajeEntity> {
        const viaje: ViajeEntity = await this.viajeRepository.findOne({ where: { id }, relations: ["ubicacion", "conductor", "usuario"] });
        if (!viaje)
            throw new BusinessLogicException("El viaje con el id no fue encontrado", BusinessError.NOT_FOUND);

        return viaje;
    }

    async create(viaje: ViajeEntity): Promise<ViajeEntity> {
        return await this.viajeRepository.save(viaje);
    }

    async update(id: string, viaje: ViajeEntity): Promise<ViajeEntity> {
        const persistedViaje: ViajeEntity = await this.viajeRepository.findOne({ where: { id } });
        if (!persistedViaje)
            throw new BusinessLogicException("El viaje con el id no fue encontrado", BusinessError.NOT_FOUND);

        return await this.viajeRepository.save({ ...persistedViaje, ...viaje });
    }

    async delete(id: string) {
        const viaje: ViajeEntity = await this.viajeRepository.findOne({ where: { id } });
        if (!viaje)
            throw new BusinessLogicException("El viaje con el id no fue encontrado", BusinessError.NOT_FOUND);

        await this.viajeRepository.remove(viaje);
    }
}
