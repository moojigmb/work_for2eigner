'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  ChevronRight,
  Building2,
  FileCheck2,
  GraduationCap,
  Clock,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { useLanguage } from '../../src/LanguageContext';

type StudentStage = 'language' | 'undergrad' | 'graduating';

const STAGE_SUMMARY: Record<
  StudentStage,
  {
    badge: string;
    headline: string;
    steps: { title: string; href: string }[];
  }
> = {
  language: {
    badge: 'D-4 어학연수생',
    headline: '입국 6개월 후 시간제 취업허가(주 10~20시간) + TOPIK 3급 취득 목표',
    steps: [
      { title: '01. D-4 허용 근로시간 확인', href: '/visa' },
      { title: '02. TOPIK 어학 스펙 준비', href: '/spec' },
      { title: '03. 합법 아르바이트 지원', href: '/' },
    ],
  },
  undergrad: {
    badge: 'D-2 대학·대학원 재학',
    headline: '학기 중 주 25~30시간 · 방학 무제한 근무로 직무 경력과 자격증 축적',
    steps: [
      { title: '01. 목표 기업 비자·어학 확인', href: '/companies' },
      { title: '02. 전공 자격증·스펙 쌓기', href: '/spec' },
      { title: '03. 경력형 아르바이트 경험', href: '/' },
    ],
  },
  graduating: {
    badge: 'D-10 구직 · E-7 취업 전환',
    headline: '국내 학사 이상 졸업자 E-7 경력 면제 특례로 국내 기업 정규직 입사',
    steps: [
      { title: '01. 비자 스폰서 기업 지원', href: '/companies' },
      { title: '02. D-10·E-7 전환 서류 확인', href: '/visa' },
      { title: '03. 이력서·자기소개서 완성', href: '/profile' },
    ],
  },
};

const QUICK_SEARCH_ITEMS = [
  { keyword: '삼성전자 · E-7 정규직 채용', href: '/companies' },
  { keyword: '쿠팡 · IT/물류 다국적 채용', href: '/companies' },
  { keyword: '네이버 · AI/글로벌 서비스 채용', href: '/companies' },
  { keyword: 'D-2 / D-4 시간제 취업허가 계산기', href: '/visa' },
  { keyword: 'E-7-1 / F-2-7 비자 취득 조건·비용', href: '/visa' },
  { keyword: 'TOPIK · 정보처리기사 추천 스펙', href: '/spec' },
];

export default function CareerRoadmapPage() {
  useLanguage();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [stage, setStage] = useState<StudentStage>('undergrad');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      searchQuery.includes('비자') ||
      searchQuery.toUpperCase().includes('D-') ||
      searchQuery.toUpperCase().includes('E-') ||
      searchQuery.toUpperCase().includes('F-')
    ) {
      router.push('/visa');
    } else if (searchQuery.includes('스펙') || searchQuery.toUpperCase().includes('TOPIK')) {
      router.push('/spec');
    } else if (searchQuery.includes('알바') || searchQuery.includes('아르바이트')) {
      router.push('/');
    } else {
      router.push('/companies');
    }
  };

  const matchedQuickItems = searchQuery.trim()
    ? QUICK_SEARCH_ITEMS.filter((item) =>
        item.keyword.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const menuCards = [
    {
      step: '01',
      title: '기업 정보',
      desc: '외국인 채용 인증 기업 및 공식 채용관 연결',
      href: '/companies',
      icon: Building2,
    },
    {
      step: '02',
      title: '비자 정보',
      desc: '근로시간 계산기 및 전체 비자 취득·비용 안내',
      href: '/visa',
      icon: FileCheck2,
    },
    {
      step: '03',
      title: '스펙 쌓기',
      desc: '취업 가산점 어학·자격증 로드맵 추천',
      href: '/spec',
      icon: GraduationCap,
    },
    {
      step: '04',
      title: '아르바이트 정보',
      desc: '비자 규정 준수 검증 공고 및 지원자 통계',
      href: '/',
      icon: Clock,
    },
  ];

  const currentStage = STAGE_SUMMARY[stage];

  return (
    <div className="min-h-screen bg-white">
      {/* 1. 삼성 채용포털 스타일 상단 풀-와이드 히어로 배너 */}
      <section className="relative w-full h-[460px] md:h-[520px] bg-gray-950 overflow-hidden flex flex-col justify-between">
        {/* 배경 이미지 + 다크 오버레이 */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/85" />

        {/* 히어로 상단 미니 브랜드 바 */}
        <div className="relative z-10 max-w-6xl w-full mx-auto px-6 pt-6 flex items-center justify-between text-white/90">
          <div className="flex items-center gap-6 text-xs font-semibold tracking-wider">
            <span className="text-sm font-extrabold tracking-widest text-white">
              WORKBRIDGE
            </span>
            <Link href="/companies" className="hover:text-white hidden sm:inline">
              기업정보
            </Link>
            <Link href="/visa" className="hover:text-white hidden sm:inline">
              비자가이드
            </Link>
            <Link href="/spec" className="hover:text-white hidden sm:inline">
              스펙쌓기
            </Link>
            <Link href="/" className="hover:text-white hidden sm:inline">
              아르바이트
            </Link>
          </div>
          <span className="text-[11px] text-white/70">
            Global Student Career Platform
          </span>
        </div>

        {/* 히어로 하단 검색바 & 카운터 오버레이 영역 */}
        <div className="relative z-10 max-w-6xl w-full mx-auto px-6 pb-10 md:pb-12 space-y-4">
          {/* 안내 문구 + 전체보기 링크 */}
          <div className="flex items-center gap-3 text-white">
            <h2 className="text-lg sm:text-2xl font-bold tracking-tight">
              12 개 인증 기업과 16 종 비자 가이드가 준비되어 있습니다.
            </h2>
            <Link
              href="/companies"
              className="inline-flex items-center gap-0.5 text-xs sm:text-sm font-semibold text-white/90 hover:text-white shrink-0"
            >
              <span>전체보기</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 검색창 + 우측 직군/카테고리 카운터 */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
            {/* 흰색 테두리 투명 검색 인풋 */}
            <div className="relative flex-1 max-w-2xl">
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center border border-white/85 bg-black/40 backdrop-blur-sm h-12 px-4"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 180)}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="기업명, 비자(D-2, E-7), 직무로 검색해 보세요."
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/65 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="검색"
                  className="text-white hover:text-white/80 pl-3"
                >
                  <Search className="w-5 h-5" />
                </button>
              </form>

              {/* 입력 시 빠른 이동 드롭다운 */}
              {isSearchFocused && matchedQuickItems.length > 0 && (
                <div className="absolute left-0 right-0 top-12 bg-white border border-gray-200 shadow-xl z-20 divide-y divide-gray-100">
                  {matchedQuickItems.map((item) => (
                    <Link
                      key={item.keyword}
                      href={item.href}
                      className="flex items-center justify-between px-4 py-2.5 text-xs font-medium text-gray-800 hover:bg-gray-50"
                    >
                      <span>{item.keyword}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* 우측 카운터 링크 (삼성 신입/경력/인턴 스타일) */}
            <div className="flex items-center gap-5 sm:gap-7 text-white text-sm font-semibold">
              <Link
                href="/companies"
                className="inline-flex items-center gap-1 hover:text-white/80 transition-colors"
              >
                <span>인증기업</span>
                <span className="font-extrabold">12</span>
                <ChevronRight className="w-4 h-4 text-white/75" />
              </Link>

              <Link
                href="/visa"
                className="inline-flex items-center gap-1 hover:text-white/80 transition-colors"
              >
                <span>비자가이드</span>
                <span className="font-extrabold">16</span>
                <ChevronRight className="w-4 h-4 text-white/75" />
              </Link>

              <Link
                href="/"
                className="inline-flex items-center gap-1 hover:text-white/80 transition-colors"
              >
                <span>아르바이트</span>
                <span className="font-extrabold">6</span>
                <ChevronRight className="w-4 h-4 text-white/75" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 배너 하단 임팩트 슬로건 섹션 (여백 중심, 최소 텍스트) */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-8 space-y-3">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          국경을 넘어 새로운 커리어를 향한 도전
        </h1>
        <p className="text-sm sm:text-base text-gray-500">
          WorkBridge는 외국인 유학생의 합법적인 실무 경험부터 대한민국 정규직 취업까지 하나로 연결합니다.
        </p>
      </section>

      {/* 3. 4단계 핵심 메뉴 바로가기 (간결한 카드형) */}
      <section className="max-w-6xl mx-auto px-6 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {menuCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.step}
                href={card.href}
                className="group p-5 rounded-2xl border border-gray-200 hover:border-gray-900 bg-white flex flex-col justify-between space-y-4 transition-all"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-gray-400 group-hover:text-gray-900">
                      {card.step}
                    </span>
                    <Icon className="w-4 h-4 text-gray-700" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900">
                    {card.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-gray-900 pt-1">
                  <span>바로가기</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. 한 줄 체류단계별 맞춤 경로 선택기 */}
      <section className="max-w-6xl mx-auto px-6 pt-6 pb-14">
        <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-xs font-bold text-gray-500">
                체류 단계별 빠른 경로
              </span>
              <h2 className="text-base font-bold text-gray-900">
                {currentStage.headline}
              </h2>
            </div>

            <div className="flex flex-wrap gap-1.5 shrink-0">
              {[
                { id: 'language', label: 'D-4 어학연수' },
                { id: 'undergrad', label: 'D-2 재학생' },
                { id: 'graduating', label: 'D-10·E-7 취업' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setStage(tab.id as StudentStage)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                    stage === tab.id
                      ? 'bg-gray-900 text-white'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {currentStage.steps.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="p-3.5 rounded-xl bg-white border border-gray-200 hover:border-gray-900 flex items-center justify-between text-xs font-bold text-gray-800 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{s.title}</span>
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}