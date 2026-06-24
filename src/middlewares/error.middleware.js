// src/middlewares/error.middleware.js

/**
 * Middleware de gestion globale des erreurs
 * Il doit être utilisé en tout dernier dans app.js
 */
module.exports = (err, req, res, next) => {
  // On définit un statut par défaut à 500 (Erreur serveur)
  const statusCode = err.statusCode || 500;
  
  // On logue l'erreur réelle dans la console pour le débogage (backend)
  console.error(`[Error] ${statusCode} - ${err.message}`);

  // On renvoie une réponse JSON propre au client (frontend/postman)
  res.status(statusCode).json({
    success: false,
    message: err.message || "Une erreur interne est survenue",
    // On n'affiche le stack trace que si on est en développement
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};