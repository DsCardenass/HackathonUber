import { Test, TestingModule } from '@nestjs/testing';
import { ConductorVehiculoService } from './conductor-vehiculo.service';

describe('ConductorVehiculoService', () => {
  let service: ConductorVehiculoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConductorVehiculoService],
    }).compile();

    service = module.get<ConductorVehiculoService>(ConductorVehiculoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
