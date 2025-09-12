import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Workflow } from './workflow.model';
import {
  CreateWorkflowDto,
  UpdateWorkflowDto,
  ValidateWorkflowDto,
} from './dto';

@Injectable()
export class WorkflowsService {
  constructor(
    @InjectModel(Workflow) private readonly workflowModel: typeof Workflow,
  ) {}

  async create(userId: string, dto: CreateWorkflowDto) {
    const wf = await this.workflowModel.create({ ...dto, userId } as any);
    return wf;
  }

  async findAll(userId: string) {
    return this.workflowModel.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });
  }

  async findOne(userId: string, id: string) {
    const wf = await this.workflowModel.findByPk(id);
    if (!wf || wf.userId !== userId)
      throw new NotFoundException('Workflow not found');
    return wf;
  }

  async update(userId: string, id: string, dto: UpdateWorkflowDto) {
    const wf = await this.workflowModel.findByPk(id);
    if (!wf || wf.userId !== userId)
      throw new NotFoundException('Workflow not found');
    await wf.update(dto);
    return wf;
  }

  async remove(userId: string, id: string) {
    const wf = await this.workflowModel.findByPk(id);
    if (!wf || wf.userId !== userId)
      throw new NotFoundException('Workflow not found');
    await wf.destroy();
    return { deleted: true };
  }

  async validate(userId: string, dto: ValidateWorkflowDto) {
    const data = dto.data as any;
    const nodes = Array.isArray(data?.nodes) ? data.nodes : [];
    const edges = Array.isArray(data?.edges) ? data.edges : [];
    const hasInput = nodes.some((n: any) => n.type === 'input');
    const hasOutput = nodes.some((n: any) => n.type === 'output');
    const allConnected = nodes.every((n: any) =>
      edges.some((e: any) => e.source === n.id || e.target === n.id),
    );
    const valid = hasInput && hasOutput && allConnected;
    return { valid, requirements: { hasInput, hasOutput, allConnected } };
  }
}
