const verifyAnonymous = (req, res, next) => {
    const anonymousId = req.query.anonymousId || req.body.anonymousId;

    if (!anonymousId) {
        return res.status(400).json({ error: 'Anonymous ID is required' });
    }

    // Optionally, add more checks or logic here if needed
    req.anonymousId = anonymousId; // Pass anonymousId to request object
    next();
};

module.exports = verifyAnonymous;
