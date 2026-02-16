import { confirmEmailApi } from "@/api/confirmEmail";
import { useMutation } from "@tanstack/react-query";
export const useConfirmEmail = (setIsCodeSent, setSuccess, setError, setCode) => {
  return useMutation({
    mutationFn: confirmEmailApi,
    onSuccess: (res) => {
      setIsCodeSent(true);
      setCode(res.data);
      setSuccess("인증번호가 이메일로 전송되었습니다.");
      setTimeout(() => setSuccess(""), 3000);
    },
    onError: (err) => {
      const serverMessage = err.response?.data?.message;
      const message = serverMessage || "인증번호 발송 중 에러가 발생하였어요";
      setError(message);
    },
  });
};
