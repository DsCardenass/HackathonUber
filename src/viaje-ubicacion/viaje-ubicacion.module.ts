import { Module } from '@nestjs/common';
import { ViajeUbicacionService } from './viaje-ubicacion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViajeEntity } from 'src/viaje/viaje.entity/viaje.entity';
import { UbicacionEntity } from 'src/ubicacion/ubicacion.entity/ubicacion.entity';

@Module({
  providers: [ViajeUbicacionService],
  imports: [TypeOrmModule.forFeature([ViajeEntity, UbicacionEntity])],
})
export class ViajeUbicacionModule {}
