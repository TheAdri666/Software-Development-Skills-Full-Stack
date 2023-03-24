import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// This request comes with a userId in it to make it easily available on protected routes.
interface AuthenticatedRequest extends Request {
  userId?: string;
}

// This middleware authenticates requests by checking a JSON Web Token in the Request's authentication headers
function authenticateJWT(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // If token is invalid the server will return a 401 response status instead of allowing traffic.
  try {
    const decoded = jwt.verify(token, process.env.SECRET!) as JwtPayload;
    req.userId = decoded.userId;  
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export {
  authenticateJWT,
  AuthenticatedRequest
}
