import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly museumRepository: Repository<UsuarioEntity>
    ){}
}
