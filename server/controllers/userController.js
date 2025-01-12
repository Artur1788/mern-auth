import bcrypt from 'bcrypt';

import {
  generateTokens,
  saveToken,
  validateRefreshToken,
} from '../service/token.js';
import { User } from '../models/userModel.js';
import { Token } from '../models/tokenModel.js';

const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      const error = new Error('User already exists');
      error.statusCode = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
    });

    if (!newUser) {
      const error = new Error('Error creating user');
      error.statusCode = 500;
      throw error;
    }

    const tokens = generateTokens(newUser._id);

    await saveToken(newUser._id, tokens.refreshToken);

    res.status(201).json({
      accessToken: tokens.accessToken,
      name: newUser.name,
      email: newUser.email,
      id: newUser._id,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      const error = new Error('Invalid credentials');
      error.statusCode = 400;
      throw error;
    }

    const tokens = generateTokens(user._id);

    await saveToken(user._id, tokens.refreshToken);

    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV !== 'development',
    });

    res.status(200).json({
      accessToken: tokens.accessToken,
      name: user.name,
      email: user.email,
      id: user._id,
    });
  } catch (error) {
    next(error);
  }
};

const logOut = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    await Token.deleteOne({ refreshToken });
    res.clearCookie('refreshToken');

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const userData = await User.findById(req.user).select('-password');
    const user = {
      name: userData.name,
      email: userData.email,
      id: userData._id,
    };

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (_req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const refresh = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      const error = new Error('Not authorized');
      error.statusCode = 401;
      throw error;
    }

    const decodedData = validateRefreshToken(refreshToken);
    const isTokenExist = await Token.findOne({ refreshToken });

    if (!decodedData || !isTokenExist) {
      const error = new Error('Not authorized');
      error.statusCode = 401;
      throw error;
    }

    const user = await User.findById(decodedData.id);
    const tokens = generateTokens(user._id);

    await saveToken(user._id, tokens.refreshToken);

    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV !== 'development',
    });

    res.status(200).json({
      accessToken: tokens.accessToken,
      name: user.name,
      email: user.email,
      id: user._id,
    });
  } catch (error) {
    next(error);
  }
};

export { register, login, getUser, getAllUsers, logOut, refresh };
