import { UserRole } from './UserRole';

export class User
{
    id: number;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt: Date;
    token: string;
}