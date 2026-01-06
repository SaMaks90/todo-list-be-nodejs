import * as projectController from "../project.controllers";
import * as projectService from "../../../services/project/project.service";
import { mockRequest, mockResponse, mockNext, IProject } from "../../../types";

jest.mock("../../../services/project/project.service");

describe("project.controllers - CRUD operations", () => {
  let req: ReturnType<typeof mockRequest>;
  let res: ReturnType<typeof mockResponse>;
  let next: ReturnType<typeof mockNext>;
  let createdProject: IProject;
  let updatedProject: IProject;

  beforeEach(async () => {
    req = mockRequest({
      user: { id: "aec638b9-00ff-4b8a-8075-5e34f9d4aece" },
      params: { project_id: "c3d3584d-083f-4b84-8092-27d57b12104e" },
      body: {},
    });
    res = mockResponse();
    next = jest.fn();
    createdProject = {
      id: "c3d3584d-083f-4b84-8092-27d57b12104e",
      name: "Test project",
      owner_id: "aec638b9-00ff-4b8a-8075-5e34f9d4aece",
      created_at: new Date(),
      updated_at: new Date(),
    };
    updatedProject = createdProject;
  });

  it("should return 200 with empty projects array", async () => {
    (projectService.getProjects as jest.Mock).mockResolvedValue([]);
    await projectController.getProjects(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveLength(0);
    expect(res.json).toHaveBeenCalledWith([]);
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 200 with nul when project not found", async () => {
    (projectService.getProjectById as jest.Mock).mockResolvedValue(null);
    await projectController.getProjectId(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(null);
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 201 with project data", async () => {
    (projectService.createProject as jest.Mock).mockResolvedValue(
      createdProject,
    );
    (projectService.checkDuplicateProject as jest.Mock).mockResolvedValue(
      false,
    );

    await projectController.createProject(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(createdProject);
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 409 when project name already exists", async () => {
    (projectService.checkDuplicateProject as jest.Mock).mockResolvedValue(true);

    await projectController.createProject(req, res, next);

    expect(next).toHaveBeenCalled();
    const error = next.mock.calls[0][0];
    expect(error.status).toBe(409);
    expect(error.message).toBe("Project already exists");
    expect(res.status).not.toHaveBeenCalled();
  });

  it("should return 200 with project list", async () => {
    (projectService.getProjects as jest.Mock).mockResolvedValue([
      createdProject,
    ]);
    await projectController.getProjects(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([createdProject]);
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 200 with project by ID", async () => {
    (projectService.getProjectById as jest.Mock).mockResolvedValue(
      createdProject,
    );

    await projectController.getProjectId(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(createdProject);
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 200 with updated project data", async () => {
    updatedProject.name = "Updated project";
    req.body.name = updatedProject.name;

    (projectService.updateProject as jest.Mock).mockResolvedValue(
      updatedProject,
    );
    (projectService.checkDuplicateProject as jest.Mock).mockResolvedValue(
      false,
    );

    await projectController.updateProject(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedProject);
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 409 when project name already exists", async () => {
    updatedProject.name = "Updated project";
    req.body.name = updatedProject.name;

    (projectService.checkDuplicateProject as jest.Mock).mockResolvedValue(true);

    await projectController.updateProject(req, res, next);

    expect(next).toHaveBeenCalled();
    const error = next.mock.calls[0][0];
    expect(error.status).toBe(409);
    expect(error.message).toBe("Project already exists");
    expect(res.status).not.toHaveBeenCalled();
  });
});
