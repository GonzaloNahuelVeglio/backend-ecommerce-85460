import { UserModel } from '../models/Users.js';
import { CartModel } from '../models/Cart.js';
import bcrypt from 'bcrypt';

export const registerUserWithCart = async ({ first_name, last_name, email, age, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
   const newUser = await UserModel.create({
    first_name,
    last_name,
    email,
    age,
    password: hashedPassword
  });
   const newCart = await CartModel.create({ user: newUser._id, products: [] });
  newUser.cart = newCart._id;
  await newUser.save();
  return newUser;
};
