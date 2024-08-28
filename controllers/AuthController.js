import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { User } from '../models/User.js'; // Adjust the import according to your project structure
import { Sequelize } from 'sequelize'; // Import Sequelize to handle specific errors

export const registerUser = async (req, res, next) => {
    try {
        // Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            username,
            email,
            password,
            firstName,
            lastName,
            dateOfBirth,
            gender,
            phoneNumber,
            address,
            city,
            state,
            country,
            zipCode
        } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            firstName,
            lastName,
            dateOfBirth,
            gender,
            phoneNumber,
            address,
            city,
            state,
            country,
            zipCode
        });

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                dateOfBirth: newUser.dateOfBirth,
                gender: newUser.gender,
                phoneNumber: newUser.phoneNumber,
                address: newUser.address,
                city: newUser.city,
                state: newUser.state,
                country: newUser.country,
                zipCode: newUser.zipCode
            }
        });
    } catch (error) {
        if (error instanceof Sequelize.ValidationError) {
            // Handle Sequelize validation errors
            return res.status(400).json({ error: error.errors.map(e => e.message) });
        } else if (error instanceof Sequelize.UniqueConstraintError) {
            // Handle unique constraint errors
            return res.status(400).json({ error: 'Email already in use' });
        } else {
            // Log the error and return a generic error message
            console.error('Database error:', error);
            return res.status(500).send({
                success: false,
                error: true,
                message: 'Internal Server Error',
                details: error.message
            });
        }
    }
};

// User login controller
export const loginUser = async (req, res, next) => {
    try {
        // Validate request
        const errors = validationResult(req);
        console.log('errors:', errors);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({
                success: false,
                error: true,
                message: 'Invalid email or password'
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('isMatch:', isMatch);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                error: true,
                message: 'Invalid email or password'
            });
        }

        // Ensure JWT_SECRET is defined
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            token
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send({
            success: false,
            error: true,
            message: 'Internal Server Error',
            details: error.message
        });
    }
};