import { Injectable } from '@nestjs/common';
import { UbicacionEntity } from './ubicacion.entity/ubicacion.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UbicacionService {
    constructor(
        @InjectRepository(UbicacionEntity)
        private readonly ubicacionRepository: Repository<UbicacionEntity>
    ){}
    
    async findAll(): Promise<UbicacionEntity[]> {
        return await this.ubicacionRepository.find({ relations: ["viaje"] });
    }

    async findOne(id: string): Promise<UbicacionEntity> {
        const ubicacion: UbicacionEntity = await this.ubicacionRepository.findOne({ where: { id }, relations: ["viaje"] });
        if (!ubicacion)
            throw new BusinessLogicException("La ubicacion con el id no fue encontrada", BusinessError.NOT_FOUND);

        return ubicacion;
    }

    async create(ubicacion: UbicacionEntity): Promise<UbicacionEntity> {
        return await this.ubicacionRepository.save(ubicacion);
    }

    async update(id: string, ubicacion: UbicacionEntity): Promise<UbicacionEntity> {
        const persistedUbicacion: UbicacionEntity = await this.ubicacionRepository.findOne({ where: { id } });
        if (!persistedUbicacion)
            throw new BusinessLogicException("La ubicacion con el id no fue encontrada", BusinessError.NOT_FOUND);

        return await this.ubicacionRepository.save({ ...persistedUbicacion, ...ubicacion });
    }

    async delete(id: string) {
        const ubicacion: UbicacionEntity = await this.ubicacionRepository.findOne({ where: { id } });
        if (!ubicacion)
            throw new BusinessLogicException("La ubicacion con el id no fue encontrada", BusinessError.NOT_FOUND);

        await this.ubicacionRepository.remove(ubicacion);
    }
}
