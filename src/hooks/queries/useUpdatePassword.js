import { updatePasswordApi } from "@/api/updatePassword";
import { useMutation } from "@tanstack/react-query";
export const useUpdatePassword = (setSuccess, setError) => {
  return useMutation({
    mutationFn: updatePasswordApi,
    onSuccess: () => {
      setSuccess("비밀번호가 성공적으로 변경되었습니다.");
    },
    onError: (err) => {
      const serverMessage = err.response?.data?.message;
      const message = serverMessage || "비밀번호 변경 중 에러가 발생하였어요";
      setError(message);
    },
  });
};
