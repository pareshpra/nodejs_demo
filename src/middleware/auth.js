import jwt from "jsonwebtoken";
import UserModal from "../modal/user.modal.js";
import UserTokenModal from "../modal/userToken.modal.js";

const Auth = async (req, res, next) => {

    try {
        //get the token from the headers
        let token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized user" });
        }

        let decoded = jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY);

        // find the user toke user is allow or not 
        const user = await UserModal.findOne({ _id: decoded._id });

        const userToken = await UserTokenModal.findOne({
            $and: [{ userId: decoded.id }, { accessToken: token }],
        });

        if (!user || !userToken) {
            return res.status(401).json({
                status: false,
                message: "Unauthorized user"
            })
        }
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: err.message || "Unauthorized user", });
    }

}

export default Auth;


