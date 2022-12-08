import type { CartContext } from "./types";
import { createContext } from "react";

export default createContext<CartContext>({} as CartContext);
