import { createContext, useReducer, useContext } from "react";

const notiReducer = (state, action) => {
  switch (action.type) {
    case "NOTI":
      return action.payload;
    case "RESET":
      return "";
    default:
      return state;
  }
};
const NotificationContext = createContext();

export const useNoti = () => {
  const [noti, dispatchNoti] = useContext(NotificationContext);
  return noti;
};

export const useNotiDispatch = () => {
  const [noti, dispatchNoti] = useContext(NotificationContext);
  const dispatch = (content, timeout) => {
    dispatchNoti({ type: "NOTI", payload: content });
    setTimeout(() => {
      dispatchNoti({ type: "RESET" });
    }, timeout);
  };
  return dispatch;
};

export const NotificationContextProvider = (props) => {
  const [noti, notiDispatch] = useReducer(notiReducer, null);
  return (
    <NotificationContext.Provider value={[noti, notiDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
