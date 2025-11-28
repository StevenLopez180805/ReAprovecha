import * as joi from 'joi';

export type ReturnEmail = {
  email: string
};

export type ValidationEmail = {
  error: joi.ValidationError | undefined;
  value: ReturnEmail;
};

const validateEmail = (data:any): ValidationEmail => {
  const userSchema = joi.object({
    email: joi.string().email({tlds: {allow: false}}).required().messages({
      'string.empty': 'El correo electrónico es requerido',
      'string.email': 'Correo electrónico no válido'
    })
  }).unknown(false);

  const {error,value} = userSchema.validate(data, {abortEarly:false});
  return {error,value};
}

export const loadEmail = (data:any): ReturnEmail => {
  const result = validateEmail(data);
  if(result.error){
    const message = result.error.details.map(d => d.message).join(', ');
    throw new Error(message);
  }
  return result.value;
}