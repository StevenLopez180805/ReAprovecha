import { Router } from "express";
import { UserAdapter } from '../adapter/UserAdapter';
import { UserApplication } from "../../application/UserApplication";
import { UserController } from "../controller/UserController";
import { authenticateToken } from "../web/authMiddleware";
import { authorizeRoles } from "../web/roleMiddleware";
import { UserRoles } from "../../domain/UserRoles";

const router = Router();
// Inicializacion de las capas
const userAdapter = new UserAdapter();
const userApp = new UserApplication(userAdapter);
const userController = new UserController(userApp);

router.post("/login", async (req, res) => {
  try {
    return await userController.login(req, res);
  } catch (error) {
    return res.status(500).json({message: "Error en la creación de usuario", error});
  }
});

router.post("/users", async (req, res) => {
  try {
    return await userController.createUser(req, res);
  } catch (error) {
    return res.status(500).json({message: "Error en la creación de usuario", error});
  }
});

router.get("/users", authenticateToken, authorizeRoles(UserRoles.ADMINISTRADOR), async (req, res) => {
  try {
    return await userController.getAllUsers(req, res);
  } catch (error) {
    return res.status(500).json({message: "Error en la obtención de los usuarios", error});
  }
});

router.get("/users/email/:email", authenticateToken, async (req, res) => {
  try {
    return await userController.getUserByEmail(req, res);
  } catch (error) {
    return res.status(500).json({message: "Error en la obtención del usuario", error});
  }
});

router.get("/users/:id", authenticateToken, async (req, res) => {
  try {
    return await userController.getUserById(req, res);
  } catch (error) {
    return res.status(500).json({message: "Error en la obtención del usuario", error});
  }
});

router.delete("/users/:id", authenticateToken, authorizeRoles(UserRoles.ADMINISTRADOR), async (req, res) => {
  try {
    return await userController.deleteUser(req, res);
  } catch (error) {
    return res.status(500).json({message: "Error en la eliminación del usuario", error});
  }
});

router.patch("/users/:id", authenticateToken, authorizeRoles(UserRoles.ADMINISTRADOR), async (req, res) => {
  try {
    return await userController.updateUser(req, res);
  } catch (error) {
    return res.status(500).json({message: "Error en la actualización del usuario", error});
  }
});

export default router;
