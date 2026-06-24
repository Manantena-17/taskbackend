// src/controllers/task.controller.js
const taskService = require('../services/task.service');

// Créer une tâche dans un projet spécifique
exports.create = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const task = await taskService.createTask(req.body, projectId, req.user.id);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// Récupérer toutes les tâches d'un projet
exports.getAllByProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const tasks = await taskService.getAllByProject(projectId, req.user.id);
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

// Mettre à jour une tâche (status, priorité, etc.)
exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await taskService.updateTask(id, req.body, req.user.id);
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// Supprimer une tâche
exports.delete = async (req, res, next) => {
  try {
    await taskService.deleteTask(req.params.id, req.user.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};