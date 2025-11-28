import * as joi from 'joi';

export type ReturnUserData = {
  first_name: string,
  second_name: string,
  last_name: string,
  second_last_name: string,
  email: string,
  password: string
};

export type ValidationUserData = {
  error: joi.ValidationError | undefined;
  value: ReturnUserData;
};

const validateUserData = (data:any): ValidationUserData => {
  const userSchema = joi.object({
    first_name: joi.string().trim().min(3).required().messages({
      'string.base': 'El first name debe ser un texto',
      'string.empty': 'El first name es requerido',
      'string.min': 'El first name debe tener al menos 3 caracteres'
    }),
    second_name: joi.string().trim().min(3).required().messages({
      'string.base': 'El second name debe ser un texto',
      'string.empty': 'El second name es requerido',
      'string.min': 'El second name debe tener al menos 3 caracteres'
    }),
    last_name: joi.string().trim().min(3).required().messages({
      'string.base': 'El last name debe ser un texto',
      'string.empty': 'El last name es requerido',
      'string.min': 'El last name debe tener al menos 3 caracteres'
    }),
    second_last_name: joi.string().trim().min(3).required().messages({
      'string.base': 'El second last name debe ser un texto',
      'string.empty': 'El second last name es requerido',
      'string.min': 'El second last name debe tener al menos 3 caracteres'
    }),
    email: joi.string().email({tlds: {allow: false}}).required().messages({
      'string.empty': 'El correo electrónico es requerido',
      'string.email': 'Correo electrónico no válido'
    })
  }).unknown(false);

  const {error,value} = userSchema.validate(data, {abortEarly:false});
  return {error,value};
}

export const loadUserData = (data:any): ReturnUserData => {
  const result = validateUserData(data);
  if(result.error){
    const message = result.error.details.map(d => d.message).join(', ');
    throw new Error(message);
  }
  return result.value;
}