import { UserRoles } from "./UserRoles";

export interface User {
  id: number,
  first_name: string,
  second_name: string,
  last_name: string,
  second_last_name: string,
  rol: UserRoles,
  email: string,
  password: string,
  created_at?: string,
  updated_at?: string,
  deleted_at?: string,
}