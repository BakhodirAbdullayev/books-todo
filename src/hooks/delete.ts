import { useUser } from "../utils/context";
import { backendUrl } from "../utils/globals";
import CryptoJS from "crypto-js";

export function useDELETE(
  url: string,
  func?: (isOk: boolean, message: string) => void
) {
  const ctx = useUser();
  return () => {
    const userSecret = ctx?.user?.secret ?? "";
    const userKey = ctx?.user?.key ?? "";
    const method = "DELETE";
    const str = method + url + userSecret;
    const sign = CryptoJS.MD5(str);

    const requestOptions = {
      method: method,
      headers: {
        Key: userKey,
        Sign: `${sign}`,
        "Content-type": "application/json",
      },
    };
    fetch(backendUrl + url, { ...requestOptions })
      .then((res) => res.json())
      .then((data) => func && func(data.isOk, data.message));
  };
}
