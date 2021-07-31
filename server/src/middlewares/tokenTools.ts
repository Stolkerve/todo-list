import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function autho(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.header("authorization");
    if (!token) return res.status(403).send("Access denied.");
    
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY || "secret");
    res.locals.user = decoded;
    next();
  } catch (error) {
    console.error(error)
    res.status(400).send("Invalid token");
  }
}

export function generateToken(payload: any)
{
  const token = jwt.sign(payload, process.env.JWTPRIVATEKEY || "secret");
  return token;
}