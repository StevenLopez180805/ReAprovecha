import { Request, Response } from "express";
import { PublicationApplication } from "../../application/PublicationApplication";
import { loadPublicationData } from "../util/publication-validation";
import { Publication } from "../../domain/Publication";
import { loadUpdatePublicationData } from "../util/publication-update-validation";
import { PublicationStatus } from "../../domain/PublicationStatus";

export class PublicationController{
  constructor(private app: PublicationApplication){}

  async createPublication(req: Request, res:Response):Promise<Response>{
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "Usuario no autenticado" });
      }

      const {titulo, descripcion, precio} = loadPublicationData(req.body)
      const publication: Omit<Publication, "id"> = {
        titulo, 
        descripcion, 
        precio, 
        estado: PublicationStatus.DISPONIBLE,
        user_id: req.user.id,
        user_reserve_id: null
      };
      const publicationId = await this.app.createPublication(publication);
      return res.status(201).json({msg: "Publicación creada con éxito", publicationId});
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({error: "Error al crear la publicación", details: error.message});
      }
      return res.status(500).json({error: "Error interno del servidor"});
    }
  }

  async updatePublication(req: Request, res:Response):Promise<Response>{
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({error: "ID inválido"});
      }

      const dataLoad = loadUpdatePublicationData(req.body);
      const updated = await this.app.updatePublication(id, dataLoad); 

      if (!updated) {
        return res.status(400).json({error: "Publicación no encontrada o sin cambios"});
      }

      return res.status(200).json({msg: "Publicación actualizado con éxito"});
    } catch (error) {
      if (error instanceof Error) {
        return res.status(201).json({error: "Error interno del servidor", details: error.message});
      }
      return res.status(201).json({error: "Error interno del servidor"});
    }
  }

  async getPublicationById(req: Request, res:Response):Promise<Response>{
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({error: "ID inválido"});
      }

      const publication = await this.app.getPublicationById(id); 

      if (!publication) {
        return res.status(400).json({error: "Publicación no encontrada"});
      }

      return res.status(200).json(publication);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(201).json({error: "Error interno del servidor", details: error.message});
      }
      return res.status(201).json({error: "Error interno del servidor"});
    }
  }

  async getPublicationsByUser(req: Request, res:Response):Promise<Response>{
    try {
      const userId = Number(req.params.user_id);
      if (Number.isNaN(userId)) {
        return res.status(400).json({error: "ID del usuario inválido"});
      }

      const publications = await this.app.getPublicationsByUser(userId); 
      return res.status(200).json(publications);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(201).json({error: "Error interno del servidor", details: error.message});
      }
      return res.status(201).json({error: "Error interno del servidor"});
    }
  }

  async getAllPublications(req: Request, res:Response):Promise<Response>{
    try {
      const titulo = req.query.titulo as string | undefined;
      const descripcion = req.query.descripcion as string | undefined;
      
      const publications = await this.app.getAllPublications({ titulo, descripcion }); 
      return res.status(200).json(publications);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({error: "Error interno del servidor", details: error.message});
      }
      return res.status(500).json({error: "Error interno del servidor"});
    }
  }

  async deletePublication(req: Request, res:Response):Promise<Response>{
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({error: "ID inválido"});
      }

      const deleted = await this.app.deletePublication(id); 

      if (!deleted) {
        return res.status(400).json({error: "Publicación no encontrada"});
      }

      return res.status(200).json({msg: "Publicación eliminada con éxito"});
    } catch (error) {
      if (error instanceof Error) {
        return res.status(201).json({error: "Error interno del servidor", details: error.message});
      }
      return res.status(201).json({error: "Error interno del servidor"});
    }
  }

  async reservePublication(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
      }
  
      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "Usuario no autenticado" });
      }
      
      const reserve = await this.app.reservePublication(id, req.user.id);
  
      if (!reserve) {
        return res.status(400).json({ error: "No se pudo reservar la publicación" });
      }
  
      return res.status(200).json({ msg: "Publicación reservada con éxito" });
  
    } catch (error) {
      return res.status(500).json({
        error: "Error interno del servidor",
        details: error instanceof Error ? error.message : undefined
      });
    }
  }

  async unreservePublication(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
      }
  
      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "Usuario no autenticado" });
      }
      
      const reserve = await this.app.unreservePublication(id, req.user.id);
  
      if (!reserve) {
        return res.status(400).json({ error: "No se pudo deshacer la reservar de la publicación" });
      }
  
      return res.status(200).json({ msg: "Reservación cancelada con éxito" });
  
    } catch (error) {
      return res.status(500).json({
        error: "Error interno del servidor",
        details: error instanceof Error ? error.message : undefined
      });
    }
  }
  
}