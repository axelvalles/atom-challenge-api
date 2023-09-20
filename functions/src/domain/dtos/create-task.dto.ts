interface Payload {
  [key: string]: any;
}

type Response = [string?, CreateTaskDto?];

export class CreateTaskDto {
  private constructor(public title: string, public description: string) {}

  static create(object: Payload): Response {
    const {title, description} = object;

    if (title === "" || typeof title !== "string") {
      return ["Missing title"];
    }

    if (description === "" || typeof description !== "string") {
      return ["Missing title"];
    }

    return [undefined, new CreateTaskDto(title, description)];
  }
}
