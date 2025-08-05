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

  async findAll() {
    return UserModel.find();
  }

  async updateById(id, updateData) {
    return UserModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  }

  async deleteById(id) {
    return UserModel.findByIdAndDelete(id);
  }
}
