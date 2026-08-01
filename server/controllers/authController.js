import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

// register user: /api/auth/register
export const register = async (req, res) => {};

// login user: /api/auth/login
export const login = async (req, res) => {
  try {
  } catch (error) {
    console.error();
  }
};

// get user profile: /api/auth/profile
export const getProfile = async (req, res) => {};

// change password: /api/auth/change-password
export const changePassword = async (req, res) => {};
