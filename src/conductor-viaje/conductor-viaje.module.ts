import { Module } from '@nestjs/common';
import { ConductorViajeService } from './conductor-viaje.service';

@Module({
  providers: [ConductorViajeService]
})
export class ConductorViajeModule {}
