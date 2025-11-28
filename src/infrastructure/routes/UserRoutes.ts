import { Router } from "express";
import { UserAdapter } from '../adapter/UserAdapter';
import { UserApplication } from "../../application/UserApplication";
import { UserController } from "../controller/UserController";

const router = Router();
// Inicializacion de las capas
const userAdapter = new UserAdapter();
const userApp = new UserApplication(userAdapter);
const userController = new UserController(userApp);

router.post("/users", async (req, res) => {
  try {
    return await userController.createUser(req, res);
  } catch (error) {
    return res.status(500).json({message: "Error en la creación de usuario", error});
  }
});

router.get("/users", async (req, res) => {
  try {
    return await userController.getAllUsers(req, res);
  } catch (error) {
    return res.status(500).json({message: "Error en la obtención de los usuarios", error});
  }
});
