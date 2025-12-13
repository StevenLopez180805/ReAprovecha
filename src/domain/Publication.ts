import { PublicationStatus } from "./PublicationStatus";

export interface Publication {
  id: number,
  titulo: string,
  descripcion: string,
  precio: number,
  estado: PublicationStatus,
  user_id: number,
  user_reserve_id?: number | null,
  created_at?: string,
  updated_at?: string,
  deleted_at?: string,
}