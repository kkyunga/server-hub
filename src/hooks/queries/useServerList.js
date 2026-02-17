import { useQuery } from "@tanstack/react-query";
import { serverList } from "@/api/serverList";

export const useServerList = () => {
  return useQuery({
    queryKey: ["servers"], // 추가/삭제 후 무효화할 때 사용할 고유 키
    queryFn: serverList, // 실제 axios 호출 함수

    // [중요] 기존 useEffect의 데이터 가공 로직을 여기로 이동
    select: (res) => {
      if (!res?.data) return [];
      return res.data.map((item) => ({
        id: item.id,
        label: item.label,
        ip: item.ip,
        port: String(item.port),
        os: item.os,
        country: item.country,
        cloudService: item.cloudService,
        software: item.middlewares || [],
      }));
    },

    // 에러 핸들링
    onError: (error) => {
      console.error("서버 목록 조회 실패:", error);
    },

    // 옵션: 윈도우 포커스 시 자동 갱신 방지 (필요시)
    refetchOnWindowFocus: false,
  });
};
