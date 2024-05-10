import { Injectable } from '@nestjs/common';
import { ViajeEntity } from './viaje.entity/viaje.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ViajeService { constructor(
    @InjectRepository(ViajeEntity)
    private readonly viajeRepository: Repository<ViajeEntity>
){}}
