import bcrypt from "bcrypt";
import { User } from "../models/user.model";
import { signAccessToken } from "../utils/jwt.utils";

const SALT_ROUNDS = 10;

export async function register({name, email, password}){
    const normalizedEmail = email.toLowerCase();
    const existingUser = await User.findOne({where:{user_email:normalizedEmail}});
    if(existingUser){
        return {ok: false, status: 409, error: "Email already in use"};
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({
        name,
        user_email: normalizedEmail,
        hashedPassword
});

    const token = signAccessToken({sub: String(user.user_id), email: user.user_email});
    return {ok: true, status: 201, data:{token, user:{id: user.user_id, email: user.user_email}}};
}

export async function login({email, password}){
    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({where:{user_email:normalizedEmail}});
    if(!user){
        return {ok: false, status: 401, error: "Invalid email or password"};
    }

    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
    if(!passwordMatch){
        return {ok: false, status: 401, error: "Invalid email or password"};
    }

    const token = signAccessToken({sub: String(user.user_id), email: user.user_email});
    return {ok: true, status: 200, data:{token, user:{id: user.user_id, email: user.user_email}}};
}