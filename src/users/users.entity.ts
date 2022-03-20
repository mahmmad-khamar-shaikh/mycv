import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    AfterInsert,
    AfterUpdate,
    AfterRemove

} from 'typeorm';

import {Exclude} from 'class-transformer';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    email: string;
    @Column()
    @Exclude()
    password: string;

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