import { getTaskById } from "../../../services/task/task.service";
import * as commentService from "../../../services/comment/comment.service";
import { mockRequest, mockResponse, mockNext } from "../../../types/mocks";
import * as commentController from "../comment.controller";
import { IComment, ITask } from "../../../types";

jest.mock("../../../services/task/task.service");
jest.mock("../../../services/comment/comment.service");

const task: ITask = {
  id: "c3d3584d-083f-4b84-8092-27d57b12104e",
  project_id: "c3d3584d-083f-4b84-8092-27d57b12104e",
  title: "Test Task",
  description: "Test Description",
  status: "open",
  priority: "low",
  assigned_to_id: "aec638b9-00ff-4b8a-8075-5e34f9d4aece",
  user_id: "aec638b9-00ff-4b8a-8075-5e34f9d4aece",
  created_at: new Date(),
  updated_at: new Date(),
};

const comment: IComment = {
  id: "38044a9a-8c19-439b-b62f-af36388997bd",
  task_id: task.id,
  user_id: task.user_id,
  content: "Test Comment",
  created_at: new Date(),
  updated_at: new Date(),
};

const updateComment: IComment = {
  ...comment,
  content: "Updated Comment",
  updated_at: new Date(),
};

describe("CommentController", () => {
  let req: ReturnType<typeof mockRequest>;
  let res: ReturnType<typeof mockResponse>;
  let next: ReturnType<typeof mockNext>;

  beforeAll(async () => {
    req = mockRequest({
      user: { id: "aec638b9-00ff-4b8a-8075-5e34f9d4aece" },
      params: {
        task_id: "c3d3584d-083f-4b84-8092-27d57b12104e",
        comment_id: "38044a9a-8c19-439b-b62f-af36388997bd",
      },
      body: {
        content: "Test Comment",
      },
    });
    res = mockResponse();
    next = jest.fn();
  });

  it("should get comments by task and return task", async () => {
    (getTaskById as jest.Mock).mockResolvedValue(task);
    (commentService.getCommentsByTaskId as jest.Mock).mockResolvedValue([]);

    await commentController.getCommentsByTaskId(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveLength(0);
    expect(res.json).toHaveBeenCalledWith([]);
    expect(next).not.toHaveBeenCalled();
  });

  it("should get comments by task and return 404 with message when task id not found", async () => {
    (getTaskById as jest.Mock).mockResolvedValue(null);

    await commentController.getCommentsByTaskId(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    const error = next.mock.calls[0][0];
    expect(error.status).toBe(404);
    expect(error.message).toBe("Task not found");
  });

  it("should get comment by id and return comment", async () => {
    (commentService.getCommentById as jest.Mock).mockResolvedValue(comment);

    await commentController.getCommentById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(comment);
    expect(next).not.toHaveBeenCalled();
  });

  it("should get comment by id and return null when comment not found", async () => {
    (commentService.getCommentById as jest.Mock).mockResolvedValue(null);

    await commentController.getCommentById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(null);
    expect(next).not.toHaveBeenCalled();
  });

  it("should create comment and return comment", async () => {
    (getTaskById as jest.Mock).mockResolvedValue(task);
    (commentService.createComment as jest.Mock).mockResolvedValue(comment);

    await commentController.createComment(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(comment);
    expect(next).not.toHaveBeenCalled();
  });

  it("should create comment and return 404 with message when task id not found", async () => {
    (getTaskById as jest.Mock).mockResolvedValue(null);

    await commentController.createComment(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    const error = next.mock.calls[0][0];
    expect(error.status).toBe(404);
    expect(error.message).toBe("Task not found");
  });

  it("should update comment and return comment", async () => {
    (commentService.getCommentById as jest.Mock).mockResolvedValue(comment);
    (commentService.updateCommentById as jest.Mock).mockResolvedValue(
      updateComment,
    );

    await commentController.updateCommentById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updateComment);
    expect(next).not.toHaveBeenCalled();
  });

  it("should update comment and return 404 with message when comment not found", async () => {
    (commentService.getCommentById as jest.Mock).mockResolvedValue(null);

    await commentController.updateCommentById(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    const error = next.mock.calls[0][0];
    expect(error.status).toBe(404);
    expect(error.message).toBe("Comment not found");
  });

  it("should delete comment and return 204", async () => {
    (commentService.getCommentById as jest.Mock).mockResolvedValue(comment);
    (commentService.deleteCommentById as jest.Mock).mockResolvedValue(
      comment.id,
    );

    await commentController.deleteComment(req, res, next);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(next).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      message: `Comment with id ${comment.id} deleted`,
    });
  });

  it("should delete comment and return 404 with message when comment not found", async () => {
    (commentService.getCommentById as jest.Mock).mockResolvedValue(null);

    await commentController.deleteComment(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    const error = next.mock.calls[0][0];
    expect(error.status).toBe(404);
    expect(error.message).toBe("Comment not found");
  });

  afterAll(async () => {});
});
