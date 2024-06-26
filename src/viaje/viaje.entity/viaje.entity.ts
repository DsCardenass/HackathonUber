import { ConductorEntity } from 'src/conductor/conductor.entity/conductor.entity';
import { UbicacionEntity } from 'src/ubicacion/ubicacion.entity/ubicacion.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity/usuario.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';

export enum PAGO {
    TARJETA,
    EFECTIVO
}

@Entity()
export class ViajeEntity {
    find(arg0: (e: any) => boolean): ViajeEntity {
        throw new Error('Method not implemented.');
    }
    filter(arg0: (e: any) => boolean): ViajeEntity {
        throw new Error('Method not implemented.');
    }
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    horaInicio: Date;

    @Column()
    costo: number;

    @Column()
    pago: PAGO;

    @Column()
    ubicacionId: number;

    @Column()
    vehiculoId: number;

    @OneToOne(() => UsuarioEntity, usuario => usuario.viaje)
    @JoinColumn()
    usuario: UsuarioEntity;

    @OneToOne(() => ConductorEntity, conductor => conductor.viaje)
    @JoinColumn()
    conductor: ConductorEntity;
    
    @OneToMany(() => UbicacionEntity, ubicacion => ubicacion.viaje)
    ubicacion: UbicacionEntity[];
}