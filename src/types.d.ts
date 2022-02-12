export interface RealtimeDatabase {
    users: UserDatabase;
}

export interface UserDatabase {
    [key: string]: User;
}

interface User {
    name: string;
    selectedValue?: number;
}
