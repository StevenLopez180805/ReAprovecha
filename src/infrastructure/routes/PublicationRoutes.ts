import { Router } from "express";
import { PublicationAdapter } from '../adapter/PublicationAdapter';
import { PublicationApplication } from "../../application/PublicationApplication";
import { PublicationController } from "../controller/PublicationController";
import { authenticateToken } from "../web/authMiddleware";
import { UserRoles } from "../../domain/UserRoles";
import { authorizeRoles } from "../web/roleMiddleware";

const router = Router();
// Inicializacion de las capas
const publicationAdapter = new PublicationAdapter();
const publicationApp = new PublicationApplication(publicationAdapter);
const publicationController = new PublicationController(publicationApp);

router.post("/publications", authenticateToken, authorizeRoles(UserRoles.VENDEDOR), async (req, res) => {
  try {
    return await publicationController.createPublication(req, res);
  } catch (error) {
    return res.status(500).json({message: "Error en la creación de la publicación", error});
  }
});

router.get("/publications", authenticateToken, async (req, res) => {
  try {
    return await publicationController.getAllPublications(req, res);
  } catch (error) {
    return res.status(500).json({message: "Error en la obtención de las publicaciones", error});
  }
});

router.get("/publications/creator/:user_id", authenticateToken, async (req, res) => {
  try {
    return await publicationController.getPublicationsByUser(req, res);
  } catch (error) {
    return res.status(500).json({message: "Error en la obtención de las publicaciones", error});
  }
});

router.get("/publications/:id", authenticateToken, async (req, res) => {
  try {
    return await publicationController.getPublicationById(req, res);
  } catch (error) {
    return res.status(500).json({message: "Error en la obtención de la publicación", error});
  }
});

router.delete("/publications/:id", authenticateToken, authorizeRoles(UserRoles.VENDEDOR, UserRoles.ADMINISTRADOR), async (req, res) => {
  try {
    return await publicationController.deletePublication(req, res);
  } catch (error) {
    return res.status(500).json({message: "Error en la eliminación de la publicación", error});
  }
});

router.patch("/publications/:id", authenticateToken, authorizeRoles(UserRoles.VENDEDOR), async (req, res) => {
  try {
    return await publicationController.updatePublication(req, res);
  } catch (error) {
    return res.status(500).json({message: "Error en la actualización de la publicación", error});
  }
});

router.post("/publications/reservar/:id", authenticateToken, authorizeRoles(UserRoles.COMPRADOR), async (req, res) => {
  try {
    return await publicationController.reservePublication(req, res);
  } catch (error) {
    return res.status(500).json({message: "Error al reservar la publicación", error});
  }
});

router.post("/publications/cancelar-reserva/:id", authenticateToken, authorizeRoles(UserRoles.COMPRADOR), async (req, res) => {
  try {
    return await publicationController.unreservePublication(req, res);
  } catch (error) {
    return res.status(500).json({message: "Error al deshacer la reservar de la publicación", error});
  }
});

export default router;