import Sequelize from "sequelize";
import sequelize from "../config/mysqlDB.js";

// Define the model for the 'Projects' table
export const Project = sequelize.define("Projects", {
  ProjectID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Automatically increment the ID
  },
  ProjectName: {
    type: Sequelize.STRING,
    allowNull: false, // ProjectName cannot be null
    unique: {
        args: true,
        msg: 'Project name must be unique'
    },
    validate: {
      notEmpty: true, // ProjectName cannot be an empty string
      len: [3, 255], // ProjectName must be between 3 and 255 characters
    },
  },
  StartDate: {
    type: Sequelize.DATE,
    allowNull: false, // StartDate cannot be null
    validate: {
      isDate: true, // Must be a valid date
    },
  },
  EndDate: {
    type: Sequelize.DATE,
    allowNull: true, // EndDate can be null
    validate: {
      isDate: true, // Must be a valid date
      isAfterStartDate(value) {
        if (value && this.StartDate && new Date(value) < new Date(this.StartDate)) {
          throw new Error('EndDate must be after StartDate');
        }
      },
    },
  },
  Budget: {
    type: Sequelize.DECIMAL,
    allowNull: false, // Budget cannot be null
    validate: {
      isDecimal: true, // Must be a valid decimal number
      min: 0, // Budget must be a positive number
      isWithinBudgetLimit(value) {
        const budgetLimit = 1000000; // Example limit
        if (value > budgetLimit) {
          throw new Error(`Budget cannot exceed ${budgetLimit}`);
        }
      },
    },
  },
  Status: {
    type: Sequelize.STRING,
    allowNull: false, // Status cannot be null
    validate: {
      isIn: [['Pending', 'In Progress', 'Completed']], // Status must be one of these values
      isCompletedWithEndDate(value) {
        if (value === 'Completed' && !this.EndDate) {
          throw new Error('Completed projects must have an EndDate');
        }
      },
    },
  },
  Description: {
    type: Sequelize.STRING,
    allowNull: true, // Description can be null
    validate: {
      len: [0, 500], // Description must be between 0 and 500 characters
    },
  },
}, {
  timestamps: true,
  freezeTableName: true,
  tableName: 'Projects',
  createdAt: false,
  updatedAt: false,
});