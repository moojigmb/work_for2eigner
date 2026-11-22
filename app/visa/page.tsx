'use client';

import React, { useState } from 'react';
import {
  FileCheck2,
  Clock,
  ShieldAlert,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  Info,
  ArrowRight,
  Search,
  FileText,
  Award,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../../src/LanguageContext';

interface VisaDetail {
  code: string;
  name: string;
  category: 'study' | 'work' | 'residence';
  categoryLabel: string;
  target: string;
  stayPeriod: string;
  requirements: string[];
  workScope: string;
  documents: string[];
  caution: string;
}

const VISA_LIST: VisaDetail[] = [
  {
    code: 'D-2',
    name: '유학 비자 (전문학사·학사·석·박사)',
    category: 'study',
    categoryLabel: '유학·구직',
    target: '국내 전문대학 이상 정규 학위과정 입학·재학생',
    stayPeriod: '1회 부여 최대 2년 (졸업 시까지 연장)',
    requirements: [
      '국내 정규 대학 입학허가서 및 등록금 납입 증빙',
      '학위과정별 어학 기준 충족 (TOPIK 3~4급 이상 권장, 영어트랙 별도 기준)',
      '재정능력 입증 (지방 1,600만 원 / 수도권 2,000만 원 상당 예금잔고)',
    ],
    workScope:
      '직전 학기 평균 C학점(2.0) 이상 + 시간제 취업허가 시 학기 중 주 10~30시간, 주말·방학 무제한 근무 가능',
    documents: [
      '여권, 외국인등록증, 통합신청서',
      '재학증명서 및 직전 학기 성적증명서',
      '시간제취업 확인서(대학 국제처 직인), 표준근로계약서, 사업자등록증',
    ],
    caution:
      '출입국사무소 사전 허가 없이 아르바이트 적발 시 1차 범칙금 및 비자 연장 제한 불이익',
  },
  {
    code: 'D-4',
    name: '일반연수 비자 (대학 부설 어학당)',
    category: 'study',
    categoryLabel: '유학·구직',
    target: '국내 대학 부설 어학원 한국어 연수생 (D-4-1)',
    stayPeriod: '6개월 단위 연장 (최대 2년)',
    requirements: [
      '고등학교 졸업 이상 학력 증빙 (아포스티유 또는 영사확인)',
      '어학당 입학허가서 및 재정능력 입증 (약 1,000만 원 이상)',
      '체류 연장을 위해 출석률 70% 이상 유지 필수',
    ],
    workScope:
      '입국(자격변경)일로부터 6개월 경과 + 출석률 90% 이상 시 시간제 취업허가 후 주 10~20시간 가능',
    documents: [
      '여권, 외국인등록증, 어학당 재학·출석증명서',
      'TOPIK 2급 이상 성적표 (소지 시 주 20시간까지 확대)',
      '표준근로계약서 및 고용주 사업자등록증 사본',
    ],
    caution:
      'D-4 비자는 주말·공휴일 무제한 근무 예외가 적용되지 않으며 주당 총 허용 시간 내에서만 근무 가능',
  },
  {
    code: 'D-10',
    name: '구직 비자 (졸업 후 취업준비·인턴)',
    category: 'study',
    categoryLabel: '유학·구직',
    target: '국내 전문학사 이상 졸업(예정)자 및 세계 우수대학 졸업자',
    stayPeriod: '6개월 단위 연장 (최대 2년~3년)',
    requirements: [
      '구직점수제 190점 만점 중 60점 이상 획득 (기본항목 20점 이상 필수)',
      '국내 대학 학사 이상 졸업자는 구직활동계획서만으로 특례 신청 가능',
      'TOPIK 4급 이상 또는 사회통합프로그램(KIIP) 4단계 이수 시 가산점 부여',
    ],
    workScope:
      '일반 단순 아르바이트는 제한되나, 전공 연계 기업과 계약 시 최대 1년(동일 기업 6개월) 유급 인턴십 가능',
    documents: [
      '학위증명서(또는 졸업예정증명서), 성적증명서',
      '월별 구직활동계획서 및 체류비 입증 서류',
      '인턴 근무 시: 인턴 표준근로계약서, 기업 사업자등록증 (개시 15일 내 신고)',
    ],
    caution:
      '인턴십 시작 후 15일 이내에 반드시 하이코리아 또는 출입국사무소에 연수개시 신고를 완료해야 함',
  },
  {
    code: 'E-7-1',
    name: '특정활동 비자 (전문인력 정규직)',
    category: 'work',
    categoryLabel: '전문·취업',
    target: '해외영업, 통번역, IT 개발, 디자인 등 87개 전문 직종 취업자',
    stayPeriod: '1회 부여 최대 3년 (계속 연장 가능)',
    requirements: [
      '원칙: 관련 분야 학사 학위 + 1년 이상 경력 (또는 석사 이상 학위)',
      '특례: 국내 전문학사(전공 일치) 또는 국내 학사 이상 졸업자는 경력 요건 전면 면제',
      '임금 요건: 전년도 1인당 GNI의 80% 이상 (중소·벤처기업 및 유학생 특례 완화 적용)',
    ],
    workScope:
      '허가받은 고용 기업 및 지정 직무에 한해 정규직 풀타임 근무 (이직 시 사전 근무처 변경 허가 필수)',
    documents: [
      '고용계약서, 고용사유서(기업 작성), 사업자등록증, 납세증명서',
      '졸업증명서, 경력증명서, TOPIK·자격증 사본',
      '기업 내국인 고용보험 가입자 명부 (내국인 대비 외국인 비율 20% 이내 원칙)',
    ],
    caution:
      '퇴사하거나 다른 회사로 이직할 경우 반드시 사유 발생일로부터 15일 이내 신고 및 변경 허가 필요',
  },
  {
    code: 'E-7-4',
    name: '숙련기능인력 점수제 비자 (K-Point)',
    category: 'work',
    categoryLabel: '전문·취업',
    target: 'E-9·H-2·E-10 비자로 국내 4년 이상 합법 취업 중인 숙련 인력',
    stayPeriod: '2년 단위 연장 (가족 초청 및 영주권 단계 전환 가능)',
    requirements: [
      '최근 10년 내 4년 이상 지정 비자로 국내 체류 및 현재 근무처 정상 근무 중',
      '300점 만점 중 200점 이상 획득 (평균 연봉 2,600만 원 이상 필수)',
      '한국어 능력 최소 요건 충족 (TOPIK 2급 이상 또는 사회통합프로그램 2단계 이상)',
    ],
    workScope:
      '제조업, 건설업, 농축어업, 뿌리산업 등 지정 산업 분야의 숙련 기능 직무 정규 근무',
    documents: [
      '소득금액증명원(최근 2년), 표준근로계약서',
      '현 근무처 기업 추천서 및 고용보험 피보험자격 이력내역서',
      'TOPIK 성적표 또는 사회통합프로그램 이수증',
    ],
    caution:
      '비전문취업(E-9)과 달리 체류기간 상한 제한 없이 갱신이 가능하며 배우자·미성년 자녀 동반 초청 허용',
  },
  {
    code: 'E-2',
    name: '회화지도 비자 (원어민 외국어 강사)',
    category: 'work',
    categoryLabel: '전문·취업',
    target: '외국어 전문학원, 초·중·고교, 대학에서 외국어 회화를 지도하는 강사',
    stayPeriod: '최대 2년 (계약 기간에 따라 부여)',
    requirements: [
      '해당 외국어를 모국어로 하는 국가의 국민 (영어권 7개국 등 지정 국가)',
      '모국어 국가의 대학에서 학사 학위 이상 취득',
      '범죄경력증명서(아포스티유) 및 법무부 지정 병원 채용신체검사(마약검사 포함) 통과',
    ],
    workScope:
      '등록된 어학원·학교에서의 외국어 회화 강의 (타 학원 강의·개인 과외는 별도 허가 없이 금지)',
    documents: [
      '학위증 사본(아포스티유 확인), 본국 범죄경력증명서',
      '고용계약서, 학원설립·운영등록증, 사업자등록증',
      '채용신체검사서 (입국 후 외국인등록 시 제출)',
    ],
    caution:
      '허가받지 않은 개인 과외나 타 학원 출강 적발 시 출입국관리법 위반으로 엄격히 처벌됨',
  },
  {
    code: 'F-2-7',
    name: '점수제 우수인재 거주 비자',
    category: 'residence',
    categoryLabel: '거주·동포',
    target: 'D-2·D-10·E-1~E-7 등 합법 체류 중인 우수 외국인 인재',
    stayPeriod: '1회 최대 3~5년 부여 (영주권 F-5 신청 기반)',
    requirements: [
      '평가표 170점 만점 중 80점 이상 획득 (나이, 학력, 한국어능력, 연간 소득 합산)',
      '국내 석·박사 학위 취득 유학생은 체류기간 요건 완화 및 고득점 배점 유리',
      '사회통합프로그램(KIIP) 이수 시 최대 10점 가산점 부여',
    ],
    workScope:
      '취업 직종 제한이 사라져 자유로운 이직·창업·프리랜서·아르바이트 활동 가능 (단순노무 제외)',
    documents: [
      '소득금액증명원, 학위증명서, TOPIK 또는 KIIP 이수증',
      '재직증명서, 원천징수영수증, 거주지 입증 서류',
      '범죄경력증명서 (해외 체류 이력에 따라 제출)',
    ],
    caution:
      '국내 대학 졸업 유학생이 취업 후 가장 목표로 삼는 핵심 비자로, E-7과 달리 이직 시 사전 허가가 필요 없음',
  },
  {
    code: 'F-4',
    name: '재외동포 비자 (외국국적동포)',
    category: 'residence',
    categoryLabel: '거주·동포',
    target: '대한민국 국적을 보유했던 자 또는 부모·조부모 중 일방이 대한민국 국적이었던 자',
    stayPeriod: '1회 최대 3년 부여 (계속 연장 가능)',
    requirements: [
      '과거 한국 국적 보유 또는 직계존속의 한국 국적 입증 서류 (제적등본·가족관계증명서)',
      '한국어 능력 입증 (TOPIK 1급 이상, KIIP 1단계 이상, 국내 초·중·고 졸업 등)',
      '해외 범죄경력증명서 제출 및 결격사유 미해당',
    ],
    workScope:
      '대부분의 사무직·전문직·서비스업·자영업 자유 취업 가능 (단, 일부 단순노무 직종은 제한)',
    documents: [
      '외국국적 취득 입증 서류, 제적등본 또는 기본증명서',
      '범죄경력증명서(아포스티유), 한국어 능력 입증 서류',
      '국내 거소신고증 신청서 및 거주지 입증 서류',
    ],
    caution:
      'F-4 소지자는 유학생과 달리 별도 시간제 취업허가 없이도 허용 범위 내 자유롭게 근무 및 이직 가능',
  },
];

export default function VisaInfoPage() {
  useLanguage();

  // 근로시간 계산기 상태
  const [visaType, setVisaType] = useState<'D-2-UG' | 'D-2-GRAD' | 'D-4' | 'D-10'>('D-2-UG');
  const [hasTopik, setHasTopik] = useState<boolean>(true);

  // 비자 가이드 필터 & 검색 상태
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'study' | 'work' | 'residence'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getVisaResult = () => {
    if (visaType === 'D-4') {
      return {
        hours: hasTopik
          ? '주 20시간 이내 (입국 6개월 경과 후)'
          : '주 10시간 이내 (입국 6개월 경과 후)',
        weekend: '주말·공휴일 무제한 적용 제외 (총 시간 내 근무)',
        procedure: '어학당 출석률 90% 이상 + 출입국사무소 시간제 취업허가 필수',
      };
    }
    if (visaType === 'D-2-UG') {
      return {
        hours: hasTopik
          ? '주 25시간 이내 (TOPIK 3급 이상 충족)'
          : '주 10시간 이내 (어학 기준 미충족 시)',
        weekend: hasTopik
          ? '주말·공휴일·방학 중 무제한 근무 가능'
          : '주말·방학 포함 엄격 제한',
        procedure:
          '직전 학기 평균 학점 C학점(2.0) 이상 + 대학 국제처 확인 및 시간제 취업허가',
      };
    }
    if (visaType === 'D-2-GRAD') {
      return {
        hours: hasTopik
          ? '주 30시간 이내 (TOPIK 4급 이상 충족)'
          : '주 15시간 이내 (어학 기준 미충족 시)',
        weekend: hasTopik
          ? '주말·공휴일·방학 중 무제한 근무 가능'
          : '주말·방학 포함 시간 제한',
        procedure: '대학 국제처 추천서 + 출입국사무소 시간제 취업허가 사전 신청',
      };
    }
    return {
      hours: '인턴십(수습) 계약 시 풀타임 근무 가능',
      weekend: '단순 노무·일반 아르바이트 제한 (전공 연계 인턴 허용)',
      procedure: '인턴 개시일로부터 15일 이내 출입국사무소 연수개시 신고 필수',
    };
  };

  const result = getVisaResult();

  const filteredVisas = VISA_LIST.filter((v) => {
    const matchesCategory = selectedCategory === 'all' || v.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      v.code.toLowerCase().includes(q) ||
      v.name.toLowerCase().includes(q) ||
      v.target.toLowerCase().includes(q) ||
      v.requirements.some((r) => r.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* 상단 헤더 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          비자 정보 및 체류자격 취득 가이드
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          유학생 아르바이트 허용 시간 계산부터 졸업 후 구직(D-10)·전문취업(E-7)·우수인재 거주(F-2-7) 취득 조건과 필수 서류까지 한눈에 확인하세요.
        </p>
      </div>

      {/* 1. 유학생 커리어 & 비자 전환 로드맵 */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-gray-900" />
          <h2 className="text-sm font-bold text-gray-900">
            유학생 국내 취업·정착 비자 전환 로드맵
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 items-center">
          {[
            {
              step: 'STEP 1',
              code: 'D-4 어학연수',
              desc: '한국어 습득 및 TOPIK 취득 (6개월 후 알바 가능)',
            },
            {
              step: 'STEP 2',
              code: 'D-2 정규유학',
              desc: '학위 취득 + 시간제 취업허가로 직무 경력 축적',
            },
            {
              step: 'STEP 3',
              code: 'D-10 구직·인턴',
              desc: '졸업 후 최대 2년 구직활동 및 유급 인턴십 수행',
            },
            {
              step: 'STEP 4',
              code: 'E-7 전문취업',
              desc: '국내 대학 졸업자 경력 면제 특례로 정규직 취업',
            },
            {
              step: 'STEP 5',
              code: 'F-2-7 우수인재',
              desc: '점수제 80점 달성 시 자유로운 이직·장기 거주',
            },
          ].map((item, idx) => (
            <div
              key={item.code}
              className="relative p-3.5 rounded-xl bg-gray-50 border border-gray-200 flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-400">
                    {item.step}
                  </span>
                  {idx < 4 && (
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400 hidden lg:block" />
                  )}
                </div>
                <div className="text-sm font-bold text-gray-900 mt-1">
                  {item.code}
                </div>
              </div>
              <p className="text-[11px] text-gray-600 mt-1.5 leading-snug">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. 법정 근로시간 자가진단기 */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-gray-900" />
            <span>내 비자·어학 조건 자가진단 (법정 근로시간 계산기)</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            현재 보유한 비자와 TOPIK 등급을 선택하면 허용 근무시간과 행정 절차를 안내합니다.
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-xs font-bold text-gray-500">1. 현재 체류자격 선택</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'D-2-UG', label: 'D-2 (학부 유학)' },
                  { id: 'D-2-GRAD', label: 'D-2 (석·박사)' },
                  { id: 'D-4', label: 'D-4 (어학연수)' },
                  { id: 'D-10', label: 'D-10 (졸업·구직)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setVisaType(item.id as 'D-2-UG' | 'D-2-GRAD' | 'D-4' | 'D-10')
                    }
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-colors ${
                      visaType === item.id
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-gray-500">2. 보유 TOPIK 등급 선택</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setHasTopik(true)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-colors ${
                    hasTopik
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  TOPIK 3~4급 이상 보유
                </button>
                <button
                  type="button"
                  onClick={() => setHasTopik(false)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-colors ${
                    !hasTopik
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  TOPIK 미보유 / 2급 이하
                </button>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-gray-900" />
                학기 중 주당 허용 근로시간
              </span>
              <span className="text-base font-extrabold text-gray-900">
                {result.hours}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <span className="text-gray-500">주말·방학 근무 조건</span>
              <span className="font-semibold text-gray-800">{result.weekend}</span>
            </div>

            <div className="pt-3 border-t border-gray-200 flex items-start gap-2 text-xs">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-gray-900">필수 행정 절차: </span>
                <span className="text-gray-600">{result.procedure}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 비자 종류별 취득 조건 및 상세 가이드 (8종) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              체류자격별 취득 조건 및 필수 서류 상세 (총 {VISA_LIST.length}종)
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              각 비자별 취득·전환 자격 요건, 취업 가능 범위, 출입국 제출 서류를 확인하세요.
            </p>
          </div>
        </div>

        {/* 카테고리 필터 및 검색 */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {[
              { id: 'all', label: '전체 비자 (8)' },
              { id: 'study', label: '유학·구직 (D-2·D-4·D-10)' },
              { id: 'work', label: '전문·취업 (E-7·E-2)' },
              { id: 'residence', label: '거주·동포 (F-2-7·F-4)' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() =>
                  setSelectedCategory(tab.id as 'all' | 'study' | 'work' | 'residence')
                }
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  selectedCategory === tab.id
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="비자 코드(E-7, F-2), 조건 검색..."
              className="w-full pl-10 pr-4 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-gray-900"
            />
          </div>
        </div>

        {/* 비자 상세 카드 리스트 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredVisas.map((visa) => (
            <div
              key={visa.code}
              className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* 비자 코드 및 분류 배지 */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 text-xs font-extrabold bg-gray-900 text-white rounded-lg">
                      {visa.code}
                    </span>
                    <span className="px-2.5 py-0.5 text-[11px] font-semibold bg-gray-100 text-gray-700 rounded-lg">
                      {visa.categoryLabel}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-gray-500">
                    체류기간: {visa.stayPeriod}
                  </span>
                </div>

                {/* 비자명 및 대상 */}
                <div>
                  <h3 className="text-base font-bold text-gray-900 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-gray-700 shrink-0" />
                    <span>{visa.name}</span>
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    <strong className="text-gray-700">발급 대상:</strong> {visa.target}
                  </p>
                </div>

                {/* 취득·전환 핵심 조건 */}
                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 space-y-2">
                  <div className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-gray-800" />
                    <span>취득·전환 핵심 조건</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-700">
                    {visa.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 취업 및 근로 허용 범위 */}
                <div className="text-xs space-y-1">
                  <div className="font-bold text-gray-900 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-gray-800" />
                    <span>취업·근로 허용 범위</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed pl-5">
                    {visa.workScope}
                  </p>
                </div>

                {/* 필수 제출 서류 */}
                <div className="text-xs space-y-1">
                  <div className="font-bold text-gray-900 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-gray-800" />
                    <span>주요 제출 서류</span>
                  </div>
                  <ul className="list-disc list-inside text-gray-600 space-y-0.5 pl-1">
                    {visa.documents.map((doc, idx) => (
                      <li key={idx}>{doc}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 하단 주의사항 박스 */}
              <div className="pt-3 border-t border-gray-100 flex items-start gap-2 text-[11px] text-red-600 bg-red-50/60 p-3 rounded-xl">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="leading-snug">{visa.caution}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}