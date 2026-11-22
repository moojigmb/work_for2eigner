'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BriefcaseBusiness, Loader2 } from 'lucide-react';
import { supabase } from '@/src/lib/supabase';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export default function NewJobPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [companyName, setCompanyName] = useState('');
  const [title, setTitle] = useState('');
  const [hourlyWage, setHourlyWage] = useState('시급 12,000원');
  const [schedule, setSchedule] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('카페/음료');
  const [education, setEducation] = useState('학력무관');
  const [languageLevel, setLanguageLevel] = useState('TOPIK 3급 이상');
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.replace('/login');
        return;
      }
      setCheckingAuth(false);
    });
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const { error } = await supabase.from('jobs').insert({
      company_name: companyName,
      title,
      hourly_wage: hourlyWage,
      schedule,
      location,
      job_type: jobType,
      education,
      language_level: languageLevel,
      is_urgent: isUrgent,
    });

    setSubmitting(false);

    if (error) {
      alert(`공고 등록 중 오류가 발생했습니다: ${error.message}`);
      return;
    }

    router.push('/');
    router.refresh();
  };

  if (checkingAuth) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-sm text-muted-foreground gap-2">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>권한을 확인하는 중입니다...</span>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'gap-1.5')}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>채용목록으로 돌아가기</span>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 text-primary mb-1">
            <BriefcaseBusiness className="w-5 h-5" />
            <span className="text-xs font-semibold">구인자(사장님) 전용</span>
          </div>
          <CardTitle className="text-xl">새 채용공고 등록하기</CardTitle>
          <CardDescription>
            외국인 유학생 및 구직자를 위한 아르바이트·채용 공고를 등록하면 메인 목록에 즉시 반영됩니다.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">매장 / 기업명</Label>
                <Input
                  id="companyName"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="예: 연남동 브런치 카페"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hourlyWage">급여 조건</Label>
                <Input
                  id="hourlyWage"
                  required
                  value={hourlyWage}
                  onChange={(e) => setHourlyWage(e.target.value)}
                  placeholder="예: 시급 12,500원"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">공고 제목</Label>
              <Input
                id="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="예: 주말 오후 홀 서빙 및 음료 제조 스태프 모집"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="schedule">근무 요일 및 시간</Label>
                <Input
                  id="schedule"
                  required
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                  placeholder="예: 주 3일 (금, 토, 일)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">근무 지역</Label>
                <Input
                  id="location"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="예: 서울 마포구 홍대입구역"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>직종</Label>
                <Select
                  value={jobType}
                  onValueChange={(val) => val && setJobType(val)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="카페/음료">카페/음료</SelectItem>
                    <SelectItem value="매장관리/판매">매장관리/판매</SelectItem>
                    <SelectItem value="음식점/서빙">음식점/서빙</SelectItem>
                    <SelectItem value="교육/강사">교육/강사</SelectItem>
                    <SelectItem value="사무/번역">사무/번역</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>학력 조건</Label>
                <Select
                  value={education}
                  onValueChange={(val) => val && setEducation(val)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="학력무관">학력무관</SelectItem>
                    <SelectItem value="대학교 재학">대학교 재학</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>요구 한국어 능력</Label>
                <Select
                  value={languageLevel}
                  onValueChange={(val) => val && setLanguageLevel(val)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TOPIK 2급 이상">TOPIK 2급 이상</SelectItem>
                    <SelectItem value="TOPIK 3급 이상">TOPIK 3급 이상</SelectItem>
                    <SelectItem value="TOPIK 4급 이상">TOPIK 4급 이상</SelectItem>
                    <SelectItem value="TOPIK 5급 이상">TOPIK 5급 이상</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <label className="flex items-center gap-2 pt-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isUrgent}
                onChange={(e) => setIsUrgent(e.target.checked)}
                className="w-4 h-4 rounded border-border"
              />
              <span className="text-sm font-medium">급구 공고로 강조 표시하기</span>
            </label>

            <div className="pt-2 flex justify-end gap-2">
              <Link
                href="/"
                className={buttonVariants({ variant: 'outline' })}
              >
                취소
              </Link>
              <Button type="submit" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    등록 중...
                  </>
                ) : (
                  '공고 등록 완료'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}