import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { WorkflowsService } from './workflows.service';
import {
  CreateWorkflowDto,
  UpdateWorkflowDto,
  ValidateWorkflowDto,
} from './dto';

@ApiTags('workflows')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('workflows')
export class WorkflowsController {
  constructor(private readonly workflowsService: WorkflowsService) {}

  @Post()
  create(@Request() req: any, @Body() dto: CreateWorkflowDto) {
    return this.workflowsService.create(req.user.userId, dto);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.workflowsService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.workflowsService.findOne(req.user.userId, id);
  }

  @Put(':id')
  update(
    @Request() req: any,
    @Param('id') id: string,
    @Body() dto: UpdateWorkflowDto,
  ) {
    return this.workflowsService.update(req.user.userId, id, dto);
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.workflowsService.remove(req.user.userId, id);
  }

  @Post('validate')
  validate(@Request() req: any, @Body() dto: ValidateWorkflowDto) {
    return this.workflowsService.validate(req.user.userId, dto);
  }
}
