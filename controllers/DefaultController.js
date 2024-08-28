import axios from 'axios';
import { Project } from '../models/Project.js';
import { Sequelize, QueryTypes , Op  } from "sequelize";
import { body, validationResult } from 'express-validator';
import { logger } from '../config/logger.js';

export const healthcheck = async (req,res)=>{
    const data = { message: 'Welcome to Spritz API , Everything Connected'};
    console.log(' Request for healthcheck:', data);
    logger.info(`data: ${data}`);
    try {
        res.status(200).send({
          success: true,
          error: false,
          message: data //"Welcome to Spritz System Server",
        });
      } catch (error) {
        //throw new Error(error.message ? error.message : JSON.stringify(error));
        console.log('error', JSON.stringify(error))
        console.log(' error:', error);
      }
}

export const getSystemInfo = async (req, res) => {
    const data = { message: 'Welcome to Spritz API' };
    
    console.log(' Request for systemInfo:', data);
    try {
      res.status(200).send({
        success: true,
        error: false,
        message: data
      });
    } catch (error) {
        console.log('error', JSON.stringify(error))
        console.log(' error:', error);
    }
};

export const projects = async (req, res) => {
    try {
        // Direct param
        const ID = req.params.Id;

        // QueryParams
        let ProjectID       = req.query.ProjectID || null,
            ProjectName     = req.query.ProjectName || null,
            Query           = req.query.query || null,
            page            = parseInt(req.query.page) || 1,
            limit           = parseInt(req.query.limit) || 10;

        

        // Default return Data
        let projects = [];

        if (ProjectID || ID) {
            // findByPk
            let projectId = ProjectID || ID;
            projects = await Project.findByPk(projectId);
            if (!projects) {
                return res.status(404).send({
                    success: false,
                    error: true,
                    message: 'Project not found'
                });
            }
        } else if (ProjectName) {
            // findOne
            projects = await Project.findOne({ where: { ProjectName: ProjectName } });
            if (!projects) {
                return res.status(404).send({
                    success: false,
                    error: true,
                    message: 'Project not found'
                });
            }
        } else if (Query) {
            // Query on Table
            projects = await Project.findAndCountAll({
                where: {
                    [Op.or]: [
                        { ProjectName: { [Op.like]: `%${Query}%` } },
                        { Status: { [Op.like]: `%${Query}%` } },
                        { Budget: { [Op.like]: `%${Query}%` } },
                        { Description: { [Op.like]: `%${Query}%` } },
                    ]
                },
                limit: limit,
                offset: (page - 1) * limit
            });
        } else {
            // findAll with pagination
            projects = await Project.findAndCountAll({
                limit: limit,
                offset: (page - 1) * limit
            });
        }

        res.status(200).send({
            success: true,
            error: false,
            message: projects.rows || projects,
            totalItems: projects.count || (projects ? 1 : 0),
            totalPages: Math.ceil(projects.count / limit),
            currentPage: page
        });
    } catch (error) {
        console.error('Error in projects API:', error);
        res.status(500).send({
            success: false,
            error: true,
            message: 'Internal Server Error',
            details: error.message
        });
    }
};

export const createprojects = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, error: true, message: 'Validation failed', details: errors.array() });
    }

    try {
        console.log('req:', typeof req.body);
        let Projects = req.body;

        if (!Array.isArray(Projects) || Projects.length === 0) {
            return res.status(400).send({
                success: false,
                error: true,
                message: 'Invalid request body. Expected an array of projects.'
            });
        }

        const creationResults = await Promise.all(Projects.map(async (project) => {
            try {
                console.log('received project', project);
                const NewProject = await Project.create(project);
                console.log('New Project ID:', NewProject.ProjectID);
                return { projectID: NewProject.ProjectID, success: true };
            } catch (error) {
                if (error.name === 'SequelizeValidationError') {
                    console.error('Validation error creating project:', project, error);
                    return { project, success: false, error: error.errors.map(e => e.message) };
                } else {
                    console.error('Error creating project:', project, error);
                    return { project, success: false, error: error.message };
                }
            }
        }));

        const failedCreations = creationResults.filter(result => !result.success);

        if (failedCreations.length > 0) {
            return res.status(500).send({
                success: false,
                error: true,
                message: 'Some projects could not be created.',
                details: failedCreations
            });
        }

        res.status(200).send({
            success: true,
            error: false,
            message: 'Created Successfully'
        });
    } catch (error) {
        console.error('Error in createprojects API:', error);
        res.status(500).send({
            success: false,
            error: true,
            message: 'Internal Server Error',
            details: error.message
        });
    }
};

export const updateprojects = async (req, res) => {
    try {
        console.log('req:', req.body);
        let Projects = req.body;

        if (!Array.isArray(Projects) || Projects.length === 0) {
            return res.status(400).send({
                success: false,
                error: true,
                message: 'Invalid request body. Expected an array of projects.'
            });
        }

        const updateResults = await Promise.all(Projects.map(async (project) => {
            try {
                console.log('received project', project);
                const UpdatedProject = await Project.update(project, { where: { ProjectID: project.ProjectID } });
                console.log('New Project:', UpdatedProject);
                return { projectID: project.ProjectID, success: true };
            } catch (error) {
                console.error('Error updating project:', project.ProjectID, error);
                return { projectID: project.ProjectID, success: false, error: error.message };
            }
        }));

        const failedUpdates = updateResults.filter(result => !result.success);

        if (failedUpdates.length > 0) {
            return res.status(500).send({
                success: false,
                error: true,
                message: 'Some projects could not be updated.',
                details: failedUpdates
            });
        }

        res.status(200).send({
            success: true,
            error: false,
            message: 'Updated Successfully'
        });
    } catch (error) {
        console.error('Error in updateprojects API:', error);
        res.status(500).send({
            success: false,
            error: true,
            message: 'Internal Server Error',
            details: error.message
        });
    }
};

export const deleteprojects = async (req, res) => {
    try {
        console.log('req:', req);
        let Projects = req.body;

        if (!Array.isArray(Projects) || Projects.length === 0) {
            return res.status(400).send({
                success: false,
                error: true,
                message: 'Invalid request body. Expected an array of projects.'
            });
        }

        const deletionResults = await Promise.all(Projects.map(async (project) => {
            try {
                console.log('received project', project);
                const DeletedProject = await Project.destroy({ where: { ProjectID: project.ProjectID } });
                console.log('Deleted Project:', DeletedProject);
                return { projectID: project.ProjectID, success: true };
            } catch (error) {
                console.error('Error deleting project:', project.ProjectID, error);
                return { projectID: project.ProjectID, success: false, error: error.message };
            }
        }));

        const failedDeletions = deletionResults.filter(result => !result.success);

        if (failedDeletions.length > 0) {
            return res.status(500).send({
                success: false,
                error: true,
                message: 'Some projects could not be deleted.',
                details: failedDeletions
            });
        }

        res.status(200).send({
            success: true,
            error: false,
            message: 'Deleted Successfully'
        });
    } catch (error) {
        console.error('Error in deleteprojects API:', error);
        res.status(500).send({
            success: false,
            error: true,
            message: 'Internal Server Error',
            details: error.message
        });
    }
};

export const getBooks = async ( req, res) => {
    let title = req.query.title; // Get the title from query parameter
    console.log( ' title:', title);
    if (!title) {
        title = 'Open API';
        //return res.status(400).json({ error: 'Title query parameter is required' });
    }

    try {
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
            params: { q: `intitle:${title}` }
        });
        console.log(' return data:', response.data);
        //res.json(response.data);

        res.status(200).send({
            success: true,
            error: false,
            data: response.data
          });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching data from Google Books API' });
    }
};