import type { IUser } from "../../../domain";
import { api } from "../../../interceptors";

interface AccountResponse {
  data: IUser;
}

export default {
  get: async (): Promise<IUser> => {
    const response = await api.get<AccountResponse>("/api/user");
    const { data: account } = response.data;

    return account;
  },
};
