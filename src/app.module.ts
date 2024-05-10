import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { ViajeModule } from './viaje/viaje.module';
import { UbicacionModule } from './ubicacion/ubicacion.module';
import { ConductorModule } from './conductor/conductor.module';
import { ConductorVehiculoModule } from './conductor-vehiculo/conductor-vehiculo.module';
import { ConductorViajeModule } from './conductor-viaje/conductor-viaje.module';
import { ViajeUbicacionModule } from './viaje-ubicacion/viaje-ubicacion.module';
import { ViajeUsuarioModule } from './viaje-usuario/viaje-usuario.module';

@Module({
  imports: [ViajeModule, UbicacionModule, ConductorModule, ConductorVehiculoModule, ConductorViajeModule, ViajeUbicacionModule, ViajeUsuarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
