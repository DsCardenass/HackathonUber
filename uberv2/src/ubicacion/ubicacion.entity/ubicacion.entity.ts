import { ViajeEntity } from 'src/viaje/viaje.entity/viaje.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class UbicacionEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    direccion: string;

    @Column()
    coordenadas: string;

    @OneToMany(() => ViajeEntity, viaje => viaje.ubicacion)
    viaje: ViajeEntity[];
}
