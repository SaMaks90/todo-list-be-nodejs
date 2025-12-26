interface IUser {
  id: string;
  email: string;
  password: string;
  username: string;
  created_at: Date;
  updated_at: Date;
}

type IProfileUser = Omit<IUser, "password">;

interface IProject {
  id: string;
  name: string;
  owner_id: string;
  created_at: Date;
  updated_at: Date;
}

const Roles = {
  member: "member",
  owner: "owner",
} as const;

type Role = (typeof Roles)[keyof typeof Roles];

interface IProjectMember {
  id: string;
  user_id: string;
  project_id: string;
  role: Role;
}

export { Roles };
export type { IUser, IProfileUser, IProject, IProjectMember, Role };
