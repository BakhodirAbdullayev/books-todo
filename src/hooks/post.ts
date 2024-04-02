import { useState } from "react";
import { backendUrl } from "../utils/globals";
import CryptoJS from "crypto-js";
import { useUser } from "../utils/context";

export function usePOST<T>(
  url: string,
  func?: (isOk: boolean, message: string) => void
) {
  const [pending, setPending] = useState(false);
  const ctx = useUser();
  return {
    mutate: function (data: T) {
      setPending(true);
      const userSecret = ctx?.user?.secret ?? "";
      const userKey = ctx?.user?.key ?? "";
      const method = "POST";
      const body = JSON.stringify(data);
      const str = method + url + body + userSecret;
      const sign = CryptoJS.MD5(str);

      const requestOptions = {
        method: method,
        body: body,
        headers: {
          Key: userKey,
          Sign: `${sign}`,
          "Content-type": "application/json",
        },
      };
      fetch(backendUrl + url, { ...requestOptions })
        .then((res) => res.json())
        .then((data) => {
          func && func(data.isOk, data.message);
          setPending(false);
        });
    },
    pending: pending,
  };
}
