import { Injectable } from '@nestjs/common';
import { ConductorEntity } from './conductor.entity/conductor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class ConductorService {
    constructor(
        @InjectRepository(ConductorEntity)
        private readonly conductorRepository: Repository<ConductorEntity>,
    ) { }

    async findAll(): Promise<ConductorEntity[]> {
        return await this.conductorRepository.find({ relations: ["viaje", "vehiculo"] });
    }

    async findOne(id: string): Promise<ConductorEntity> {
        const conductor: ConductorEntity = await this.conductorRepository.findOne({ where: { id }, relations: ["viaje", "vehiculo"] });
        if (!conductor)
            throw new BusinessLogicException("El conductor con el id no fue encontrado", BusinessError.NOT_FOUND);

        return conductor;
    }

    async create(conductor: ConductorEntity): Promise<ConductorEntity> {
        return await this.conductorRepository.save(conductor);
    }

    async update(id: string, conductor: ConductorEntity): Promise<ConductorEntity> {
        const persistedConductor: ConductorEntity = await this.conductorRepository.findOne({ where: { id } });
        if (!persistedConductor)
            throw new BusinessLogicException("El conductor con el id no fue encontrado", BusinessError.NOT_FOUND);

        return await this.conductorRepository.save({ ...persistedConductor, ...conductor });
    }

    async delete(id: string) {
        const conductor: ConductorEntity = await this.conductorRepository.findOne({ where: { id } });
        if (!conductor)
            throw new BusinessLogicException("El conductor con el id no fue encontrado", BusinessError.NOT_FOUND);

        await this.conductorRepository.remove(conductor);
    }
}
