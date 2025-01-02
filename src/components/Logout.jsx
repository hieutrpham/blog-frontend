import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/authReducer";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const userData = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      {userData.name} logged in
      <button
        type="button"
        onClick={() => {
          navigate("/");
          dispatch(logout());
        }}
      >
        log out
      </button>
    </>
  );
};

export default LogOut;
