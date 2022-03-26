import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { CreateReportDTO } from './dtos/create-report.dto';
import { Report } from './reports.entity';


@Injectable()
export class ReportsService {

    constructor(
        @InjectRepository(Report)
        private repo: Repository<Report>) { }

    public create(reportDto: CreateReportDTO, user: User) {
        const report = this.repo.create(reportDto);
        report.user = user;
        return this.repo.save(report);

    }

    public async changeApproval(id: string, approved: boolean) {
        const report = await this.repo.findOne(id);
        if (!report) {
            throw new NotFoundException(' reporot not found');
        }
        report.approved = approved;
        return this.repo.save(report)
    }


}
