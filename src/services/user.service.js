import bcrypt from 'bcryptjs';
import { userRepository } from '../repositories/user.repository.js';
import { USER_ROLES } from '../constants/index.js';
import { AppError } from '../utils/app-error.js';

const MIN_PASSWORD_LENGTH = 8;
const SALT_ROUNDS = 10;

const hashPassword = async (password) => {
  if (typeof password !== 'string' || password.length < MIN_PASSWORD_LENGTH) {
    throw new AppError(
      `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres`,
      400,
    );
  }

  return bcrypt.hash(password, SALT_ROUNDS);
};

class UserService {
  async getAll() {
    return userRepository.getAll();
  }

  async getById(id) {
    const user = await userRepository.getById(id);

    if (!user) {
      throw new AppError('Usuario no encontrado', 404);
    }

    return user;
  }

  async create(data) {
    const password = await hashPassword(data.password);

    return userRepository.create({
      ...data,
      password,
      role: USER_ROLES.USER,
    });
  }

  async update(id, data) {
    const { role, ...changes } = data;

    if (changes.password !== undefined) {
      changes.password = await hashPassword(changes.password);
    }

    const updatedUser = await userRepository.update(id, changes);

    if (!updatedUser) {
      throw new AppError('Usuario no encontrado', 404);
    }

    return updatedUser;
  }

  async delete(id) {
    const deletedUser = await userRepository.delete(id);

    if (!deletedUser) {
      throw new AppError('Usuario no encontrado', 404);
    }

    return deletedUser;
  }
}

export const userService = new UserService();