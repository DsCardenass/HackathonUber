import { ViajeEntity } from 'src/viaje/viaje.entity/viaje.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UsuarioEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    documento: string;

    @OneToOne(() => ViajeEntity, viaje => viaje.usuario)
    @JoinColumn()
    viaje: ViajeEntity;
}
