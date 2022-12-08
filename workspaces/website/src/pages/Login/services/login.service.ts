import type { AuthResponse, Token } from "../../../types";
import type { LoginCredentials } from "../types";

import { api } from "../../../interceptors";

export default {
  login: async (loginCredentials: LoginCredentials): Promise<Token> => {
    const response = await api.post<AuthResponse>("/api/login", loginCredentials);
    const { data: token } = response.data;
    return token;
  },
};
