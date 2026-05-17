import jwt from 'jsonwebtoken';

// Creating Token
export const generateToken = ({ userId, role}) => {
    return jwt.sign(
        { userId, role},
        process.env.JWT_SECRETKEY,
        { expiresIn : '7d'}
    );
};

// Verify Token
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRETKEY);
    } catch (err) {
        return null;
    };
};