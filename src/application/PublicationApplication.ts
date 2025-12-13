import { Publication } from "../domain/Publication";
import { PublicationPort } from "../domain/PublicationPort";
import { PublicationStatus } from "../domain/PublicationStatus";
export class PublicationApplication{

  constructor(private port:PublicationPort){}

  async createPublication(publication:Omit<Publication,"id">):Promise<number>{
    return this.port.createPublication(publication);
  }

  async getPublicationById(id:number):Promise<Publication|null>{
    return this.port.getPublicationById(id);
  }
  
  async getPublicationsByUser(userId:number):Promise<Publication[]>{
    return this.port.getPublicationsByUser(userId);
  }

  async getAllPublications(filters?: { titulo?: string; descripcion?: string }):Promise<Publication[]>{
    return this.port.getAllPublications(filters);
  }

  async updatePublication(id:number, publication:Partial<Publication>):Promise<boolean>{
    const existingPublication = await this.port.getPublicationById(id);
    if (!existingPublication) {
      throw new Error("Publicación no encontrada");
    }
    
    return this.port.updatePublication(id, publication);
  }

  async deletePublication(id:number):Promise<boolean>{
    return this.port.deletePublication(id);
  }

  async reservePublication(id:number, userReserveId:number):Promise<boolean>{
    const publication = await this.port.getPublicationById(id);
    if (!publication) {
      throw new Error("Publicación no encontrada o no disponible");
    }

    if (publication.user_id == userReserveId) {
      throw new Error("No puedes reservar tu propia publicación");
    }

    if (publication.estado != PublicationStatus.DISPONIBLE) {
      throw new Error("La publicación no está disponible para reservar");
    }

    return this.port.reservePublication(id, userReserveId);
  }

  async unreservePublication(id:number, userReserveId:number):Promise<boolean>{
    const publication = await this.port.getPublicationById(id);
    if (!publication) {
      // La publicación no existe o su usuario creador está eliminado
      throw new Error("Publicación no encontrada o no disponible");
    }
    if (publication.user_reserve_id === userReserveId) {
      throw new Error("Solo el comprador puede deshacer la reserva de la publicación");
    }

    if (publication.estado !== PublicationStatus.RESERVADA) {
      throw new Error("La publicación no está reservada");
    }

    return this.port.unreservePublication(id);
  }
}