import { badRequest, notFound } from './http.js';
import validator from 'validator';
export const InvalidPasswordResponse = () =>
  badRequest({ message: 'Password must be at least 6 characters' });

export const EmailAlreadyInUseResponse = () =>
  badRequest({ message: 'Invalid e-mail. Please provide a valid one' });

export const InvalidIdResponse = () => badRequest({ message: 'The provided id is not valid' });

export const checkIsPasswordIsValid = (password) => password.length >= 6;

export const checkIfEmailIsValid = (email) => validator.isEmail(email);

export const checkIfIdIsValid = (id) => typeof id === 'string' && validator.isUUID(id);

export const userNotFoundResponse = () => notFound({ message: 'User not found' });
