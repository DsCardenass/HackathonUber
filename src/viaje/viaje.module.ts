import { Module } from '@nestjs/common';
import { ViajeService } from './viaje.service';
import { ViajeEntity } from './viaje.entity/viaje.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ViajeEntity])],
  providers: [ViajeService]
})
export class ViajeModule {}
