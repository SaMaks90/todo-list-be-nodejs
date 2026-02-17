import * as projectMemberController from "../project.member.controller";
import * as projectMemberService from "../../../services/project.member/project.member.service";
import { IProjectMember } from "../../../types";
import { mockNext, mockRequest, mockResponse } from "../../../types/mocks";

jest.mock("../../../services/project.member/project.member.service");

describe("project.member.controllers - CRUD operations", () => {
  let req: ReturnType<typeof mockRequest>;
  let res: ReturnType<typeof mockResponse>;
  let next: ReturnType<typeof mockNext>;
  let member: IProjectMember;

  beforeEach(async () => {
    const projectId = "c3d3584d-083f-4b84-8092-27d57b12104e";
    const userId = "aec638b9-00ff-4b8a-8075-5e34f9d4aece";
    req = mockRequest({
      user: { id: userId },
      params: { project_id: projectId },
      body: {},
    });
    res = mockResponse();
    next = jest.fn();
    member = {
      id: "bbb638b9-00ff-4b8a-8075-5e34f9d4aece",
      project_id: projectId,
      user_id: userId,
      role: "owner",
      created_at: new Date(),
      updated_at: new Date(),
    };
  });

  it("Should return 200 with empty list", async () => {
    (
      projectMemberService.getProjectMembersInProject as jest.Mock
    ).mockResolvedValue([]);

    await projectMemberController.getProjectMembers(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveLength(0);
    expect(next).not.toHaveBeenCalled();
  });

  it("Should return 200 with project member list", async () => {
    (
      projectMemberService.getProjectMembersInProject as jest.Mock
    ).mockResolvedValue([member]);

    await projectMemberController.getProjectMembers(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.arrayContaining([expect.objectContaining(member)]),
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("Should return 409 and error message when create user failed because member already exists", async () => {
    req = mockRequest({
      ...req,
      body: {
        user_id: "aec638b9-00ff-4b8a-8075-5e34f9d4aece",
        role: "owner",
      },
    });

    (
      projectMemberService.getProjectMemberInProject as jest.Mock
    ).mockResolvedValue(member);

    await projectMemberController.addProjectMember(req, res, next);

    expect(next).toHaveBeenCalled();
    const error = next.mock.calls[0][0];
    expect(res.status).not.toHaveBeenCalled();
    expect(error.status).toBe(409);
    expect(error.message).toBe("User already exists in project");
  });

  it("Should return 200 with project member data", async () => {
    (
      projectMemberService.getProjectMemberInProject as jest.Mock
    ).mockResolvedValue(null);
    (projectMemberService.addMemberToProject as jest.Mock).mockResolvedValue(
      member,
    );

    await projectMemberController.addProjectMember(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(member);
  });

  it("Should return 409 and error message when update user failed because member doesn't exist in project", async () => {
    (
      projectMemberService.getProjectMemberInProject as jest.Mock
    ).mockResolvedValue(null);

    await projectMemberController.updateUserRoleInProject(req, res, next);

    expect(next).toHaveBeenCalled();
    const error = next.mock.calls[0][0];
    expect(res.status).not.toHaveBeenCalled();
    expect(error.status).toBe(404);
    expect(error.message).toBe("Project member id doesn't exist in project");
  });

  it("Should return 200 with updated project member data", async () => {
    const updatedMember = { ...member, role: "member" };
    req = mockRequest({ ...req, body: { role: "member" } });

    (
      projectMemberService.getProjectMemberInProject as jest.Mock
    ).mockResolvedValue(member);
    (
      projectMemberService.updateMemberRoleInProject as jest.Mock
    ).mockResolvedValue(updatedMember);

    await projectMemberController.updateUserRoleInProject(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedMember);
  });

  it("Should return 409 and error message when deletes user failed because member doesn't exist in project", async () => {
    (
      projectMemberService.getProjectMemberInProject as jest.Mock
    ).mockResolvedValue(null);

    await projectMemberController.removeProjectMember(req, res, next);

    expect(next).toHaveBeenCalled();
    const error = next.mock.calls[0][0];
    expect(res.status).not.toHaveBeenCalled();
    expect(error.status).toBe(404);
    expect(error.message).toBe("Project member id doesn't exist in project");
  });

  it("Should return 200 with a message 'User successfully deleted'", async () => {
    (
      projectMemberService.getProjectMemberInProject as jest.Mock
    ).mockResolvedValue(member);
    (
      projectMemberService.deleteMemberFromProject as jest.Mock
    ).mockResolvedValue(member.id);

    await projectMemberController.removeProjectMember(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "User successfully deleted",
    });
  });
});
