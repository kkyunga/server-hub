import { loginApi } from "@/api/auth";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
export const useLogin = (setLoginAttemps, setError) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (res) => {
      const token = res.data.accessToken;
      if (token) {
        localStorage.setItem("userToken", token);
        navigate("/main");
      }
    },

    onError: (err) => {
      setLoginAttemps((prev) => {
        const newAttemps = prev + 1;
        const errorMessage =
          err.response?.data?.message || "서버에 연결할 수 없습니다";
        setError(`${errorMessage}(${newAttemps}/5)`);
        if (newAttemps > 5) {
          setError("로그인 5회 이상 실패 ! 비번 찾기로 이동합니다");
          setTimeout(() => navigate("/find_password"), 5000);
        }
        return newAttemps;
      });
    },
  });
};
