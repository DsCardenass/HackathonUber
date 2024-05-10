import { Module } from '@nestjs/common';
import { ViajeUsuarioService } from './viaje-usuario.service';

@Module({
  providers: [ViajeUsuarioService]
})
export class ViajeUsuarioModule {}
