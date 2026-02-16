import { signUpApi } from "@/api/signUp";
import { useMutation } from "@tanstack/react-query";
export const useSignUp = (setError, navigate, resetEmail) => {
  return useMutation({
    mutationFn: signUpApi,
    onSuccess: (res) => {
      alert(res.data || res.message || "회원가입이 완료되었습니다.");
      navigate("/login");
    },
    onError: (err) => {
      const serverMessage = err.response?.data?.message;
      const message = serverMessage || "회원가입 중 에러가 발생하였어요";
      setError(message);
      if (serverMessage?.includes("이미 존재")) {
        resetEmail();
      }
    },
  });
};
