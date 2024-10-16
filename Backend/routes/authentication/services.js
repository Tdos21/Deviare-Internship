const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: "Token is required" });

    jwt.verify(token, 'secret_key', (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid Token" });
        req.user = user;  // Attach user info to request
        next();
    });
};

const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access Denied" });
        }
        next();
    };
};

module.exports = { authenticateToken, authorizeRoles };
