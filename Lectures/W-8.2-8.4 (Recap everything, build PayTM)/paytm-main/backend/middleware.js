const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');

const authMiddleware = (req, res, next) => {
    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith('Bearer ')) {
        return res.status(403).json({
            msg: 'No correct authorization format found'
        });
    }

    const token = auth.split(' ')[1];
    // console.log(auth);
    try {
        const { userId } = jwt.verify(token, JWT_SECRET);
        req.userId = userId;        // must be attached here to send data to function
        // console.log(userId);
        next()
    } catch (error) {
        return res.status(403).json({
            msg: "Invalid token"
        });
    }
}

module.exports = authMiddleware;