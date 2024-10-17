import { createContext, Dispatch, SetStateAction } from "react";

type ContextType = {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
}

const UserAuthContext = createContext<ContextType | undefined>(undefined);

export default UserAuthContext;
