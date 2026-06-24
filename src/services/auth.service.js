const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const AppError = require('../utils/AppError'); // Import de la classe utilitaire

// Fonction d'inscription
exports.register = async (userData) => {
  const { name, email, password } = userData;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new AppError('Cet email est déjà utilisé', 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return await User.create({ name, email, password: hashedPassword });
};

// Fonction de connexion
exports.login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  
  // On utilise un message générique par sécurité pour éviter le "user enumeration"
  if (!user) {
    throw new AppError('Identifiants invalides', 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError('Identifiants invalides', 401);
  }

  const token = jwt.sign(
    { id: user.id, email: user.email }, 
    process.env.JWT_SECRET, 
    { expiresIn: '24h' }
  );

  return { token, user };
};