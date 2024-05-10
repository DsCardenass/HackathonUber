import { VehiculoEntity } from 'src/vehiculo/vehiculo.entity/vehiculo.entity';
import { ViajeEntity } from 'src/viaje/viaje.entity/viaje.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity()
export class ConductorEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    documento: string;

    @Column()
    calificacion: number;

    @OneToOne(() => ViajeEntity, viaje => viaje.conductor)
    @JoinColumn()
    viaje: ViajeEntity;

    @OneToMany(() => VehiculoEntity, vehiculo => vehiculo.conductor)
    vehiculo: VehiculoEntity;
  conductor: any[];
}