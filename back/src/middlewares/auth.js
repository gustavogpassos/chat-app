const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    try {
        const {user} = jwt.verify(token.slice(7), 'secret');
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
}