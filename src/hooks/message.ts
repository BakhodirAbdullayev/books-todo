import { toast } from "react-toastify";

export const useMESSAGE =
  (func?: () => void) => (isOk: boolean, message: string) => {
    if (isOk) {
      toast.success(message);
      func && func();
    } else toast.error(message);
  };
