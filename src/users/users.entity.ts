import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    AfterInsert,
    AfterUpdate,
    AfterRemove,
    OneToMany


} from 'typeorm';

import {Exclude} from 'class-transformer';
import { Report } from 'src/reports/reports.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    email: string;
    @Column()
    @Exclude()
    password: string;

    @OneToMany(()=> Report, (report)=> report.user)
    reports : Report[];

    @AfterInsert()
    logAfterInsert() {
        console.log(`User inserted : ${this.id}`);
    }

    @AfterUpdate()
    logAfterUpdate() {
        console.log(`User updated ${this.id}`);
    }

    @AfterRemove()
    logAfterRemove() {
        console.log(`User removed ${this.id}`);
    }

}