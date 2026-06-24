// src/middlewares/auth.middleware.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Accès refusé." });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalide." });
  }
};

// C'EST ICI LA CLÉ DU BUG :
// Ne fais PAS "module.exports = { auth };" 
// Fais ceci :
module.exports = auth;