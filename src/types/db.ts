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

interface IProjectMember {
  id: string;
  user_id: string;
  project_id: string;
  role: string;
}

export type { IUser, IProfileUser, IProject, IProjectMember };
