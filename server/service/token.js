import jwt from 'jsonwebtoken';

import { Token } from '../models/tokenModel.js';

const generateTokens = (id) => {
  const accessToken = jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '15m',
  });
  const refreshToken = jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '30d',
  });

  return {
    accessToken,
    refreshToken,
  };
};

const saveToken = async (userId, refreshToken) => {
  const tokenInfo = await Token.findOne({ user: userId });

  if (tokenInfo) {
    tokenInfo.refreshToken = refreshToken;
    const token = await tokenInfo.save();
    return token;
  }

  const token = await Token.create({ user: userId, refreshToken });

  return token;
};

const validateAccessToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return userData;
  } catch (error) {
    return null;
  }
};

const validateRefreshToken = (token) => {
  try {
    const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    return userData;
  } catch (error) {
    return null;
  }
};

export { generateTokens, saveToken, validateAccessToken, validateRefreshToken };
