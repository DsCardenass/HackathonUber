import { Module } from '@nestjs/common';
import { ConductorViajeService } from './conductor-viaje.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConductorEntity } from 'src/conductor/conductor.entity/conductor.entity';
import { ViajeEntity } from 'src/viaje/viaje.entity/viaje.entity';

@Module({
  providers: [ConductorViajeService],
  imports: [TypeOrmModule.forFeature([ConductorEntity, ViajeEntity])],
})
export class ConductorViajeModule {}
