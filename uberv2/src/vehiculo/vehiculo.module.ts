import { Module } from '@nestjs/common';
import { VehiculoService } from './vehiculo.service';
import { VehiculoEntity } from './vehiculo.entity/vehiculo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([VehiculoEntity])],
  providers: [VehiculoService]
})
export class VehiculoModule {}
