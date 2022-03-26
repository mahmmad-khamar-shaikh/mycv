import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private repo: Repository<User>
    ) { }
    public create(email: string, password: string): Promise<User> {
        const user = this.repo.create({ email: email, password: password });
        return this.repo.save(user);
    }

    public async findOne(id: string): Promise<User> {
        if(!id){
            return null;
        }
        const user= await this.repo.findOne(id);
        if(!user)
        {
            throw new NotFoundException('User Not found');
        }
        return user;    
    }

    public async find(email: string) {
        console.log('user.service.ts find method called');
        return await this.repo.find({ email });
    }

    public async update(id: string, attrs: Partial<User>) {
        let currentUser = await this.findOne(id);
        const newUser = Object.assign(currentUser, attrs)
        this.repo.save(newUser);
    }
    public async remove(id: string) {

        let currentUser = await this.findOne(id);
        if (!currentUser) {
            throw new Error('Record not Found');
        }
        this.repo.remove(currentUser);
    }
}
