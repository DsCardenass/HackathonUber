import { ConductorEntity } from 'src/conductor/conductor.entity/conductor.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
@Entity()
export class VehiculoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    modelo: string;

    @Column()
    placa: string;

    @OneToMany(() => ConductorEntity, conductor => conductor.vehiculo)
    conductor: ConductorEntity[];
}
