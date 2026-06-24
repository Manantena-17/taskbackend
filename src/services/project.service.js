const { Project, Task } = require('../models');
const AppError = require('../utils/AppError'); // Import de la classe utilitaire

// add roject
exports.createProject = async (data, userId) => {
  return await Project.create({
    ...data,
    creatorId: userId
  });
};

// get all project the one user
exports.getAllByUserId = async (userId) => {
  return await Project.findAll({
    where: { creatorId: userId },
    include: [Task]
  });
};

// get one project with id user
exports.getProjectById = async (projectId, userId) => {
  const project = await Project.findOne({
    where: { id: projectId, creatorId: userId }
  });

  if (!project) {
    
    throw new AppError("Projet non trouvé ou accès refusé", 404);
  }
  return project;
};
// up date project
exports.updateProject = async (projectId, userId, data) => {
  const project = await Project.findOne({
    where: { id: projectId, creatorId: userId }
  });
  if (!project) {
    throw new AppError("Projet introuvable ou accès refusé", 404);
  }
  await project.update(data);

  return project;
};
// delet project
exports.deleteProject = async (projectId, userId) => {
  const deleted = await Project.destroy({
    where: { id: projectId, creatorId: userId }
  });

  if (!deleted) {
    throw new AppError("Projet introuvable ou accès refusé", 404);
  }
  return true;
};