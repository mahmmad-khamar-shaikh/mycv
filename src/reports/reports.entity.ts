import { User } from 'src/users/users.entity';
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';


@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: false })
    approved: boolean;

    @Column()
    price: number;

    @Column()
    make: string;

    @Column()
    model: string;

    @Column()
    year: number;

    @Column()
    lang: number;

    @Column()
    lat: number;

    @Column()
    mileage: number;

    @ManyToOne(() => User, (user) => user.reports)
    user: User;

}