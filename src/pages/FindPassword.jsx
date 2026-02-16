import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useFindPassword } from "@/hooks/queries/useFindPassword";

export default function FindPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const emailFromFind = location.state?.email || "";
  const nameFromFind = location.state?.name || "";
  const [formData, setFormData] = useState({
    email: emailFromFind,
    name: nameFromFind,
    phone: "",
  });
  const [error, setError] = useState("");

  const { mutate: findPassword, isPending } = useFindPassword(
    () => {
      navigate("/find-password-result", {
        state: {
          email: formData.email,
          name: formData.name,
        },
      });
    },
    setError,
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setError("");
    findPassword({ email: formData.email, name: formData.name, phone: formData.phone });
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-heading text-primary">
            비밀번호 찾기
          </CardTitle>
          <CardDescription>
            계정 정보를 입력하여 비밀번호를 재설정합니다
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRequestReset} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                disabled={!!emailFromFind}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="홍길동"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">전화번호</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="010-1234-5678"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isPending}>
              {isPending ? "확인 중..." : "비밀번호 찾기"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-muted-foreground hover:text-primary"
          >
            ← 로그인 화면으로 돌아가기
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}
