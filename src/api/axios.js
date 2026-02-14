import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // 쿠키(Refresh Token) 전송 허용
});

// 1. 요청 인터셉터: 모든 요청에 Access Token 부착
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 2. 응답 인터셉터: 오직 '토큰 만료'와 '일반 에러'만 처리
api.interceptors.response.use(
  (response) => response, // 성공하면 통과

  async (error) => {
    const originalRequest = error.config;

    // [A] 토큰 만료 처리 (401 Unauthorized)
    // 403(중복로그인/권한)은 여기서 처리하지 않고 그냥 에러로 던집니다.
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Access Token 재발급 시도
        const res = await axios.post(
          `${BASE_URL}/api/auth/tokenFactory`,
          {},
          { withCredentials: true },
        );

        const newToken = res.data.accessToken;

        // 신규 토큰 저장 및 헤더 갱신
        localStorage.setItem("userToken", newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        // 원래 요청 다시 보내기
        return api(originalRequest);
      } catch (reissueError) {
        // [B] Refresh Token까지 만료되어 재발급 실패한 경우
        localStorage.removeItem("userToken");
        alert("세션이 만료되었습니다. 다시 로그인해 주세요.");
        window.location.href = "/login";
        return Promise.reject(reissueError);
      }
    }

    // 그 외의 모든 에러(403, 400, 500 등)는 그대로 호출한 곳으로 전달
    return Promise.reject(error);
  },
);

export default api;
