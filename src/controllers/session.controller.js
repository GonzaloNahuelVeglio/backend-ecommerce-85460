export const getCurrent = (req, res) => {
  // passport-jwt ya te deja req.user listo
  if (!req.user) {
    return res.status(401).json({ message: 'No autorizado.' });
  }

  res.json({
    user: {
      id: req.user._id,
      email: req.user.email,
      role: req.user.role
    }
  });
};
