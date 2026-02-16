import { sendResetLinkApi } from "@/api/sendResetLinkApi";
import { useMutation } from "@tanstack/react-query";
export const useSendLink = (setSuccess, setError) => {
  return useMutation({
    mutationFn: sendResetLinkApi,
    onSuccess: () => {
      setSuccess("비밀번호 초기화 링크가 이메일로 전송되었습니다.");
    },
    onError: (err) => {
      const serverMessage = err.response?.data?.message;
      const message = serverMessage || "이메일 전송작업중 에러가 발생하였어요";
      setError(message);
    },
  });
};
