import {
    createContext,
    useContext,
    useState,
    type Dispatch,
    type ReactNode,
    type SetStateAction,
} from "react";
import type { IUser } from "../types";

type UserContextType = {
    user: null | IUser;
    setUser: Dispatch<SetStateAction<null | IUser>>;
};

const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
});

type UserContextProviderProps = {
    children: ReactNode;
};

function UserContextProvider({ children }: UserContextProviderProps) {
    const [user, setUser] = useState<IUser | null>({ role: "student" });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUserContext() {
    const context = useContext(UserContext);
    if (!context)
        throw new Error(
            "useUserContext must be used within a UserContextProvider"
        );

    return context;
}

export default UserContextProvider;
