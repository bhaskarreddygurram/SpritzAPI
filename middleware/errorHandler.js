// middleware/errorHandler.js
export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        error: true,
        message: err.message || 'Internal Server Error',
        details: err.details || null
    });
};