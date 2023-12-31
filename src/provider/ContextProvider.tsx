import { AxiosResponse } from "axios";
import { onAuthStateChanged } from "firebase/auth";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import auth from "../firebase/firebase.config";
import instance from "../hooks/useAxiosInstance";
import {
  ContextProviderProps,
  SaveUserResult,
  ShopContextData,
  User,
} from "../tsInterfaces&types/ContextProvider";
import { menuReducer } from "../utilitesFn/ShopContextProviderFn";
import {
  initialContextData,
  initialMenuState,
  initialUserState,
} from "./InitialDataOfContextProvider";

// create amazon shop context.
const SHOP_CONTEXT = createContext<ShopContextData>(initialContextData);

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  // useReducer to controll hambergurMenu
  const [menuState, menuDispatch] = useReducer(menuReducer, initialMenuState);

  // product amount in cart & cart product fetching states
  const [cartProductCount, setCartProductCount] = useState(0);
  const [cartModified, setCartModified] = useState(false);

  // user information state & loading state
  const [user, setUser] = useState<User>(initialUserState);
  const [loading, setLoading] = useState(true);

  // track authState change
  useEffect(() => {
    setLoading(true);
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      // TODO: save user to database
      if (currentUser?.email) {
        instance
          .post("/user", {
            email: currentUser.email,
            role: "buyer",
          })
          .then((result: AxiosResponse<SaveUserResult, SaveUserResult>) => {
            localStorage.setItem("access-token", result.data.token);
            const user: User = {
              displayName: currentUser.displayName,
              email: currentUser.email,
              photoURL: currentUser.photoURL,
              role: result.data.role,
            };
            setUser(user);
          });
      }
    });
    setLoading(false);
    return () => {
      unSubscribe();
    };
  }, []);

  // shop context data
  const shopContextData: ShopContextData = {
    menuState,
    menuDispatch,
    user,
    setUser,
    loading,
    setLoading,
    cartProductCount,
    setCartProductCount,
    cartModified,
    setCartModified,
  };
  return (
    <SHOP_CONTEXT.Provider value={shopContextData}>
      {children}
    </SHOP_CONTEXT.Provider>
  );
};
export default ContextProvider;

// create custom hook to use Shop context
export const useShopContext = () => useContext(SHOP_CONTEXT);
