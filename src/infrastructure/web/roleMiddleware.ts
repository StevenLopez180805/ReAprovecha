import { Request, Response, NextFunction } from 'express';
import { UserRoles } from '../../domain/UserRoles';

export const authorizeRoles = (...allowedRoles: UserRoles[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    console.log({user});
    if (!user || !user.rol) {
      return res.status(401).json({
        error: 'Usuario no autenticado',
      });
    }

    if (!allowedRoles.includes(user.rol)) {
      return res.status(403).json({
        error: 'No tiene permisos para realizar esta acción',
      });
    }

    next();
  };
};