import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export const auth = {
    isAuthenticated,
    verifyToken
}

function isAuthenticated() {
    try {
        verifyToken();
        return true;
    } catch {
        return false;
    }
}

function verifyToken() {
    const token = cookies().get('authorization')?.value ?? '';
   // console.log("1234",token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    //console.log(decoded.sub)
    const id = decoded.sub as string;
    return id;
}
