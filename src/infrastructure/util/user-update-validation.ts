import joi from 'joi';

export type ReturnUpdateUserData = {
  first_name: string,
  second_name: string,
  last_name: string,
  second_last_name: string,
  email: string,
  password: string
};

export type ValidationUpdateUserData = {
  error: joi.ValidationError | undefined;
  value: ReturnUpdateUserData;
};

const validateUpdateUserData = (data:any): ValidationUpdateUserData => {
  const userSchema = joi.object({
    first_name: joi.string().trim().min(3).messages({
      'string.min': 'El first name debe tener al menos 3 caracteres'
    }),
    second_name: joi.string().trim().min(3).messages({
      'string.min': 'El second name debe tener al menos 3 caracteres'
    }),
    last_name: joi.string().trim().min(3).messages({
      'string.min': 'El last name debe tener al menos 3 caracteres'
    }),
    second_last_name: joi.string().trim().min(3).messages({
      'string.min': 'El second last name debe tener al menos 3 caracteres'
    }),
    email: joi.string().email({tlds: {allow: false}}).messages({
      'string.email': 'Correo electrónico no válido'
    }),
    password: joi.string().min(10).messages({
      'string.min': 'La contraseña debe tener al menos 10 caracteres'
    })
  }).unknown(false).or("first_name", "second_name", "last_name", "second_last_name", "email");

  const {error,value} = userSchema.validate(data, {abortEarly:false});
  return {error,value};
}

export const loadUpdateUserData = (data:any): ReturnUpdateUserData => {
  const result = validateUpdateUserData(data);
  if(result.error){
    const message = result.error.details.map(d => d.message).join(', ');
    throw new Error(message);
  }
  return result.value;
}