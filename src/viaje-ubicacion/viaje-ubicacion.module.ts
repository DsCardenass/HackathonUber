import { Module } from '@nestjs/common';
import { ViajeUbicacionService } from './viaje-ubicacion.service';

@Module({
  providers: [ViajeUbicacionService]
})
export class ViajeUbicacionModule {}
