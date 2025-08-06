import { UserDAO } from '../daos/user.dao.js';
import { UserDTO } from '../DTO/user.dto.js';

export class UserRepository {
  constructor() {
    this.userDao = new UserDAO();
  }

  async getAllUsers() {
    const users = await this.userDao.findAll();
    return users.map(user => new UserDTO(user));
  }

  async getUserById(id) {
    const user = await this.userDao.findById(id);
    return user ? new UserDTO(user) : null;
  }

  async getUserByEmail(email) {
    const user = await this.userDao.findByEmail(email);
    return user ? new UserDTO(user) : null;
  }

  // Nuevo método para obtener el usuario completo (sin DTO)
  async getRawUserByEmail(email) {
    return this.userDao.findByEmail(email);
  }

  async createUser(userData) {
    const newUser = await this.userDao.create(userData);
    return new UserDTO(newUser);
  }

  async updateUser(id, updateData) {
    const updatedUser = await this.userDao.updateById(id, updateData);
    return updatedUser ? new UserDTO(updatedUser) : null;
  }

  async deleteUser(id) {
    return this.userDao.deleteById(id);
  }
}
