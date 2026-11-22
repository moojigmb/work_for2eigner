'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/src/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function LoginPage() {
  const router = useRouter();

  // 로그인 상태값
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // 회원가입 상태값
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [nationality, setNationality] = useState('우즈베키스탄');

  // 로딩 및 안내 메시지
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Supabase 이메일 로그인
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });

    setIsLoading(false);

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        setErrorMsg('이메일 또는 비밀번호가 올바르지 않습니다.');
      } else if (error.message.includes('Email not confirmed')) {
        setErrorMsg('이메일 인증이 완료되지 않았습니다. 메일함을 확인해 주세요.');
      } else {
        setErrorMsg(`로그인 실패: ${error.message}`);
      }
      return;
    }

    router.push('/');
    router.refresh();
  };

  // Supabase 이메일 회원가입
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const { data, error } = await supabase.auth.signUp({
      email: signupEmail,
      password: signupPassword,
      options: {
        data: {
          full_name: signupName,
          nationality: nationality,
        },
      },
    });

    setIsLoading(false);

    if (error) {
      if (error.message.includes('User already registered')) {
        setErrorMsg('이미 가입된 이메일 주소입니다. 로그인 탭을 이용해 주세요.');
      } else if (error.message.includes('Password should be at least')) {
        setErrorMsg('비밀번호는 최소 6자 이상 입력해야 합니다.');
      } else {
        setErrorMsg(`회원가입 실패: ${error.message}`);
      }
      return;
    }

    // Confirm email이 꺼져 있으면 바로 세션이 생성되어 메인으로 이동
    if (data.session) {
      router.push('/');
      router.refresh();
    } else {
      setSuccessMsg('가입 신청이 완료되었습니다! 이메일 인증 링크를 확인해 주세요.');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-sm">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">
            WorkBridge
          </CardTitle>
          <CardDescription>
            외국인 유학생 및 구직자 맞춤형 채용 플랫폼
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* 에러 / 성공 알림 박스 */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <Tabs
            defaultValue="login"
            onValueChange={() => {
              setErrorMsg(null);
              setSuccessMsg(null);
            }}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-5">
              <TabsTrigger value="login">로그인</TabsTrigger>
              <TabsTrigger value="signup">회원가입</TabsTrigger>
            </TabsList>

            {/* 로그인 탭 */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">이메일</Label>
                  <Input
                    id="login-email"
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="example@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">비밀번호</Label>
                  <Input
                    id="login-password"
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="비밀번호 입력"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      로그인 중...
                    </>
                  ) : (
                    '로그인'
                  )}
                </Button>
              </form>
            </TabsContent>

            {/* 회원가입 탭 */}
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">이름 (닉네임)</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    required
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="예: 홍길동"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">이메일</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    required
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="example@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">비밀번호 (6자 이상)</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    required
                    minLength={6}
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="6자 이상 입력"
                  />
                </div>
                <div className="space-y-2">
                  <Label>국적</Label>
                  <Select
                    value={nationality}
                    onValueChange={(val) => val && setNationality(val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="국적 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="우즈베키스탄">우즈베키스탄</SelectItem>
                      <SelectItem value="몽골">몽골</SelectItem>
                      <SelectItem value="중국">중국</SelectItem>
                      <SelectItem value="일본">일본</SelectItem>
                      <SelectItem value="베트남">베트남</SelectItem>
                      <SelectItem value="기타">기타</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      가입 처리 중...
                    </>
                  ) : (
                    '회원가입 완료'
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}