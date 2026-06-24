// src/models/Project.js
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    title: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    description: { 
      type: DataTypes.TEXT, 
      allowNull: true 
    },
    creatorId: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    }
  });
  
  return Project; // C'est le retour de l'objet qui est crucial
};