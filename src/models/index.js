const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

// On injecte sequelize et DataTypes ici
const User = require('./User')(sequelize, DataTypes);
const Project = require('./Project')(sequelize, DataTypes);
const Task = require('./Task')(sequelize, DataTypes);

// --- Tes Associations ---
User.hasMany(Project, { foreignKey: 'creatorId' });
Project.belongsTo(User, { foreignKey: 'creatorId' });

Project.hasMany(Task, { foreignKey: 'projectId', onDelete: 'CASCADE' });
Task.belongsTo(Project, { foreignKey: 'projectId' });

User.hasMany(Task, { foreignKey: 'assignedTo', as: 'assignedTasks' });
Task.belongsTo(User, { foreignKey: 'assignedTo', as: 'assignee' });

module.exports = { sequelize, User, Project, Task };