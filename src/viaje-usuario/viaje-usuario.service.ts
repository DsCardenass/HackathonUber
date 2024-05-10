import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/usuario.entity/usuario.entity';
import { ViajeEntity } from 'src/viaje/viaje.entity/viaje.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class ViajeUsuarioService {
    constructor(
        @InjectRepository(ViajeEntity)
        private readonly viajeRepository: Repository<ViajeEntity>,

        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>
    ) { }

    async addViajeUsuario(viajeId: string, usuarioId: string): Promise<ViajeEntity> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({ where: { id: usuarioId } });
        if (!usuario)
          throw new BusinessLogicException("El usuario no fue encontrado", BusinessError.NOT_FOUND);
    
        const viaje: ViajeEntity = await this.viajeRepository.findOne({ where: { id: viajeId }, relations: ["viaje", "usuario"] })
        if (!viaje)
          throw new BusinessLogicException("El viaje no fue encontrado", BusinessError.NOT_FOUND);
    
        viaje.usuario = [...viaje.usuario, usuario];
        return await this.viajeRepository.save(viaje);
      }
    
      async findUsuarioByViajeIdUsuarioId(viajeId: string, usuarioId: string): Promise<UsuarioEntity> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({ where: { id: usuarioId } });
        if (!usuario)
          throw new BusinessLogicException("The usuario with the given id was not found", BusinessError.NOT_FOUND)
    
        const viaje: ViajeEntity = await this.viajeRepository.findOne({ where: { id: viajeId }, relations: ["usuario"] });
        if (!viaje)
          throw new BusinessLogicException("The viaje with the given id was not found", BusinessError.NOT_FOUND)
    
        const viajeUsuario: UsuarioEntity = viaje.usuario.find(e => e.id === usuario.id);
    
        if (!viajeUsuario)
          throw new BusinessLogicException("The usuario with the given id is not associated to the viaje", BusinessError.PRECONDITION_FAILED)
    
        return viajeUsuario;
      }
    
      async findUsuariosByViajeId(viajeId: string): Promise<UsuarioEntity[]> {
        const viaje: ViajeEntity = await this.viajeRepository.findOne({ where: { id: viajeId }, relations: ["usuarios"] });
        if (!viaje)
          throw new BusinessLogicException("The viaje with the given id was not found", BusinessError.NOT_FOUND)
    
        return viaje.usuario;
      }
    
      async associateUsuariosViaje(viajeId: string, usuarios: UsuarioEntity[]): Promise<ViajeEntity> {
        const viaje: ViajeEntity = await this.viajeRepository.findOne({ where: { id: viajeId }, relations: ["usuarios"] });
    
        if (!viaje)
          throw new BusinessLogicException("The viaje with the given id was not found", BusinessError.NOT_FOUND)
    
        for (let i = 0; i < usuarios.length; i++) {
          const usuario: UsuarioEntity = await this.usuarioRepository.findOne({ where: { id: usuarios[i].id } });
          if (!usuario)
            throw new BusinessLogicException("The usuario with the given id was not found", BusinessError.NOT_FOUND)
        }
    
        viaje.usuario = usuarios;
        return await this.viajeRepository.save(viaje);
      }
    
      async deleteUsuarioViaje(viajeId: string, usuarioId: string) {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({ where: { id: usuarioId } });
        if (!usuario)
          throw new BusinessLogicException("The usuario with the given id was not found", BusinessError.NOT_FOUND)
    
        const viaje: ViajeEntity = await this.viajeRepository.findOne({ where: { id: viajeId }, relations: ["usuarios"] });
        if (!viaje)
          throw new BusinessLogicException("The viaje with the given id was not found", BusinessError.NOT_FOUND)
    
        const viajeUsuario: UsuarioEntity = viaje.usuario.find(e => e.id === usuario.id);
    
        if (!viajeUsuario)
          throw new BusinessLogicException("The usuario with the given id is not associated to the viaje", BusinessError.PRECONDITION_FAILED)
    
        viaje.usuario = viaje.usuario.filter(e => e.id !== usuarioId);
        await this.viajeRepository.save(viaje);
      }
}
