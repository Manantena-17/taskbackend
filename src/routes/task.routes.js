
const express = require('express');
// securisation the task one auth 
const router = express.Router({ mergeParams: true }); 
const auth = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validator.middleware');
const { taskSchema } = require('../validators/task.validator');
const taskController = require('../controllers/task.controller');

// secerusation de task
router.use(auth);

// add task POST /api/projects/:projectId/tasks
router.post('/', validate(taskSchema), taskController.create);

// get all tsks GET /api/projects/:projectId/tasks
router.get('/', taskController.getAllByProject);

// up date tasks with id PUT /api/projects/:projectId/tasks/id
router.put('/:id', validate(taskSchema), taskController.update);

// delet task with id projects and id tasks /api/projects/:projectId/tasks/id
router.delete('/:id', taskController.delete);

module.exports = router;