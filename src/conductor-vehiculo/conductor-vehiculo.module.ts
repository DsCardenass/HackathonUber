import { Module } from '@nestjs/common';
import { ConductorVehiculoService } from './conductor-vehiculo.service';

@Module({
  providers: [ConductorVehiculoService]
})
export class ConductorVehiculoModule {}
