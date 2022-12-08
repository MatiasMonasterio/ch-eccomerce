import { useState } from "react";

export default function useLoading(initialValue = true) {
  const [isLoading, setIsLoading] = useState<boolean>(initialValue);

  const initLoadiading = () => {
    setIsLoading(true);
  };

  const endLoading = () => {
    setIsLoading(false);
  };

  return { isLoading, initLoadiading, endLoading };
}
