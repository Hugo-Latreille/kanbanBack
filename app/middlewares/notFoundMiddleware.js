function notFoundMiddleware(_, res, next) {
    res.status(404).json({ error: "Resource not found."});
    next(); 
    }

module.exports = notFoundMiddleware