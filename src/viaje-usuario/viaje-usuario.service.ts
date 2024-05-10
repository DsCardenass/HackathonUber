import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/usuario.entity/usuario.entity';
import { ViajeEntity } from 'src/viaje/viaje.entity/viaje.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ViajeUsuarioService {
    constructor(
        @InjectRepository(ViajeEntity)
        private readonly viajeRepository: Repository<ViajeEntity>,

        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>
    ) { }
}
