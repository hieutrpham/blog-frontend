import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "./auth";

const baseUrl = "/api/login";

export const useUserLoggedIn = () => {
  const { dispatch } = useAuth();

  return useMutation({
    mutationFn: async (auth) => {
      const res = await axios.post(baseUrl, auth);
      return res.data;
    },
    onSuccess: (data) => {
      // console.log(data);

      dispatch({
        type: "LOGIN",
        payload: {
          username: data.username,
          name: data.name,
          token: data.token,
        },
      });
    },
  });
};
