import jwt from "jsonwebtoken";
import UserToken from "../user/userToken.modal.js"


const generateToken = async (EmailId, userId) => {

    try {
        const accessTokenExpiry = { expiresIn: "1d" };
        const refreshTokenExpiry = { expiresIn: "1d" };
        const payload = {
            Email: EmailId,
            id: userId,
        };

        const accessToken = jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_PRIVATE_KEY,
            accessTokenExpiry
        );
        const refreshToken = jwt.sign(
            payload,
            process.env.REFRESH_TOKEN_PRIVATE_KEY,
            refreshTokenExpiry
        );
        let userToken = await UserToken?.findOne({ userId: userId });
        // if token is generated so first that delete the previous token
        if (userToken) await userToken.deleteOne();
        
        await new UserToken({
            userId: userId,
            refreshToken: refreshToken,
            accessToken: accessToken,
        }).save();
        return Promise.resolve({
            accessToken,
            refreshToken,
            accessTokenExpiry,
            refreshTokenExpiry,
        });
    } catch (error) {
        return Promise.reject(error);

    }
}

export default generateToken;