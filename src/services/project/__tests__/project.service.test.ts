import { pool } from "../../../config/db";
import {
  checkDuplicateProject,
  createProject,
  getProjectById,
  getProjects,
  updateProject,
} from "../project.service";
import { createUser, getUserByEmail } from "../../user/user.service";
import { IProject, IProfileUser, IUser } from "../../../types";

let ownerId: string;
let project: {
  name: string;
  ownerId: string;
};
let createdProject: {
  id: string;
  name: string;
  owner_id: string;
  created_at: Date;
  updated_at: Date;
};

describe("project.service", () => {
  beforeAll(async () => {
    ownerId = "239e5811-7ff2-44b4-ab58-c94938f282bd";
    project = { name: "Test project", ownerId: "" };
  });

  afterAll(async () => {
    await pool.query("DELETE FROM users WHERE id = $1", [
      createdProject.owner_id,
    ]);
    await pool.query("DELETE FROM projects WHERE id = $1", [createdProject.id]);
  });

  it("should get projects and return empty array project data", async () => {
    const projectList: IProject[] = await getProjects(ownerId);

    expect(projectList).toEqual([]);
    expect(projectList).toHaveLength(0);
  });

  it("should create project and return project data", async () => {
    const findUser: IUser | null = await getUserByEmail("test@test.com");
    if (!findUser) {
      const user: IProfileUser = await createUser(
        "test@test.com",
        "test",
        "password",
      );
      project.ownerId = user.id;
    } else {
      project.ownerId = findUser.id;
    }

    const projectData: IProject = await createProject(project);

    createdProject = {
      name: project.name,
      owner_id: project.ownerId,
      updated_at: projectData.created_at,
      created_at: projectData.updated_at,
      id: projectData.id,
    };

    expect(projectData).toBeDefined();
    expect(projectData).toStrictEqual(createdProject);
  });

  it("should get project by id and return object project data", async () => {
    const projectData: IProject | null = await getProjectById(
      createdProject.id,
    );

    expect(projectData).toBeDefined();
    expect(projectData).toStrictEqual(createdProject);
  });

  it("should get project by id and return null", async () => {
    const projectData: IProject | null = await getProjectById(
      "e17176d0-d773-4fb6-8659-5f039119bce9",
    );
    expect(projectData).toBeNull();
  });

  it("should get projects and return array project data", async () => {
    const projectList: IProject[] = await getProjects(createdProject.owner_id);

    expect(projectList).toHaveLength(1);
    expect(projectList[0]).toStrictEqual(createdProject);
  });

  it("should update project and return object data", async () => {
    const updatedProject: IProject = await updateProject({
      name: "Updated project",
      updatedAt: new Date(),
      projectId: createdProject.id,
    });

    expect(updatedProject).toBeDefined();
    expect(updatedProject).toStrictEqual({
      ...createdProject,
      name: "Updated project",
      updated_at: updatedProject.updated_at,
    });
  });

  it("should check duplicate project and return true", async () => {
    const existProject: boolean = await checkDuplicateProject(
      "Updated project",
      createdProject.owner_id,
    );

    expect(existProject).toBeDefined();
    expect(existProject).toBeTruthy();
  });

  it("should check duplicate project and return false", async () => {
    const existProject: boolean = await checkDuplicateProject(
      "test testing project",
      createdProject.owner_id,
    );

    expect(existProject).toBeDefined();
    expect(existProject).toBeFalsy();
  });
});
