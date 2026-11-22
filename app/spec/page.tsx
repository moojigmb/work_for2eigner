'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  User,
  FileText,
  Briefcase,
  Award,
  ChevronRight,
  Phone,
  Mail,
  MessageSquarePlus,
  Pencil,
  Code2,
  BookOpen,
  FileBadge2,
  MapPin,
  Clock,
} from 'lucide-react';
import { supabase } from '@/src/lib/supabase';
import { Button, buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const RECOMMENDED_JOBS = [
  {
    id: 1,
    title: '홍대 로스터리 카페 바리스타·홀',
    wage: '시급 11,500원',
    schedule: '주 3일 (월, 수, 금)',
    location: '홍대입구역 근처',
  },
  {
    id: 2,
    title: '신촌역 24시 편의점 매장 관리',
    wage: '시급 11,000원',
    schedule: '주말 (토, 일)',
    location: '신촌역 근처',
  },
  {
    id: 3,
    title: '강남 글로벌 어학원 회화 튜터',
    wage: '시급 15,000원',
    schedule: '주 2일 (화, 목)',
    location: '강남역 근처',
  },
];

const CERT_GUIDES = [
  {
    icon: FileBadge2,
    title: '정보처리기사',
    desc: 'IT·개발 분야 취업 및 비자 점수 가산에 유리한 국가기술자격증입니다.',
    href: 'https://www.q-net.or.kr',
  },
  {
    icon: Code2,
    title: '코딩 테스트 준비',
    desc: '알고리즘 문제 풀이로 국내 IT 기업 인턴·채용 실력을 키워보세요.',
    href: 'https://school.programmers.co.kr',
  },
  {
    icon: BookOpen,
    title: '비즈니스 한국어 · 영어 회화',
    desc: '실무와 면접에서 바로 쓰이는 한국어·영어 커뮤니케이션 역량을 강화하세요.',
    href: 'https://www.topik.go.kr',
  },
];

export default function SpecPage() {
  const [fullName, setFullName] = useState('유학생 회원');
  const [bio, setBio] = useState(
    '안녕하세요! 새로운 도전을 좋아하는 유학생입니다. 프로필에서 내 소개와 어학 성적을 관리해 보세요.'
  );
  const [topikLevel, setTopikLevel] = useState('미응시');
  const [toeicScore, setToeicScore] = useState('미응시');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function loadSummary() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;
      setIsLoggedIn(true);

      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, bio, topik_level, toeic_score')
        .eq('id', user.id)
        .single();

      if (profile) {
        if (profile.full_name) setFullName(profile.full_name);
        if (profile.bio) setBio(profile.bio);
        if (profile.topik_level) setTopikLevel(profile.topik_level);
        if (profile.toeic_score) setToeicScore(profile.toeic_score);
      } else if (user.user_metadata?.full_name) {
        setFullName(user.user_metadata.full_name);
      }
    }

    loadSummary();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">스펙 쌓기</h1>
        <p className="text-xs text-muted-foreground mt-1">
          나의 스펙을 관리하고, 더 좋은 기회를 만나보세요.
        </p>
      </div>

      {/* 1행: 이력서/프로필 요약 & 어학 시험 관리 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <Card className="lg:col-span-6">
          <CardHeader className="pb-3 border-b border-border">
            <CardTitle className="text-sm flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span>이력서 / 프로필</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex flex-col sm:flex-row items-start gap-5">
            <Avatar className="w-20 h-20 border border-border shrink-0">
              <AvatarFallback className="bg-muted">
                <User className="w-10 h-10 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-3 w-full">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">{fullName}</h2>
                <Link
                  href={isLoggedIn ? '/profile' : '/login'}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground leading-relaxed">
                {bio}
              </div>

              <Link
                href={isLoggedIn ? '/profile' : '/login'}
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'sm' }),
                  'gap-1.5'
                )}
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>{isLoggedIn ? '프로필 수정' : '로그인하고 프로필 등록'}</span>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-6">
          <CardHeader className="pb-3 border-b border-border">
            <CardTitle className="text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <span>어학 시험 관리</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 divide-y divide-border">
            <div className="pb-4 flex items-center justify-between gap-4">
              <div>
                <p className="font-bold text-sm">TOPIK</p>
                <p className="text-xs text-muted-foreground">한국어능력시험</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground">보유 등급</p>
                <p className="font-bold text-sm">{topikLevel}</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground">상태</p>
                <Badge variant={topikLevel !== '미응시' ? 'default' : 'outline'}>
                  {topikLevel !== '미응시' ? '등록완료' : '미등록'}
                </Badge>
              </div>
              <a
                href="https://www.topik.go.kr"
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'sm' }),
                  'gap-1'
                )}
              >
                <span>일정 보기</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="pt-4 flex items-center justify-between gap-4">
              <div>
                <p className="font-bold text-sm">TOEIC</p>
                <p className="text-xs text-muted-foreground">영어능력시험</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground">보유 점수</p>
                <p className="font-bold text-sm">{toeicScore}</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground">상태</p>
                <Badge variant={toeicScore !== '미응시' ? 'default' : 'outline'}>
                  {toeicScore !== '미응시' ? '등록완료' : '미신청'}
                </Badge>
              </div>
              <a
                href="https://exam.toeic.co.kr"
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'sm' }),
                  'gap-1'
                )}
              >
                <span>신청하기</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 2행: 각종 경험에 따른 추천 알바 & 자격증 추천 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <Card className="lg:col-span-7">
          <CardHeader className="pb-3 border-b border-border flex flex-row items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-muted-foreground" />
              <span>각종 경험에 따른 추천 알바</span>
            </CardTitle>
            <Link
              href="/"
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-0.5"
            >
              <span>더보기</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </CardHeader>
          <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {RECOMMENDED_JOBS.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-border p-3.5 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="h-20 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-xs line-clamp-1">{item.title}</h3>
                  <div className="space-y-1 text-[11px] text-muted-foreground">
                    <p className="font-semibold text-foreground">{item.wage}</p>
                    <p className="flex items-center gap-1">
                      <Clock className="w-3 h-3 shrink-0" />
                      <span className="truncate">{item.schedule}</span>
                    </p>
                    <p className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </p>
                  </div>
                </div>

                <Link
                  href={`/jobs/${item.id}`}
                  className={cn(
                    buttonVariants({ variant: 'secondary', size: 'sm' }),
                    'w-full text-xs gap-1'
                  )}
                >
                  <span>자세히 보기</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-5">
          <CardHeader className="pb-3 border-b border-border flex flex-row items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-muted-foreground" />
              <span>자격증 및 스펙 쌓기 추천</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-3">
            {CERT_GUIDES.map((cert) => {
              const Icon = cert.icon;
              return (
                <div
                  key={cert.title}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl border border-border"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-xs">{cert.title}</p>
                      <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                        {cert.desc}
                      </p>
                    </div>
                  </div>
                  <a
                    href={cert.href}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      buttonVariants({ variant: 'outline', size: 'sm' }),
                      'shrink-0 text-xs gap-1'
                    )}
                  >
                    <span>자세히 보기</span>
                    <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* 3행: 고객 지원 / 문의 */}
      <Card>
        <CardContent className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-sm">고객 지원 / 문의</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              궁금한 점이 있거나 도움이 필요하신가요? 언제든지 문의해 주세요.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
                <Phone className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-muted-foreground">고객센터</p>
                <p className="font-bold">1588-0000 (평일 09:00 - 18:00)</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
                <Mail className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-muted-foreground">이메일 문의</p>
                <p className="font-bold">support@site.com (24시간 접수 가능)</p>
              </div>
            </div>

            <Button
              variant="default"
              size="sm"
              className="gap-1.5"
              onClick={() => alert('건의사항 및 문의 접수가 완료되었습니다.')}
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span>건의사항 및 문의</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}