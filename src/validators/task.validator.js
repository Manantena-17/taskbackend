
const Joi = require('joi');

const taskSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.min': 'Le titre doit contenir au moins 3 caractères',
      'any.required': 'Le titre est obligatoire'
    }),

  description: Joi.string()
    .allow('', null)
    .max(1000),

  priority: Joi.string()
    .valid('Low', 'Medium', 'High')
    .default('Medium'),

  status: Joi.string()
    .valid('Todo', 'In Progress', 'Review', 'Done')
    .default('Todo'),

  dueDate: Joi.date()
    .iso()
    .allow(null),

  assignedTo: Joi.number()
    .integer()
    .positive()
    .allow(null)
});

module.exports = {
  taskSchema
};