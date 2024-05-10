import { Injectable } from '@nestjs/common';
import { ConductorEntity } from './conductor.entity/conductor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ConductorService {
    constructor(
        @InjectRepository(ConductorEntity)
        private readonly conductorRepository: Repository<ConductorEntity>
    ){}
}
