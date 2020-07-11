import { User } from './User';

export class UserResponse {
    user: User;
    token: string;
    expiresIn: number;
}