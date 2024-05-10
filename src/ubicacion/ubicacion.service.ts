import { Injectable } from '@nestjs/common';
import { UbicacionEntity } from './ubicacion.entity/ubicacion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UbicacionService {
    constructor(
        @InjectRepository(UbicacionEntity)
        private readonly ubicacionRepository: Repository<UbicacionEntity>
    ){}
}
