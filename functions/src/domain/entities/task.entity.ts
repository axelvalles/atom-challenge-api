export class TaskEntity {
  constructor(
    public id: string,
    public title: string,
    public completed: boolean,
    public description: string
  ) {}
}
