import { Test, TestingModule } from '@nestjs/testing';
import { ConductorViajeService } from './conductor-viaje.service';

describe('ConductorViajeService', () => {
  let service: ConductorViajeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConductorViajeService],
    }).compile();

    service = module.get<ConductorViajeService>(ConductorViajeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
