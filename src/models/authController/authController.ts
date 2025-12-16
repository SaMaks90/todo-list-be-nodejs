import { compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import { ILoginBody, IRegistrationBody, IUser } from "../../types";
import { getUserByEmail, createUser } from "../userController/userController";

const login = async (data: ILoginBody): Promise<{ token: string }> => {
  const { email, password } = data;
  const user: IUser = await getUserByEmail(email);

  if (!user) {
    const error = new Error("User not found");
    (error as any).status = 404;
    throw error;
  }
  const isPasswordValid = await compare(password, user.password);

  if (!isPasswordValid) {
    const error = new Error("Invalid password");
    (error as any).status = 401;
    throw error;
  }

  return await refreshToken(user.id);
};

const registration = async (data: IRegistrationBody): Promise<void> => {
  const { email, username, password } = data;
  const user = await getUserByEmail(email);

  if (user) {
    let error = new Error("User already exists");
    (error as any).status = 409;
    throw error;
  }

  const hashPassword = await hash(password, 10);
  await createUser(email, username, hashPassword);
};

const refreshToken = async (userId: string): Promise<{ token: string }> => {
  const token = jwt.sign(
    { userId: userId },
    process.env.SECRET_KEY || "secret",
    { expiresIn: "1h" },
  );

  return { token };
};

export { login, registration, refreshToken };
