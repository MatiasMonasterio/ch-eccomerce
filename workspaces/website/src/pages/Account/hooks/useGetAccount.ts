import type { IUser } from "../../../domain";
import { useState, useEffect } from "react";
import { accountService } from "../services";

export default function useGetAccount() {
  const [account, setAccount] = useState<IUser>({} as IUser);

  useEffect(() => {
    accountService
      .get()
      .then(setAccount)
      .catch((error) => console.error(error));
  }, []);

  return account;
}
