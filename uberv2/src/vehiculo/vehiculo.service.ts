import { Injectable } from '@nestjs/common';
import { VehiculoEntity } from './vehiculo.entity/vehiculo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VehiculoService {constructor(
    @InjectRepository(VehiculoEntity)
    private readonly vehiculoRepository: Repository<VehiculoEntity>
){}}
