import { User } from './User';

export class LoginUserResponse {
    user: User;
    token: string;
    expiresIn: number;
}