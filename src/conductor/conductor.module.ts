import { Module } from '@nestjs/common';
import { ConductorService } from './conductor.service';
import { ConductorEntity } from './conductor.entity/conductor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ConductorEntity])],
  providers: [ConductorService]
})
export class ConductorModule {}
