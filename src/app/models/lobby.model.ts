export interface Lobby {
    public: boolean;
    users: User[];
}

export interface User {
    username: string;
    isHost: boolean;
}
