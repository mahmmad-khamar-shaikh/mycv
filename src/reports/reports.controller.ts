import {
    Body, Controller, Post, UseGuards,
    Patch,
    Param
} from '@nestjs/common';
import { CreateReportDTO } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/users.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';


@Controller('reports')
export class ReportsController {

    constructor(private reportService: ReportsService) {

    }

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReport(
        @Body()
        body: CreateReportDTO,
        @CurrentUser()
        user: User) {

        return this.reportService.create(body, user);
    }

    @Patch('/:id')
    approveReport(@Param('id') id: string,
        @Body() body: ApproveReportDto
    ) {
        return this.reportService.changeApproval(id, body.approved)

    }


}
