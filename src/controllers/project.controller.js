// src/controllers/project.controller.js
const projectService = require('../services/project.service');

// Créer un projet
exports.create = async (req, res, next) => {
  try {
    const userId = req.user.id; // Récupéré depuis le middleware d'auth
    const project = await projectService.createProject(req.body, userId);
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

// Récupérer tous les projets de l'utilisateur
exports.getAll = async (req, res, next) => {
  try {
    const projects = await projectService.getAllByUserId(req.user.id);
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

// Récupérer un projet par ID
exports.getOne = async (req, res, next) => {
  try {
    const project = await projectService.getProjectById(req.params.id, req.user.id);
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};
// mise a  jour 
exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const data = req.body;

    const project = await projectService.updateProject(id, userId, data);
    res.status(200).json({
      message: "Projet mis à jour avec succès",
      project
    });
  } catch (error) {
    next(error);
  }
};
// Supprimer un projet
exports.delete = async (req, res, next) => {
  try {
    await projectService.deleteProject(req.params.id, req.user.id);
    res.status(204).send(); // 204 = No Content (succès de suppression)
  } catch (error) {
    next(error);
  }
};