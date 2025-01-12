import { validateAccessToken } from '../service/token.js';

const authMiddleware = async (req, _res, next) => {
  try {
    const authHeaders = req.headers.authorization;

    if (!authHeaders) {
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      throw error;
    }

    const accessToken = authHeaders.split(' ')[1];

    if (!accessToken) {
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      throw error;
    }

    const decoded = validateAccessToken(accessToken);

    if (!decoded) {
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      throw error;
    }

    req.user = decoded.id;
    next();
  } catch (error) {
    next(error);
  }
};

export { authMiddleware };
