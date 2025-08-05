// src/daos/user.dao.js
import { UserModel } from '../models/Users.js';

export class UserDAO {
  async findByEmail(email) {
    return UserModel.findOne({ email });
  }

  async create(userData) {
    return UserModel.create(userData);
  }

  async findById(id) {
    return UserModel.findById(id);
  }

  // Agrega más métodos según lo que necesites (update, delete, etc.)
}