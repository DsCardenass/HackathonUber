import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UbicacionEntity } from 'src/ubicacion/ubicacion.entity/ubicacion.entity';
import { ViajeEntity } from 'src/viaje/viaje.entity/viaje.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ViajeUbicacionService {
    constructor(
        @InjectRepository(ViajeEntity)
        private readonly viajeRepository: Repository<ViajeEntity>,

        @InjectRepository(UbicacionEntity)
        private readonly ubicacionRepository: Repository<UbicacionEntity>
    ) { }
}
