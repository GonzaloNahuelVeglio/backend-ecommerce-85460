export const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Solo admin autorizado.' });
  next();
};

export const userOnly = (req, res, next) => {
  if (req.user?.role !== 'user') return res.status(403).json({ message: 'Solo usuarios pueden modificar carritos.' });
  next();
};
