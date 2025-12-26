import * as projectMemberService from "../project.member.service";
import * as projectService from "../../project/project.service";
import * as userService from "../../user/user.service";
import { Roles } from "../../../types";

let projectId: string;
let userId: string;
let projectMemberId: string;

describe("Project Member", () => {
  beforeAll(async () => {
    const user = await userService.createUser(
      "test@test.com",
      "test",
      "password",
    );
    userId = user.id;
    const project = await projectService.createProject({
      name: "Testing",
      ownerId: userId,
    });
    projectId = project.id;
  });

  afterAll(async () => {
    await userService.deleteUser(userId);
  });

  it("Should get null when project member don't find", async () => {
    const userId = "79ed17d2-0824-4900-b5c7-cffad3566292";
    const projectId = "eb0f4d40-3fdf-4879-8538-e49ff8dd2239";
    const result = await projectMemberService.getProjectMemberInProject(
      projectId,
      userId,
    );

    expect(result).toBeDefined();
    expect(result).toBeNull();
  });

  it("Should create and return project member data", async () => {
    const result = await projectMemberService.addMemberToProject(
      projectId,
      userId,
      Roles.owner,
    );

    projectMemberId = result.id;

    expect(result).toBeDefined();
    expect(result).toHaveProperty("user_id", userId);
    expect(result).toHaveProperty("project_id", projectId);
    expect(result).toHaveProperty("role", Roles.owner);
  });

  it("Should get project member data after updated role", async () => {
    const result = await projectMemberService.updateMemberRoleInProject(
      projectMemberId,
      Roles.member,
    );

    expect(result).toBeDefined();
    expect(result).toHaveProperty("user_id", userId);
    expect(result).toHaveProperty("project_id", projectId);
    expect(result).toHaveProperty("role", Roles.member);
  });

  it("Should delete project member data and return id", async () => {
    const result =
      await projectMemberService.deleteMemberFromProject(projectMemberId);

    expect(result).toBeDefined();
    expect(result).toEqual(projectMemberId);
  });
});
