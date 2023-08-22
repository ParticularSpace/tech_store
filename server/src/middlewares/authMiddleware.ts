import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Get the token from the request header
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication token required' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '');

  

    // Attach the user's information to the request object
    req.user = decoded as any;

    next(); // Continue to the next middleware or route handler
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: 'Invalid authentication token' });
  }
};
