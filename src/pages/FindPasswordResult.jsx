import { useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
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
import { useUpdatePassword } from "@/hooks/queries/useUpdatePassword";

export default function FindPasswordResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const email = location.state?.email || searchParams.get("email") || "";

  const [formData, setFormData] = useState({
    newPassword: "",
    newPasswordConfirm: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { mutate: updatePassword, isPending } = useUpdatePassword(
    (msg) => {
      setSuccess(msg);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    },
    setError,
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.newPassword !== formData.newPasswordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (formData.newPassword.length < 8) {
      setError("비밀번호는 최소 8자 이상이어야 합니다.");
      return;
    }

    updatePassword({ email, newPassword: formData.newPassword });
  };

  // 이메일 정보 없이 직접 접근한 경우
  if (!email) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-heading text-primary">
              비밀번호 초기화
            </CardTitle>
            <CardDescription>
              잘못된 접근입니다. 비밀번호 찾기를 다시 시도해주세요.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button
              variant="outline"
              onClick={() => navigate("/find-password")}
            >
              ← 비밀번호 찾기로 돌아가기
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-heading text-primary">
            비밀번호 초기화
          </CardTitle>
          <CardDescription>
            새로운 비밀번호를 입력해주세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert variant="success" className="mb-4">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          {/* 확인된 계정 정보 */}
          <Alert className="mb-6">
            <AlertDescription>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">확인된 계정</div>
                <div className="text-lg font-medium">{email}</div>
              </div>
            </AlertDescription>
          </Alert>

          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">새 비밀번호</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                placeholder="새 비밀번호 (최소 8자)"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPasswordConfirm">새 비밀번호 확인</Label>
              <Input
                id="newPasswordConfirm"
                name="newPasswordConfirm"
                type="password"
                placeholder="새 비밀번호 확인"
                value={formData.newPasswordConfirm}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isPending}>
              {isPending ? "변경 중..." : "비밀번호 변경"}
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
