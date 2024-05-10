import { Test, TestingModule } from '@nestjs/testing';
import { ViajeUbicacionService } from './viaje-ubicacion.service';

describe('ViajeUbicacionService', () => {
  let service: ViajeUbicacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ViajeUbicacionService],
    }).compile();

    service = module.get<ViajeUbicacionService>(ViajeUbicacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
