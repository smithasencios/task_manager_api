export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export interface TaskProps {
  id?: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy: string;
  updatedBy: string;
}

export class Task {
  public readonly id?: string;
  public title: string;
  public description: string;
  public status: TaskStatus;
  public readonly createdAt: Date;
  public updatedAt: Date;
  public readonly createdBy: string;
  public updatedBy: string;

  constructor(props: TaskProps) {
    this.id = props.id;
    this.title = props.title;
    this.description = props.description;
    this.status = props.status;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
    this.createdBy = props.createdBy;
    this.updatedBy = props.updatedBy;
  }

  update(props: Partial<Omit<TaskProps, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>>, updatedBy: string) {
    if (props.title) this.title = props.title;
    if (props.description) this.description = props.description;
    if (props.status) this.status = props.status;
    this.updatedBy = updatedBy;
    this.updatedAt = new Date();
  }
}
