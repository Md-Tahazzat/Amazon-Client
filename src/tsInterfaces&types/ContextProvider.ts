import React, { ReactNode } from "react";
// interface of react children for ContextProvider,
export interface ContextProviderProps {
  children: ReactNode;
}

// interface for user information
export interface User {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  role: string | null;
}

//interface for menuState value of useReducer hook to control hambergerMenu.
export interface MenuState {
  subMenuIndex: number;
  isMenuOpen: boolean;
  isSubMenuOpen: boolean;
}

// interface for action parameter of menuReducer function
export interface MenuAction {
  target: "MENU" | "SUBMENU" | "ALL";
  actionType: "CLOSE" | "OPEN";
  subMenuIndex?: number;
}

// interface for shopContext data.
export interface ShopContextData {
  menuState: MenuState;
  menuDispatch: React.Dispatch<MenuAction>;
  user: User;
  setUser: React.Dispatch<User>;
  loading: boolean;
  setLoading: React.Dispatch<boolean>;
  cartProductCount: number;
  setCartProductCount: React.Dispatch<number>;
  cartModified: Boolean;
  setCartModified: React.Dispatch<boolean>;
}

// interface for action parameter of cartReducer function
export interface CartAction {
  actionType: "ADD" | "DELETE" | "RESET";
  _id: string;
}

// interfaces for the response of saving user in database
export interface SaveUserResult {
  email: string;
  role: string;
  token: string;
}
