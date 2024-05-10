import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UbicacionEntity } from 'src/ubicacion/ubicacion.entity/ubicacion.entity';
import { ViajeEntity } from 'src/viaje/viaje.entity/viaje.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class ViajeUbicacionService {
    constructor(
        @InjectRepository(ViajeEntity)
        private readonly viajeRepository: Repository<ViajeEntity>,

        @InjectRepository(UbicacionEntity)
        private readonly ubicacionRepository: Repository<UbicacionEntity>
    ) { }

    async addViajeUbicacion(viajeId: string, ubicacionId: string): Promise<ViajeEntity> {
        const ubicacion: UbicacionEntity = await this.ubicacionRepository.findOne({ where: { id: ubicacionId } });
        if (!ubicacion)
          throw new BusinessLogicException("El ubicacion no fue encontrado", BusinessError.NOT_FOUND);
    
        const viaje: ViajeEntity = await this.viajeRepository.findOne({ where: { id: viajeId }, relations: ["viaje", "ubicacion"] })
        if (!viaje)
          throw new BusinessLogicException("El viaje no fue encontrado", BusinessError.NOT_FOUND);
    
        viaje.ubicacion = [...viaje.ubicacion, ubicacion];
        return await this.viajeRepository.save(viaje);
      }
    
      async findUbicacionByViajeIdUbicacionId(viajeId: string, ubicacionId: string): Promise<UbicacionEntity> {
        const ubicacion: UbicacionEntity = await this.ubicacionRepository.findOne({ where: { id: ubicacionId } });
        if (!ubicacion)
          throw new BusinessLogicException("The ubicacion with the given id was not found", BusinessError.NOT_FOUND)
    
        const viaje: ViajeEntity = await this.viajeRepository.findOne({ where: { id: viajeId }, relations: ["ubicacion"] });
        if (!viaje)
          throw new BusinessLogicException("The viaje with the given id was not found", BusinessError.NOT_FOUND)
    
        const viajeUbicacion: UbicacionEntity = viaje.ubicacion.find(e => e.id === ubicacion.id);
    
        if (!viajeUbicacion)
          throw new BusinessLogicException("The ubicacion with the given id is not associated to the viaje", BusinessError.PRECONDITION_FAILED)
    
        return viajeUbicacion;
      }
    
      async findUbicacionsByViajeId(viajeId: string): Promise<UbicacionEntity[]> {
        const viaje: ViajeEntity = await this.viajeRepository.findOne({ where: { id: viajeId }, relations: ["ubicacions"] });
        if (!viaje)
          throw new BusinessLogicException("The viaje with the given id was not found", BusinessError.NOT_FOUND)
    
        return viaje.ubicacion;
      }
    
      async associateUbicacionsViaje(viajeId: string, ubicacions: UbicacionEntity[]): Promise<ViajeEntity> {
        const viaje: ViajeEntity = await this.viajeRepository.findOne({ where: { id: viajeId }, relations: ["ubicacions"] });
    
        if (!viaje)
          throw new BusinessLogicException("The viaje with the given id was not found", BusinessError.NOT_FOUND)
    
        for (let i = 0; i < ubicacions.length; i++) {
          const ubicacion: UbicacionEntity = await this.ubicacionRepository.findOne({ where: { id: ubicacions[i].id } });
          if (!ubicacion)
            throw new BusinessLogicException("The ubicacion with the given id was not found", BusinessError.NOT_FOUND)
        }
    
        viaje.ubicacion = ubicacions;
        return await this.viajeRepository.save(viaje);
      }
    
      async deleteUbicacionViaje(viajeId: string, ubicacionId: string) {
        const ubicacion: UbicacionEntity = await this.ubicacionRepository.findOne({ where: { id: ubicacionId } });
        if (!ubicacion)
          throw new BusinessLogicException("The ubicacion with the given id was not found", BusinessError.NOT_FOUND)
    
        const viaje: ViajeEntity = await this.viajeRepository.findOne({ where: { id: viajeId }, relations: ["ubicacions"] });
        if (!viaje)
          throw new BusinessLogicException("The viaje with the given id was not found", BusinessError.NOT_FOUND)
    
        const viajeUbicacion: UbicacionEntity = viaje.ubicacion.find(e => e.id === ubicacion.id);
    
        if (!viajeUbicacion)
          throw new BusinessLogicException("The ubicacion with the given id is not associated to the viaje", BusinessError.PRECONDITION_FAILED)
    
        viaje.ubicacion = viaje.ubicacion.filter(e => e.id !== ubicacionId);
        await this.viajeRepository.save(viaje);
      }
}
