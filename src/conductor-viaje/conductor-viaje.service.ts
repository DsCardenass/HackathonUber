import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConductorEntity } from 'src/conductor/conductor.entity/conductor.entity';
import { ViajeEntity } from 'src/viaje/viaje.entity/viaje.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConductorViajeService {
    constructor(
        @InjectRepository(ConductorEntity)
        private readonly conductorRepository: Repository<ConductorEntity>,

        @InjectRepository(ViajeEntity)
        private readonly viajeRepository: Repository<ViajeEntity>
    ) { }
}
