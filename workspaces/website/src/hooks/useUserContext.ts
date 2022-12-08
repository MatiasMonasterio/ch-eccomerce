import { useContext } from "react";
import { UserContext } from "../contexts/user";

export default function useUserContext() {
  return useContext(UserContext);
}
