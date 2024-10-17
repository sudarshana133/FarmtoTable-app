import UserAuthContext from "./UserAuthContext";
import { useEffect, useState, ReactNode } from "react";
import { verifyToken } from "@/utils/auth"; 

const UserAuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const tokenPayload = await verifyToken();
      if (tokenPayload) {
        setUser(tokenPayload);
      }
    };
    fetchUser();
  }, []);

  return (
    <UserAuthContext.Provider value={{ user, setUser }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthContextProvider;
