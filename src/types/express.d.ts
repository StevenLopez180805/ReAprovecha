import { User } from '../domain/User';
import { UserRoles } from '../domain/UserRoles';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        rol: UserRoles;
      };
    }
  }
}

