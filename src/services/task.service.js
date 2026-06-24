const { Task, Project } = require('../models');
const AppError = require('../utils/AppError');

// add task
exports.createTask = async (data, projectId, userId) => {
  const project = await Project.findOne({ where: { id: projectId, creatorId: userId } });
  if (!project) throw new AppError("Accès refusé au projet ou projet introuvable", 403);

  return await Task.create({ ...data, projectId });
};

// get all tasks with id user
exports.getAllByProject = async (projectId, userId) => {
  const project = await Project.findOne({ where: { id: projectId, creatorId: userId } });
  if (!project) throw new AppError("Accès refusé au projet ou projet introuvable", 403);

  return await Task.findAll({ where: { projectId } });
};

// up date the task
exports.updateTask = async (taskId, data, userId) => {
  const task = await Task.findByPk(taskId, { include: [Project] });
  if (!task || task.Project.creatorId !== userId) {
    throw new AppError("Tâche non trouvée ou accès refusé", 404);
  }

  return await task.update(data);
};

// delet task
exports.deleteTask = async (taskId, userId) => {
  const task = await Task.findByPk(taskId, { include: [Project] });
  if (!task || task.Project.creatorId !== userId) {
    throw new AppError("Tâche non trouvée ou accès refusé", 404);
  }

  return await task.destroy();
};