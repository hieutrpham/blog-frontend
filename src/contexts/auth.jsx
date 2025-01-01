import { useContext, createContext, useReducer } from "react";

const initialState = { username: "", name: "", token: "" };

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      const { username, name, token } = action.payload;

      console.log("Action Payload:", action.payload); // Debug payload
      if (!username || !token) {
        console.error("Invalid payload structure for LOGIN action.");
        return state;
      }

      try {
        localStorage.setItem("loggedUser", JSON.stringify(action.payload));
        console.log("User data saved to localStorage.");
      } catch (error) {
        console.error("Failed to save to localStorage:", error);
      }

      return { ...state, username, name, token };

    case "LOGOUT":
      localStorage.clear();
      console.log("User logged out and localStorage cleared.");
      return initialState;

    default:
      return state;
  }
};

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
