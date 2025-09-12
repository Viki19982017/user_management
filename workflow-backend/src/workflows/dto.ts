import { IsString, IsUUID, IsObject, IsOptional } from 'class-validator';

export class CreateWorkflowDto {
  @IsString()
  name!: string;

  @IsObject()
  data!: Record<string, unknown>;
}

export class UpdateWorkflowDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsObject()
  data?: Record<string, unknown>;
}

export class ValidateWorkflowDto {
  @IsObject()
  data!: Record<string, unknown>;
}
