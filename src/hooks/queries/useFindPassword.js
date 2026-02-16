import { findPasswordApi } from "@/api/findPassword";
import { useMutation } from "@tanstack/react-query";
export const useFindPassword = (onSuccess, setError) => {
  return useMutation({
    mutationFn: findPasswordApi,
    onSuccess: (data) => {
      onSuccess(data);
    },
    onError: (err) => {
      const serverMessage = err.response?.data?.message;
      const message = serverMessage || "입력하신 정보와 일치하는 계정을 찾을 수 없습니다";
      setError(message);
    },
  });
};
