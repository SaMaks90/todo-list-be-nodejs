import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { compare, hash } from "bcryptjs";
import {
  ILoginBody,
  IRegistrationBody,
  IProfileUser,
  IUser,
} from "../../types";
import * as userService from "../../services/user/user.service";

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password }: ILoginBody = req.body;
    const user: IUser = await userService.getUserByEmail(email);

    if (!user) {
      const error = new Error("User not found");
      (error as any).status = 404;
      next(error);
    }
    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error("Invalid password");
      (error as any).status = 401;
      next(error);
    }
    const token = await initRefreshToken(user.id);
    res.status(200).json({
      ...token,
    });
  } catch (e) {
    next(e);
  }
};

const registration = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data: IRegistrationBody = req.body;
    const { email, username, password } = data;
    const user = await userService.getUserByEmail(email);

    if (user) {
      let error = new Error("User already exists");
      (error as any).status = 409;
      next(error);
    }

    const hashPassword = await hash(password, 10);
    await userService.createUser(email, username, hashPassword);

    res.status(201).json({ message: "User successfully registered" });
  } catch (e) {
    next(e);
  }
};

const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id: userId } = req.user;
    const token: { token: string } = await initRefreshToken(userId);
    res.status(200).json({
      ...token,
    });
  } catch (e) {
    next(e);
  }
};

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: userId } = req.user;
    const user: IProfileUser = await userService.getUserById(userId);
    res.status(200).json({
      ...user,
    });
  } catch (e) {
    next(e);
  }
};

const createProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id: userId } = req.user;
    const data: { email?: string; username?: string } = req.body;
    let profileData: IProfileUser = await userService.getUserById(userId);
    const updatingProfileData = {
      ...profileData,
      ...data,
      updated_at: new Date(),
    };
    await userService.updateUser(userId, updatingProfileData);
    profileData = await userService.getUserById(userId);

    res.status(200).json({ ...profileData });
  } catch (e) {
    next(e);
  }
};

const initRefreshToken = async (userId: string): Promise<{ token: string }> => {
  const token = jwt.sign(
    { userId: userId },
    process.env.SECRET_KEY || "secret",
    { expiresIn: "1h" },
  );

  return { token };
};

export { login, registration, getProfile, createProfile, refreshToken };
