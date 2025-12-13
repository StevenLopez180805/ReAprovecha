import { User } from "../domain/User";
import { UserPort } from "../domain/UserPort";
import bcrypt from 'bcryptjs'
import { AuthApplication } from "./AuthApplication";
export class UserApplication{

  constructor(private port:UserPort){}

  async login(email:string, password:string):Promise<string>{
    const existingUser = await this.port.getUserByEmail(email);
    if (!existingUser) {
      throw new Error("Credenciales inválidas");
    }

    const passMatch = await bcrypt.compare(password, existingUser.password);
    if (!passMatch) {
      throw new Error("Credenciales inválidas");
    }

    const token = AuthApplication.generateToken({
      id: existingUser.id,
      rol: existingUser.rol
    });
    return token;
  }

  async createUser(user:Omit<User,"id">):Promise<number>{
    const existUser = await this.port.getUserByEmail(user.email);
    if (existUser) {
      throw new Error("Este email ya esta registrado");
    }
    const hashedPassword = await bcrypt.hash(user.password, 12);
    user.password = hashedPassword;
    return this.port.createUser(user);
  }

  async getUserById(id:number):Promise<User|null>{
    return this.port.getUserById(id);
  }
  
  async getUserByEmail(email:string):Promise<User|null>{
    return this.port.getUserByEmail(email);
  }

  async getAllUsers():Promise<User[]>{
    return this.port.getAllUsers();
  }

  async updateUser(id:number, user:Partial<User>):Promise<boolean>{
    const existingUser = await this.port.getUserById(id);
    if (!existingUser) {
      throw new Error("Usuario no encontrado");
    }
    if (user.email) {
      const emailTaken = await this.port.getUserByEmail(user.email);
      if (emailTaken && emailTaken.id !== id) {
        throw new Error("El email ya esta en uso");
      }
    }

    return this.port.updateUser(id, user);
  }

  async deleteUser(id:number):Promise<boolean>{
    return this.port.deleteUser(id);
  }
}