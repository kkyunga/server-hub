import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { useConfirmEmail } from "@/hooks/queries/useConfirmEmail";
import { useSignUp } from "@/hooks/queries/useSignUp";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    verificationCode: "",
    phone: "",
    password: "",
    passwordConfirm: "",
  });
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [code, setCode] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const { mutate: confirmEmail, isPending: isSendingCode } = useConfirmEmail(
    setIsCodeSent,
    setSuccess,
    setError,
    setCode,
  );

  const resetEmail = () => {
    setFormData((prev) => ({ ...prev, email: "", verificationCode: "" }));
    setIsCodeSent(false);
    setIsCodeVerified(false);
    setCode("");
  };

  const { mutate: signUp, isPending: isSigningUp } = useSignUp(
    setError,
    navigate,
    resetEmail,
    setPhoneError,
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhoneChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 11);
    let formatted = digits;
    if (digits.length > 7) {
      formatted = `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
    } else if (digits.length > 3) {
      formatted = `${digits.slice(0, 3)}-${digits.slice(3)}`;
    }
    setPhoneError("");
    setFormData({ ...formData, phone: formatted });
  };

  const handleSendCode = async () => {
    if (!formData.email) {
      setError("이메일을 입력해주세요.");
      return;
    }
    setError("");
    confirmEmail({ email: formData.email });
  };

  const handleVerifyCode = async () => {
    if (!formData.verificationCode) {
      setError("인증번호를 입력해주세요.");
      return;
    }
    if (formData.verificationCode !== String(code)) {
      debugger;
      setError("인증번호가 일치하지 않습니다.");
      return;
    }
    setIsCodeVerified(true);
    setSuccess("이메일 인증이 완료되었습니다.");
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isCodeVerified) {
      setError("이메일 인증을 완료해주세요.");
      return;
    }

    const passwordRegex = /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError("비밀번호는 8자리 이상, 특수문자를 포함해야 합니다.");
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      return;
    }

    signUp({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-heading text-primary">
            회원가입
          </CardTitle>
          <CardDescription>새로운 계정을 생성합니다</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert variant="success">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

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
              <Label htmlFor="email">이메일</Label>
              <div className="flex gap-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isCodeVerified}
                  required
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={handleSendCode}
                  disabled={isCodeVerified || !formData.email || isSendingCode}
                  variant={isCodeSent ? "secondary" : "default"}
                >
                  {isSendingCode
                    ? "발송 중..."
                    : isCodeSent
                      ? "재발송"
                      : "발송"}
                </Button>
              </div>
            </div>

            {isCodeSent && (
              <div className="space-y-2">
                <Label htmlFor="verificationCode">인증번호</Label>
                <div className="flex gap-2">
                  <Input
                    id="verificationCode"
                    name="verificationCode"
                    type="text"
                    placeholder="6자리 인증번호"
                    value={formData.verificationCode}
                    onChange={handleChange}
                    disabled={isCodeVerified}
                    required
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    onClick={handleVerifyCode}
                    disabled={isCodeVerified || !formData.verificationCode}
                  >
                    {isCodeVerified ? "완료" : "검증"}
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="phone">휴대폰</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="010-1234-5678"
                value={formData.phone}
                onChange={handlePhoneChange}
                required
              />
              {formData.phone && (
                <p className={`text-sm ${/^010-\d{4}-\d{4}$/.test(formData.phone) ? "text-green-600" : "text-red-500"}`}>
                  {/^010-\d{4}-\d{4}$/.test(formData.phone) ? "✓" : "✗"} 010-0000-0000 형식
                </p>
              )}
              {phoneError && (
                <p className="text-sm font-medium text-red-500">{phoneError}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {formData.password && (
                <div className="text-sm space-y-1">
                  <p className={formData.password.length >= 8 ? "text-green-600" : "text-red-500"}>
                    {formData.password.length >= 8 ? "✓" : "✗"} 8자리 이상
                  </p>
                  <p className={/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password) ? "text-green-600" : "text-red-500"}>
                    {/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password) ? "✓" : "✗"} 특수문자 포함
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
              <Input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                placeholder="비밀번호를 다시 입력하세요"
                value={formData.passwordConfirm}
                onChange={handleChange}
                required
              />
              {formData.passwordConfirm && (
                <p className={`text-sm font-medium ${formData.password === formData.passwordConfirm ? "text-green-600" : "text-red-500"}`}>
                  {formData.password === formData.passwordConfirm ? "✓ 비밀번호가 일치합니다" : "✗ 비밀번호가 일치하지 않습니다"}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={!isCodeVerified || isSigningUp}
            >
              {isSigningUp ? "가입 중..." : "가입하기"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            이미 계정이 있으신가요?{" "}
            <button
              onClick={() => navigate("/login")}
              className="font-medium text-primary hover:underline"
            >
              로그인
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
