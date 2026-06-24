// src/routes/project.routes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validator.middleware');
const { projectSchema } = require('../validators/project.validator');
const projectController = require('../controllers/project.controller');

// securisation de projet
router.use(auth);

// add project
router.post('/', validate(projectSchema), projectController.create);

// get all project  GET /api/projects
router.get('/', projectController.getAll);

// get on project with id  GET /api/projects/id
router.get('/:id', projectController.getOne);
//  up date project with id put/api/projects/id
router.put('/:id',projectController.update);
// delet projects with id  DELETE /api/projects/id
router.delete('/:id', projectController.delete);

module.exports = router;