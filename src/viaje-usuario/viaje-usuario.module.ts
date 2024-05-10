import { Module } from '@nestjs/common';
import { ViajeUsuarioService } from './viaje-usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViajeEntity } from 'src/viaje/viaje.entity/viaje.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity/usuario.entity';

@Module({
  providers: [ViajeUsuarioService],
  imports: [TypeOrmModule.forFeature([ViajeEntity, UsuarioEntity])],
})
export class ViajeUsuarioModule {}
