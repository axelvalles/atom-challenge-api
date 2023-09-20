interface Payload {
  [key: string]: any;
}

type Response = [string?, UpdateTaskDto?];

export class UpdateTaskDto {
  private constructor(
    public title: string,
    public completed: boolean,
    public description: string
  ) {}

  static create(object: Payload): Response {
    const {title, completed, description} = object;

    if (title === "" || typeof title !== "string") {
      return ["Missing title"];
    }
    if (completed === undefined || typeof completed !== "boolean") {
      return ["Missing completed property"];
    }
    if (description === "" || typeof description !== "string") {
      return ["Missing title"];
    }

    return [undefined, new UpdateTaskDto(title, completed, description)];
  }
}
