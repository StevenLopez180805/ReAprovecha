import joi from 'joi';
import { PublicationStatus } from '../../domain/PublicationStatus';

export type ReturnUpdatePublicationData = {
  titulo: string,
  descripcion: string,
  precio: number,
  estado: PublicationStatus,
  user_id: number,
  user_reserve_id?: number | null,
};

export type ValidationUpdatePublicationData = {
  error: joi.ValidationError | undefined;
  value: ReturnUpdatePublicationData;
};

const validateUpdatePublicationData = (data:any): ValidationUpdatePublicationData => {
  const userSchema = joi.object({
    titulo: joi.string().trim().min(3).max(250).messages({
      'string.base': 'El título debe ser un texto',
      'string.empty': 'El título no puede estar vacío',
      'string.min': 'El título debe tener al menos 3 caracteres',
      'string.max': 'El título no puede exceder 250 caracteres'
    }),
    descripcion: joi.string().trim().min(10).messages({
      'string.base': 'La descripción debe ser un texto',
      'string.empty': 'La descripción no puede estar vacía',
      'string.min': 'La descripción debe tener al menos 10 caracteres'
    }),
    precio: joi.number().integer().min(0).messages({
      'number.base': 'El precio debe ser un número',
      'number.integer': 'El precio debe ser un número entero',
      'number.min': 'El precio debe ser mayor o igual a 0'
    }),
    estado: joi.string().valid(PublicationStatus.DISPONIBLE, PublicationStatus.RESERVADA).messages({
      'any.only': 'El estado debe ser DISPONIBLE o RESERVADA'
    }),
    user_id: joi.number().integer().positive().messages({
      'number.base': 'El user_id debe ser un número',
      'number.integer': 'El user_id debe ser un número entero',
      'number.positive': 'El user_id debe ser un número positivo'
    }),
    user_reserve_id: joi.number().integer().positive().allow(null).messages({
      'number.base': 'El user_reserve_id debe ser un número o null',
      'number.integer': 'El user_reserve_id debe ser un número entero',
      'number.positive': 'El user_reserve_id debe ser un número positivo'
    })
  }).unknown(false).or("titulo", "descripcion", "precio", "estado", "user_id", "user_reserve_id");

  const {error,value} = userSchema.validate(data, {abortEarly:false});
  return {error,value};
}

export const loadUpdatePublicationData = (data:any): ReturnUpdatePublicationData => {
  const result = validateUpdatePublicationData(data);
  if(result.error){
    const message = result.error.details.map(d => d.message).join(', ');
    throw new Error(message);
  }
  return result.value;
}