// middlewares/messageMiddleware.js

const checkMessage = (req, res, next) => {
    const { content } = req.body; // Assume the message content is sent in req.body

    // Validation: Ensure the message content is a non-empty string
    if (!content || typeof content !== 'string' || content.trim().length === 0) {
        return res.status(400).json({
            success: 0,
            message: 'Invalid message content. Message cannot be empty.'
        });
    }

    // Additional validation can be added here, such as length checks
    if (content.length > 500) { // Example max length
        return res.status(400).json({
            success: 0,
            message: 'Message content exceeds the maximum allowed length of 500 characters.'
        });
    }

    // Attach validated content to req.message for use in the route
    req.message = content;
    next(); // Proceed to the next middleware or route handler
};

module.exports = { checkMessage };
