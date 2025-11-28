import { Request, Response } from "express";
import { UserApplication } from "../../application/UserApplication";
import { loadUserData } from "../util/user-validation";
import { User } from "../../domain/User";
import { loadUpdateUserData } from "../util/user-update-validation";
import { loadEmail } from "../util/email-validation";

export class UserController{
  constructor(private app: UserApplication){}

  async createUser(req: Request, res:Response):Promise<Response>{
    try {
      const {first_name, second_name, last_name, second_last_name, email, password} = loadUserData(req.body)
      const user: Omit<User, "id"> = {first_name, second_name, last_name, second_last_name, email, password};
      const userId = await this.app.createUser(user);
      return res.status(201).json({msg: "Usuario creado con éxito", userId});
    } catch (error) {
      if (error instanceof Error) {
        return res.status(201).json({error: "Error interno del servidor", details: error.message});
      }
      return res.status(201).json({error: "Error interno del servidor"});
    }
  }

  async updateUser(req: Request, res:Response):Promise<Response>{
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({error: "ID inválido"});
      }

      const dataLoad = loadUpdateUserData(req.body);
      const updated = await this.app.updateUser(id, dataLoad); 

      if (!updated) {
        return res.status(400).json({error: "Usuario no encontrado o sin cambios"});
      }

      return res.status(200).json({msg: "Usuario actualizado con éxito"});
    } catch (error) {
      if (error instanceof Error) {
        return res.status(201).json({error: "Error interno del servidor", details: error.message});
      }
      return res.status(201).json({error: "Error interno del servidor"});
    }
  }

  async getUserById(req: Request, res:Response):Promise<Response>{
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({error: "ID inválido"});
      }

      const user = await this.app.getUserById(id); 

      if (!user) {
        return res.status(400).json({error: "Usuario no encontrado"});
      }

      return res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(201).json({error: "Error interno del servidor", details: error.message});
      }
      return res.status(201).json({error: "Error interno del servidor"});
    }
  }

  async getUserByEmail(req: Request, res:Response):Promise<Response>{
    try {
      const {email} = loadEmail(req.params);

      const user = await this.app.getUserByEmail(email); 

      if (!user) {
        return res.status(400).json({error: "Usuario no encontrado"});
      }

      return res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(201).json({error: "Error interno del servidor", details: error.message});
      }
      return res.status(201).json({error: "Error interno del servidor"});
    }
  }

  async getAllUsers(req: Request, res:Response):Promise<Response>{
    try {
      const users = await this.app.getAllUsers(); 
      return res.status(200).json(users);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(201).json({error: "Error interno del servidor", details: error.message});
      }
      return res.status(201).json({error: "Error interno del servidor"});
    }
  }

  async deleteUser(req: Request, res:Response):Promise<Response>{
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({error: "ID inválido"});
      }

      const deleted = await this.app.deleteUser(id); 

      if (!deleted) {
        return res.status(400).json({error: "Usuario no encontrado"});
      }

      return res.status(200).json({msg: "Usuario eliminado con éxito"});
    } catch (error) {
      if (error instanceof Error) {
        return res.status(201).json({error: "Error interno del servidor", details: error.message});
      }
      return res.status(201).json({error: "Error interno del servidor"});
    }
  }
  
}