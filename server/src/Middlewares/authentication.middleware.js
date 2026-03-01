import jwt from "jsonwebtoken";
import BlacklistToken from "../DB/Models/blacklist.model.js";
import usersModel from "../DB/Models/users.model.js";

export const authenticationMiddleware = async (req, res, next) => {
    try {
        // Check authorization header
        const authHeader = req.headers.authorization;

        // Guest mode
        if (!authHeader) {
            res.isGuest = true;
            return next();
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res
                .status(400)
                .json({ message: "Unauthorized, please login!" });
        }

        // Token verification
        const data = jwt.verify(token, process.env.JWT_SECRET_LOGIN);

        // Check if token is in blacklist
        const isBlacklisted = await BlacklistToken.findOne({
            tokenId: data.jti,
        });
        if (isBlacklisted) {
            return res
                .status(401)
                .json({ message: "Unauthorized, please login!" });
        }

        // Find user
        const user = await usersModel.findById(data.id);
        if (!user) {
            return res
                .status(401)
                .json({ message: "Unauthorized, please login!" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token!" });
    }
};
