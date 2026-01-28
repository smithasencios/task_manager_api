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
}

export class Task {
  public readonly id?: string;
  public title: string;
  public description: string;
  public status: TaskStatus;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(props: TaskProps) {
    this.id = props.id;
    this.title = props.title;
    this.description = props.description;
    this.status = props.status;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }

  update(props: Partial<Omit<TaskProps, 'id' | 'createdAt' | 'updatedAt'>>) {
    if (props.title) this.title = props.title;
    if (props.description) this.description = props.description;
    if (props.status) this.status = props.status;
    this.updatedAt = new Date();
  }
}
