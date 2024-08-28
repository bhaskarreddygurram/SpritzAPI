// middleware/validators.js
import { body } from 'express-validator';

export const validateRegistration = [
    body('username').isString().isLength({ min: 3, max: 50 }).withMessage('Username must be between 3 and 50 characters'),
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('firstName').optional().isString().withMessage('First name must be a string'),
    body('lastName').optional().isString().withMessage('Last name must be a string'),
    body('dateOfBirth').optional().isISO8601().withMessage('Date of birth must be a valid date'),
    body('gender').optional().isIn(['Male', 'Female', 'Other']).withMessage('Gender must be Male, Female, or Other'),
    body('phoneNumber').optional().isString().withMessage('Phone number must be a string'),
    body('address').optional().isString().withMessage('Address must be a string'),
    body('city').optional().isString().withMessage('City must be a string'),
    body('state').optional().isString().withMessage('State must be a string'),
    body('country').optional().isString().withMessage('Country must be a string'),
    body('zipCode').optional().isString().withMessage('Zip code must be a string')
];

export const validateLogin = [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];
export const validateProjects = [
    body('*.ProjectName').isString().isLength({ min: 3, max: 255 }).withMessage('ProjectName must be between 3 and 255 characters'),
    body('*.StartDate').isISO8601().toDate().withMessage('StartDate must be a valid date'),
    body('*.EndDate').optional().isISO8601().toDate().withMessage('EndDate must be a valid date'),
    body('*.Budget').isDecimal({ min: 0 }).withMessage('Budget must be a positive decimal number'),
    body('*.Status').isIn(['Pending', 'In Progress', 'Completed']).withMessage('Status must be one of: Pending, In Progress, Completed'),
    body('*.Description').optional().isLength({ max: 500 }).withMessage('Description must be less than 500 characters'),
];