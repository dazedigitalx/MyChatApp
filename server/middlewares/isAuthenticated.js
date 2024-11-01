const isAuthenticated = (req, res, next) => {
    // Example: Check if user is authenticated, e.g., by verifying a token
    if (req.user) {
        // User is authenticated, proceed to the next middleware or route handler
        next();
    } else {
        // User is not authenticated, respond with 401 Unauthorized
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: Authentication token is missing or invalid'
        });
    }
};

module.exports = { isAuthenticated };
