interface IUser {
  id: string;
  email: string;
  password: string;
  username: string;
  created_at: Date;
  updated_at: Date;
}

type IProfileUser = Omit<IUser, "password">;

export type { IUser, IProfileUser };
