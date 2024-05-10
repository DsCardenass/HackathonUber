import { Test, TestingModule } from '@nestjs/testing';
import { ViajeUsuarioService } from './viaje-usuario.service';

describe('ViajeUsuarioService', () => {
  let service: ViajeUsuarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ViajeUsuarioService],
    }).compile();

    service = module.get<ViajeUsuarioService>(ViajeUsuarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
