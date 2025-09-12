import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Workflow } from './workflow.model';
import { WorkflowsService } from './workflows.service';
import { WorkflowsController } from './workflows.controller';
import { User } from '../users/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Workflow, User])],
  providers: [WorkflowsService],
  controllers: [WorkflowsController],
})
export class WorkflowsModule {}
