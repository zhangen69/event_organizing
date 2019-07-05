import jwt from 'jsonwebtoken';

const getMiddleware = (bypass) => {
    return bypass ? (req, res, next) => next() : checkAuth;
};

const checkAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'secret this should be longer');
        req.auth = { isAuth: true, user: decodedToken };
        next();
    } catch (error) {
        res.status(401).json({ message: 'Access Denied!' });
    }
};

export { checkAuth, getMiddleware };
