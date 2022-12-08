import type { UserContext } from "./types";
import { createContext } from "react";

export default createContext<UserContext>({} as UserContext);
