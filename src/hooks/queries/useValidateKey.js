import { validateKeyFile } from "@/api/validateKey";
import { useMutation } from "@tanstack/react-query";

export const useValidateKey = (setKeyValidation, setNewServer) => {
  return useMutation({
    mutationFn: validateKeyFile,
    onMutate: (file) => {
      setNewServer((prev) => ({ ...prev, keyFile: file }));
      setKeyValidation({ status: "loading", message: "인증키 검증 중..." });
    },
    onSuccess: (res) => {
      if (res.data === true) {
        setKeyValidation({ status: "success", message: "유효한 인증키 파일입니다" });
      } else {
        setKeyValidation({ status: "error", message: "유효하지 않은 인증키 파일입니다" });
        setNewServer((prev) => ({ ...prev, keyFile: null }));
      }
    },
    onError: (err) => {
      const msg = err.response?.data?.message || "인증키 검증에 실패했습니다";
      setKeyValidation({ status: "error", message: msg });
      setNewServer((prev) => ({ ...prev, keyFile: null }));
    },
  });
};
