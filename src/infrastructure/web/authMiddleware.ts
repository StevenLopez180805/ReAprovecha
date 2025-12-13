import { NextFunction, Request, Response } from "express";
import { AuthApplication } from "../../application/AuthApplication";
import { UserRoles } from "../../domain/UserRoles";

export function authenticateToken(req: Request, res: Response, next: NextFunction):void{
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({error: "Error en autenticación"});
    return;
  }

  try {
    const payload = AuthApplication.verifyToken(token) as { id: number, rol: UserRoles };
    req.user = { id: payload.id, rol: payload.rol };
    next();
  } catch (error) {
    res.status(403).json({error: "Token inválido o expirado"});
    return;
  }
}