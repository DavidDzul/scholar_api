export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    hashPassword(): Promise<void>;
}
