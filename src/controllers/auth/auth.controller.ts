import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { compare, hash } from "bcryptjs";
import {
  ILoginBody,
  IRegistrationBody,
  IProfileUser,
  IUser,
  HttpError,
} from "../../types";
import * as userService from "../../services/user/user.service";
import { env } from "../../config/env";

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password }: ILoginBody = req.body;
    const user: IUser | null = await userService.getUserByEmail(email);

    if (!user) {
      const error = new Error("User not found");
      (error as HttpError).status = 404;
      return next(error);
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error("Invalid password");
      (error as HttpError).status = 401;
      return next(error);
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
    const user: IUser | null = await userService.getUserByEmail(email);

    if (user) {
      const error = new Error("User already exists");
      (error as HttpError).status = 409;
      return next(error);
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
    const user: IProfileUser | null = await userService.getUserById(userId);
    res.status(200).json({
      ...user,
    });
  } catch (e) {
    next(e);
  }
};

const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id: userId } = req.user;
    const data: { email?: string; username?: string } = req.body;
    const profileData: IProfileUser | null =
      await userService.getUserById(userId);

    if (!profileData) {
      const error = new Error("User not found");
      (error as HttpError).status = 404;
      return next(error);
    }

    const updatingProfileData = {
      ...profileData,
      ...data,
      updated_at: new Date(),
    };
    const updatedProfile: IProfileUser = await userService.updateUser(
      userId,
      updatingProfileData,
    );

    res.status(200).json({ ...updatedProfile });
  } catch (e) {
    next(e);
  }
};

const deleteProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id: userId } = req.user;
    await userService.deleteUser(userId);
    res.status(200).json({ message: "User successfully deleted" });
  } catch (e) {
    next(e);
  }
};

const initRefreshToken = async (userId: string): Promise<{ token: string }> => {
  const token = jwt.sign({ userId: userId }, env.SECRET_KEY || "secret", {
    expiresIn: "1h",
  });

  return { token };
};

export {
  login,
  registration,
  getProfile,
  updateProfile,
  deleteProfile,
  refreshToken,
};
