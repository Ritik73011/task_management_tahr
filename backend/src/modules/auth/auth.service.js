import prisma from "../../config/db.js";
import ApiError from "../../utils/ApiError.js";
import { hashPassword, comparePassword } from "../../utils/password.js";
import { generateToken } from "../../utils/jwt.js";

const register = async ({ name, email, password }) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new ApiError(409, "Email is already registered.");
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
    select: {
      user_id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  const token = generateToken({
    user_id: user.user_id,
    email: user.email,
  });

  return {
    user,
    token,
  };
};

const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new ApiError(401, "Invalid email or password.");
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password.");
  }

  const token = generateToken({
    user_id: user.user_id,
    email: user.email,
  });

  return {
    user: {
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
    token,
  };
};

const getMe = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      user_id: userId,
    },
    select: {
      user_id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  return user;
};

export default {
  register,
  login,
  getMe,
};
