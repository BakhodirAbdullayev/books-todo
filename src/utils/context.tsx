import {
  Dispatch,
  SetStateAction,
  FC,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

type ContextType = {
  user: Person | null;
  setUser: Dispatch<SetStateAction<Person | null>>;
};
type Props = {
  children: ReactNode;
};
type Person = {
  key: string;
  secret: string;
};

const UserContext = createContext<ContextType | null>(null);

export const UserProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<Person | null>(null);

  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
