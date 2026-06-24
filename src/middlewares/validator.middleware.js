// src/middlewares/validator.middleware.js

/**
 * Middleware générique pour valider les données de la requête
 * @param {Object} schema - Le schéma de validation Joi défini dans /validators
 */
const validate = (schema) => {
  return (req, res, next) => {
    // On valide req.body par rapport au schéma fourni
    // abortEarly: false permet de lister TOUTES les erreurs d'un coup
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      // Construction d'un message d'erreur lisible
      const errorMessage = error.details.map((detail) => detail.message).join(', ');
      
      return res.status(400).json({
        success: false,
        message: 'Validation échouée',
        errors: errorMessage
      });
    }

    // Si tout est valide, on passe au contrôleur
    next();
  };
};

module.exports = validate;