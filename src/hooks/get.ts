import { backendUrl } from "../utils/globals";
import { useCallback, useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { useUser } from "../utils/context";

export function useGET<T>(url: string, deps?: any[]) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any | null>(null);

  const ctx = useUser();

  const getData = useCallback(async (u: string) => {
    const userSecret = ctx?.user?.secret ?? "";
    const userKey = ctx?.user?.key ?? "";
    const method = "GET";
    const str = method + u + userSecret;
    console.log(str);
    const sign = CryptoJS.MD5(str);

    const requestOptions = {
      method: method,
      headers: {
        Key: userKey,
        Sign: `${sign}`,
        "Content-type": "application/json",
      },
    };
    try {
      const res = await fetch(backendUrl + u, { ...requestOptions });
      const jd = await res.json();
      setData(jd.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getData(url);
  }, deps);

  const reload = (u?: string) => {
    setData(null);
    setIsLoading(true);
    setError(null);
    getData(u ?? url);
  };

  return [data, isLoading, reload, error];
}
