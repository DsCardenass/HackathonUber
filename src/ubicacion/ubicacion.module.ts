import { Module } from '@nestjs/common';
import { UbicacionService } from './ubicacion.service';
import { UbicacionEntity } from './ubicacion.entity/ubicacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UbicacionEntity])],
  providers: [UbicacionService]
})
export class UbicacionModule {}
