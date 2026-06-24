// src/validators/project.validator.js
const Joi = require('joi');

const projectSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.min': 'Le titre du projet doit contenir au moins 3 caractères',
      'string.max': 'Le titre du projet ne peut pas dépasser 100 caractères',
      'any.required': 'Le titre du projet est obligatoire'
    }),
  
  description: Joi.string()
    .allow('', null) // Permet une chaîne vide ou null
    .max(500)
    .messages({
      'string.max': 'La description ne peut pas dépasser 500 caractères'
    })
});

module.exports = {
  projectSchema
};