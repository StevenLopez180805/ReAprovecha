import { Publication } from "./Publication";

export interface PublicationPort{
  createPublication(publication: Omit<Publication, "id">):Promise<number>
  updatePublication(id:number, publication: Partial<Publication>):Promise<boolean>
  deletePublication(id:number):Promise<boolean>
  getPublicationById(id:number):Promise<Publication|null>
  getPublicationsByUser(userId:number):Promise<Publication[]>
  getAllPublications(filters?: { titulo?: string; descripcion?: string }):Promise<Publication[]>
  reservePublication(id:number, userReserveId:number):Promise<boolean>
  unreservePublication(id:number):Promise<boolean>
}