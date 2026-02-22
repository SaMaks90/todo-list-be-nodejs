import express, { Express } from "express";
import request from "supertest";
import { Response } from "supertest";
import taskRoutes from "../task.routes";

jest.mock("../../../services/task/task.service");

const app: Express = express();

app.use(express.json());
app.use("/api/tasks", taskRoutes);

const taskId = "27e07498-d518-453c-bfee-d2764e09f36e";

const validateTaskIdParam = (response: Response) => {
  expect(response.status).toBe(400);
  expect(response.body).toMatchObject({ error: "Invalid parameters" });
  expect(response.body).toHaveProperty("details");
  expect(response.body.details.fieldErrors).toHaveProperty("task_id");
};

const validationTaskBody = (response: Response, property: string) => {
  expect(response.status).toBe(400);
  expect(response.body).toMatchObject({ error: "Validation error" });
  expect(response.body).toHaveProperty("details");
  expect(response.body.details.fieldErrors).toHaveProperty(property);
};

const validationTaskBodyWithPropertyValue = (
  response: Response,
  property: string,
  value: string,
) => {
  expect(response.status).toBe(400);
  expect(response.body).toMatchObject({ error: "Validation error" });
  expect(response.body).toHaveProperty("details");
  expect(response.body.details.fieldErrors).toHaveProperty(property, [value]);
};

describe("Task Routes", () => {
  it("should 400 when invalid params when get task by id", async () => {
    const response: Response = await request(app).get("/api/tasks/1111");

    validateTaskIdParam(response);
  });

  it("should 400 when invalid body when create task", async () => {
    const response: Response = await request(app)
      .post("/api/tasks/")
      .send({ description: "Test" });

    validationTaskBody(response, "title");
  });

  it("should 400 when invalid param when update task", async () => {
    const response: Response = await request(app)
      .put("/api/tasks/1111/")
      .send({});

    validateTaskIdParam(response);
  });

  it("should 400 when invalid body when update task", async () => {
    const response: Response = await request(app)
      .put(`/api/tasks/${taskId}/`)
      .send({});

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({ error: "Validation error" });
    expect(response.body).toHaveProperty("details");
    expect(response.body.details.formErrors[0]).toBe(
      "At least one field must be provided",
    );
  });

  it("should 400 when invalid param when assign user to task", async () => {
    const response: Response = await request(app)
      .patch(`/api/tasks/1111/assign`)
      .send({});

    validateTaskIdParam(response);
  });

  it("should 400 when invalid body when assign user to task", async () => {
    const response: Response = await request(app)
      .patch(`/api/tasks/${taskId}/assign`)
      .send({});

    validationTaskBody(response, "assigned_to_id");
  });

  it("should 400 when invalid param when update task status", async () => {
    const response: Response = await request(app)
      .patch(`/api/tasks/1111/status`)
      .send({});

    validateTaskIdParam(response);
  });

  it("should 400 when invalid body when update task status with empty object", async () => {
    const response: Response = await request(app)
      .patch(`/api/tasks/${taskId}/status`)
      .send({});

    validationTaskBody(response, "status");
  });

  it("should 400 when invalid body when update task status and with incorrect value", async () => {
    const response: Response = await request(app)
      .patch(`/api/tasks/${taskId}/status`)
      .send({ status: "test" });

    console.log(response.body);

    validationTaskBodyWithPropertyValue(
      response,
      "status",
      'Invalid option: expected one of "open"|"in progress"|"closed"',
    );
  });

  it("should 400 when invalid param when update task priority", async () => {
    const response: Response = await request(app)
      .patch(`/api/tasks/1111/priority`)
      .send({});

    validateTaskIdParam(response);
  });

  it("should 400 when invalid body when update task priority with empty object", async () => {
    const response: Response = await request(app)
      .patch(`/api/tasks/${taskId}/priority`)
      .send({});

    validationTaskBody(response, "priority");
  });

  it("should 400 when invalid body when update task priority with incorrect value", async () => {
    const response: Response = await request(app)
      .patch(`/api/tasks/${taskId}/priority`)
      .send({ priority: "test" });

    validationTaskBodyWithPropertyValue(
      response,
      "priority",
      'Invalid option: expected one of "low"|"medium"|"high"',
    );
  });
});
