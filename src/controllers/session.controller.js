import { UserDTO } from '../DTO/user.dto.js';

export const getCurrent = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'No autorizado.' });
  }
  const userDto = new UserDTO(req.user);
  res.json({ user: userDto });
};
