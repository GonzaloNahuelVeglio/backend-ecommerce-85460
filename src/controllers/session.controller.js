export const getCurrent = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'No autorizado.' });
  }

  res.json({
    user: {
      id: req.user._id,
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      age: req.user.age,
      role: req.user.role,
      createdAt: req.user.createdAt
    }
  });
};
