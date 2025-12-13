import joi from 'joi';

export type ReturnPublicationData = {
  titulo: string,
  descripcion: string,
  precio: number,
};

export type ValidationPublicationData = {
  error: joi.ValidationError | undefined;
  value: ReturnPublicationData;
};

const validatePublicationData = (data:any): ValidationPublicationData => {
  const userSchema = joi.object({
    titulo: joi.string().trim().min(3).max(250).required().messages({
      'string.base': 'El título debe ser un texto',
      'string.empty': 'El título es requerido',
      'string.min': 'El título debe tener al menos 3 caracteres',
      'string.max': 'El título no puede exceder 250 caracteres',
      'any.required': 'El título es requerido'
    }),
    descripcion: joi.string().trim().min(10).required().messages({
      'string.base': 'La descripción debe ser un texto',
      'string.empty': 'La descripción es requerida',
      'string.min': 'La descripción debe tener al menos 10 caracteres',
      'any.required': 'La descripción es requerida'
    }),
    precio: joi.number().integer().min(0).required().messages({
      'number.base': 'El precio debe ser un número',
      'number.integer': 'El precio debe ser un número entero',
      'number.min': 'El precio debe ser mayor o igual a 0',
      'any.required': 'El precio es requerido'
    })
  }).unknown(false);

  const {error,value} = userSchema.validate(data, {abortEarly:false});
  return {error,value};
}

export const loadPublicationData = (data:any): ReturnPublicationData => {
  const result = validatePublicationData(data);
  if(result.error){
    const message = result.error.details.map(d => d.message).join(', ');
    throw new Error(message);
  }
  return result.value;
}