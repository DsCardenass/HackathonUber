import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { ViajeModule } from './viaje/viaje.module';
import { UbicacionModule } from './ubicacion/ubicacion.module';
import { ConductorModule } from './conductor/conductor.module';

@Module({
  imports: [ViajeModule, UbicacionModule, ConductorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
