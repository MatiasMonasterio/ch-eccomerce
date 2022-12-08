import type { Token, AuthResponse } from "../../../types";
import type { RegisterData } from "../types";

import { api } from "../../../interceptors";

export default {
  register: async (registerData: RegisterData): Promise<Token> => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(registerData)) {
      console.log({ key, value });
      formData.append(key, value);
    }

    console.log(formData);

    const response = await api.post<AuthResponse>("/api/register", formData);
    const { data: token } = response.data;
    return token;
  },
};
