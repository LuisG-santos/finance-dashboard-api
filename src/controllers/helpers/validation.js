import validator from 'validator';
import { badRequest } from './http.js';

export const checkIfIdIsValid = (id) =>
  typeof id === 'string' && id.length > 0 && validator.isUUID(id);

export const InvalidIdResponse = () => badRequest({ message: 'The provided id is not valid' });
