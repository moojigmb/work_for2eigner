'use client';

import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Users,
  Search,
  ExternalLink,
  Bookmark,
  ChevronDown,
  ChevronUp,
  Check,
  AlertTriangle,
} from 'lucide-react';
import { useLanguage } from '../../src/LanguageContext';

interface RealCompany {
  id: number;
  name: string;
  englishName: string;
  industry: string;
  companyScale: string;
  location: string;
  employeeCount: string;
  supportedVisas: string[];
  minTopikLevel: number;
  topikText: string;
  compensation: string;
  description: string;
  hiringProcess: string[];
  visaSupportNote: string;
  careerUrl: string;
  careerPortalName: string;
  isVisaSponsor: boolean;
}

const REAL_COMPANIES: RealCompany[] = [
  {
    id: 1,
    name: '삼성전자',
    englishName: 'Samsung Electronics',
    industry: 'IT·반도체·전자',
    companyScale: '대기업',
    location: '경기 수원 · 화성 · 서울 서초',
    employeeCount: '약 129,000명',
    supportedVisas: ['D-2', 'D-10', 'E-7', 'F-2', 'F-4', 'F-5', 'F-6'],
    minTopikLevel: 3,
    topikText: 'TOPIK 3급 이상 (R&D·영어트랙 별도)',
    compensation: '신입 초봉 5,300만 원 이상 + 성과급',
    description:
      '글로벌 R&D, 소프트웨어 개발, 반도체 공정, 해외영업 분야에서 국내 대학 외국인 유학생 및 석·박사 인재를 정기·상시 채용합니다.',
    hiringProcess: [
      '삼성 채용포털 온라인 지원서 접수',
      '직무적합성평가 및 GSAT / SW역량테스트',
      '직무·임원 종합면접 및 채용건강검진',
      '최종합격 후 E-7-1 전문인력 비자 전환 행정 지원',
    ],
    visaSupportNote:
      '국내 대학 학사 이상 졸업(예정)자의 경우 경력 면제 특례를 적용받아 E-7-1 취업비자 발급을 지원합니다.',
    careerUrl: 'https://www.samsungcareers.com',
    careerPortalName: '삼성 공식 채용포털',
    isVisaSponsor: true,
  },
  {
    id: 2,
    name: '현대자동차',
    englishName: 'Hyundai Motor Company',
    industry: '모빌리티·제조·해외영업',
    companyScale: '대기업',
    location: '서울 서초 양재 · 경기 화성 남양연구소',
    employeeCount: '약 73,000명',
    supportedVisas: ['D-2', 'D-10', 'E-7', 'F-2', 'F-4', 'F-5', 'F-6'],
    minTopikLevel: 4,
    topikText: 'TOPIK 4급 이상 권장 (해외사업·R&D 영어 우대)',
    compensation: '신입 연봉 5,000만 원대 + 경영성과급',
    description:
      '미래 모빌리티 연구개발(R&D), 권역별 해외영업, 생산·품질 관리 분야에서 외국인 유학생 채용 전형 및 글로벌 인턴십을 운영합니다.',
    hiringProcess: [
      '현대차 채용 홈페이지 상시채용 공고 지원',
      '서류전형 및 AI 역량검사 / 직무테스트',
      '1차 직무면접 → 2차 임원면접',
      '채용검진 및 E-7 취업비자 초청·자격변경 진행',
    ],
    visaSupportNote:
      '해외영업원(2742) 및 기계·자동차공학 기술자(2351) 직종 코드로 E-7-1 비자 스폰서십이 체계화되어 있습니다.',
    careerUrl: 'https://talent.hyundai.com',
    careerPortalName: '현대자동차 공식 채용포털',
    isVisaSponsor: true,
  },
  {
    id: 3,
    name: '쿠팡',
    englishName: 'Coupang',
    industry: '이커머스·IT·물류',
    companyScale: '글로벌 기업',
    location: '서울 송파 잠실 · 전국 물류캠프',
    employeeCount: '약 80,000명',
    supportedVisas: ['D-2', 'D-10', 'E-7', 'F-2', 'F-4', 'F-5', 'F-6', 'H-2'],
    minTopikLevel: 0,
    topikText: '직무별 상이 (IT·글로벌 직무 영어 가능)',
    compensation: 'IT·기획 연봉 5,000만~8,000만 원대 / 물류직 시급·월급제',
    description:
      '백엔드·AI 엔지니어, 글로벌 프로덕트 매니저(PM) 등 본사 전문직부터 전국 물류센터 오퍼레이션 인력까지 다국적 인재를 채용합니다.',
    hiringProcess: [
      'Coupang Jobs 영문·국문 공고 지원',
      '리크루터 폰 스크리닝 (직무·비자 요건 확인)',
      '화상·대면 직무 인터뷰',
      '오퍼 레터 발급 및 글로벌 모빌리티 팀 비자 지원',
    ],
    visaSupportNote:
      '본사 IT·비즈니스 전문직은 E-7 비자 스폰서십을 제공하며, F-2·F-4·F-5·F-6·H-2 소지자는 물류·운영 직군 지원이 용이합니다.',
    careerUrl: 'https://www.coupang.jobs',
    careerPortalName: 'Coupang Jobs 채용관',
    isVisaSponsor: true,
  },
  {
    id: 4,
    name: '네이버',
    englishName: 'NAVER',
    industry: 'IT·플랫폼·AI',
    companyScale: '대기업',
    location: '경기 성남 분당 정자동 (1784)',
    employeeCount: '약 4,500명',
    supportedVisas: ['D-2', 'D-10', 'E-7', 'F-2', 'F-4', 'F-5', 'F-6'],
    minTopikLevel: 4,
    topikText: 'TOPIK 4급 이상 (글로벌 서비스 영어·일본어 우대)',
    compensation: '신입 연봉 5,000만 원 이상 + 복지포인트',
    description:
      'AI 연구, 검색·클라우드 개발, 일본(LINE)·북미·동남아 글로벌 서비스 기획 및 콘텐츠 현지화 분야에서 외국인 개발자와 기획자를 채용합니다.',
    hiringProcess: [
      'NAVER Careers 직군별 공고 지원',
      '온라인 코딩테스트 / 사전과제',
      '1차 기술·직무 면접 → 2차 종합 면접',
      '최종합격 및 출입국 E-7 비자 서류 지원',
    ],
    visaSupportNote:
      '소프트웨어 개발자(222) 및 해외 서비스 기획 직무로 D-10 인턴십 연계 및 E-7-1 전환이 가능합니다.',
    careerUrl: 'https://recruit.navercorp.com',
    careerPortalName: 'NAVER Careers 공식 사이트',
    isVisaSponsor: true,
  },
  {
    id: 5,
    name: 'LG전자',
    englishName: 'LG Electronics',
    industry: '가전·전장·B2B',
    companyScale: '대기업',
    location: '서울 영등포 여의도 · 마곡 사이언스파크 · 창원',
    employeeCount: '약 36,000명',
    supportedVisas: ['D-2', 'D-10', 'E-7', 'F-2', 'F-4', 'F-5', 'F-6'],
    minTopikLevel: 4,
    topikText: 'TOPIK 4급 이상 권장 (R&D·해외마케팅 영어 우대)',
    compensation: '신입 초봉 5,100만 원 수준 + 경영성과급',
    description:
      '스마트가전, 전장(VS), AI·SW 연구개발 및 글로벌 법인 연계 해외영업·SCM 분야에서 외국인 유학생 채용 전형을 운영합니다.',
    hiringProcess: [
      'LG Careers 온라인 입사지원',
      '서류전형 및 인적성검사(LG Way Fit Test)',
      '1차 직무역량 면접 → 2차 최종 면접',
      '건강검진 및 E-7 취업비자 발급 절차 진행',
    ],
    visaSupportNote:
      '국내 대학 학·석·박사 졸업 유학생 대상 상시 채용 트랙을 통해 E-7 비자 발급 서류를 지원합니다.',
    careerUrl: 'https://careers.lg.com',
    careerPortalName: 'LG Careers 공식 포털',
    isVisaSponsor: true,
  },
  {
    id: 6,
    name: '카카오',
    englishName: 'Kakao',
    industry: 'IT·모바일·콘텐츠',
    companyScale: '대기업',
    location: '경기 성남 판교 · 제주',
    employeeCount: '약 4,000명',
    supportedVisas: ['D-10', 'E-7', 'F-2', 'F-4', 'F-5', 'F-6'],
    minTopikLevel: 4,
    topikText: 'TOPIK 4급 이상 (한국어 비즈니스 소통 가능자)',
    compensation: '신입 연봉 5,000만 원대 + 유연근무 지원',
    description:
      '모바일 플랫폼 개발, AI 모델링, 글로벌 웹툰·엔터테인먼트 콘텐츠 현지화 및 해외 제휴 직무에서 다국적 인재를 채용합니다.',
    hiringProcess: [
      'Kakao Careers 영입 공고 지원',
      '코딩테스트 또는 직무 사전과제',
      '1차 실무진 인터뷰 → 2차 컬처핏·임원 인터뷰',
      '최종 합격 및 비자 자격변경 진행',
    ],
    visaSupportNote:
      '국내 거주 D-10·F계열 비자 소지자 우대 및 IT·기획 전문 직군 E-7-1 비자 전환을 지원합니다.',
    careerUrl: 'https://careers.kakao.com',
    careerPortalName: '카카오 영입 공식 사이트',
    isVisaSponsor: true,
  },
  {
    id: 7,
    name: 'SK하이닉스',
    englishName: 'SK hynix',
    industry: '반도체·첨단제조',
    companyScale: '대기업',
    location: '경기 이천 · 충북 청주 · 성남 분당',
    employeeCount: '약 32,000명',
    supportedVisas: ['D-2', 'D-10', 'E-7', 'F-2', 'F-4', 'F-5'],
    minTopikLevel: 3,
    topikText: 'TOPIK 3급 이상 (반도체 R&D·설계 영어 우대)',
    compensation: '신입 초봉 5,300만 원 이상 + 초과이익분배금(PS)',
    description:
      'HBM 등 차세대 메모리 반도체 설계, 소자·공정 연구, 글로벌 고객 기술지원(FAE) 분야에서 국내외 이공계 유학생을 채용합니다.',
    hiringProcess: [
      'SK Careers 입사지원서 접수',
      'SKCT (SK종합역량검사) 응시',
      '직무 면접 및 임원 면접',
      '채용검진 후 E-7 비자 발급 지원',
    ],
    visaSupportNote:
      '국내 이공계 대학 학·석·박사 졸업 예정자의 경우 E-7-1 전문인력 비자 요건 충족이 유리합니다.',
    careerUrl: 'https://recruit.skhynix.com',
    careerPortalName: 'SK하이닉스 채용사이트',
    isVisaSponsor: true,
  },
  {
    id: 8,
    name: 'CJ그룹 (CJ제일제당·CJ ENM)',
    englishName: 'CJ Group',
    industry: '식품·바이오·엔터테인먼트',
    companyScale: '대기업',
    location: '서울 중구 쌍림동 · 마포 상암동',
    employeeCount: '약 30,000명',
    supportedVisas: ['D-2', 'D-10', 'E-7', 'F-2', 'F-4', 'F-5', 'F-6'],
    minTopikLevel: 4,
    topikText: 'TOPIK 4급 이상 (K-푸드·K-콘텐츠 마케팅 우대)',
    compensation: '신입 연봉 4,500만~5,000만 원대',
    description:
      'K-푸드 해외 브랜드 마케팅, 글로벌 유통 영업, 바이오 연구 및 K-콘텐츠 해외 배급 분야에서 외국인 유학생 인턴 및 신입사원을 모집합니다.',
    hiringProcess: [
      'CJ그룹 채용사이트 공고 지원',
      '서류전형 및 직무테스트',
      '1차 직무면접 → 2차 경영진 면접',
      '입사 및 E-7 취업비자 서류 지원',
    ],
    visaSupportNote:
      '국내 대학 졸업 유학생 대상 글로벌 인재 전형을 정기 운영하며, 인턴십(D-10) 후 정규직(E-7) 전환 사례가 많습니다.',
    careerUrl: 'https://recruit.cj.net',
    careerPortalName: 'CJ그룹 공식 채용홈페이지',
    isVisaSponsor: true,
  },
  {
    id: 9,
    name: 'HD현대중공업',
    englishName: 'HD Hyundai Heavy Industries',
    industry: '조선·해양·엔지니어링',
    companyScale: '대기업',
    location: '울산 동구 · 경기 성남 판교 GRC',
    employeeCount: '약 13,000명',
    supportedVisas: ['D-10', 'E-7', 'E-9', 'E-10', 'F-2', 'F-5'],
    minTopikLevel: 2,
    topikText: '설계·해외영업 TOPIK 4급 / 기능·선원 2급 이상',
    compensation: '대졸 신입 5,000만 원대 / 숙련기능인력 연 3,200만 원 이상',
    description:
      '친환경 선박 설계, 해외 선주 영업, 조선해양 엔지니어링(E-7-1)부터 용접·도장 등 숙련기능인력(E-7-4)·선원(E-10)까지 다양한 비자 트랙을 운영합니다.',
    hiringProcess: [
      'HD현대 채용포털 직무별 지원',
      '서류심사 및 인성검사',
      '실무·임원 면접 (기능직 기량 검증 포함)',
      '비자 유형별(E-7-1 / E-7-4) 출입국 허가 신청',
    ],
    visaSupportNote:
      '조선업 특례 쿼터가 적용되어 공학계열 유학생(E-7-1) 및 숙련기능인력(E-7-4) 비자 전환 지원이 활발합니다.',
    careerUrl: 'https://recruit.hd.com',
    careerPortalName: 'HD현대 공식 채용포털',
    isVisaSponsor: true,
  },
  {
    id: 10,
    name: '롯데호텔앤리조트',
    englishName: 'LOTTE Hotels & Resorts',
    industry: '호텔·관광·서비스',
    companyScale: '대기업',
    location: '서울 중구 을지로 · 송파 잠실 · 제주',
    employeeCount: '약 4,500명',
    supportedVisas: ['D-2', 'D-4', 'D-10', 'E-7', 'F-2', 'F-4', 'F-5', 'F-6', 'H-1', 'H-2'],
    minTopikLevel: 3,
    topikText: 'TOPIK 3급 이상 + 영어·일본어·중국어 능통자',
    compensation: '정규 신입 연봉 3,600만~4,000만 원 / 파트타임 시급제',
    description:
      '프런트 오피스, 컨시어지, 해외 VIP 고객 응대, 식음(F&B) 및 호텔 경영 분야에서 다국어 역량을 갖춘 유학생·워홀러·거주비자 인재를 채용합니다.',
    hiringProcess: [
      '롯데그룹 채용홈페이지 지원',
      '서류전형 및 L-TAB 조직적합도 진단',
      '역량·외국어 면접 및 건강검진',
      '호텔·관광 전문인력(E-7-1) 또는 시간제 취업허가 연계',
    ],
    visaSupportNote:
      '관광호텔업 분야 유학생 시간제 취업허가(D-2·D-4) 및 졸업 후 호텔 관리자·통역(E-7-1) 비자 전환이 가능합니다.',
    careerUrl: 'https://recruit.lotte.co.kr',
    careerPortalName: '롯데그룹 공식 채용사이트',
    isVisaSponsor: true,
  },
  {
    id: 11,
    name: 'YBM어학원 (YBM NET)',
    englishName: 'YBM Language Institute',
    industry: '교육·외국어 회화지도',
    companyScale: '중견기업',
    location: '서울 종로 · 강남 · 신촌 및 전국 센터',
    employeeCount: '약 1,200명',
    supportedVisas: ['D-2', 'D-4', 'E-1 ~ E-6', 'F-2', 'F-4', 'F-5', 'F-6'],
    minTopikLevel: 0,
    topikText: '어학 무관 (원어민 회화강사 E-2 / 유학생 보조)',
    compensation: '전임 강사 월 250만~350만 원 / 시간제 시급 15,000~25,000원',
    description:
      '영어·일본어·중국어 등 외국어 회화 전문 강사(E-2 비자 스폰서) 및 유학생 대상 교재 검수·튜터링 파트타임 인력을 상시 채용합니다.',
    hiringProcess: [
      'YBM 공식 채용 안내 및 센터별 지원',
      '시범 강의(Demo Class) 및 원어민 인터뷰',
      '학위 아포스티유·범죄경력증명서 등 E-2 서류 검증',
      '사증발급인정서 신청 및 강의 배정',
    ],
    visaSupportNote:
      '영어권 7개국 학사 이상 소지자에게 E-2 회화지도 비자 스폰서를 제공하며, F-2·F-4·F-6 소지자는 자유 강사 활동이 가능합니다.',
    careerUrl: 'https://www.ybm.co.kr',
    careerPortalName: 'YBM 공식 홈페이지',
    isVisaSponsor: true,
  },
  {
    id: 12,
    name: '스타벅스 코리아 (SCK컴퍼니)',
    englishName: 'Starbucks Korea',
    industry: 'F&B·카페·매장운영',
    companyScale: '대기업',
    location: '서울 전역 (명동·홍대·강남 등) 및 전국 매장',
    employeeCount: '약 23,000명',
    supportedVisas: ['D-2', 'D-4', 'F-2', 'F-4', 'F-5', 'F-6', 'H-1', 'H-2'],
    minTopikLevel: 3,
    topikText: 'TOPIK 3급 이상 (고객 응대 한국어 소통 필수)',
    compensation: '시급 11,500원~ (주휴·심야수당·식대·4대보험 완비)',
    description:
      '외국인 관광객 방문이 많은 명동·홍대·이태원·강남 상권 매장에서 다국어 소통이 가능한 바리스타(유학생 시간제 취업허가 준수)를 상시 채용합니다.',
    hiringProcess: [
      '스타벅스 코리아 공식 채용 안내 지원',
      '서류 심사 및 매장 관리자 대면 면접',
      '표준근로계약서 작성 → 출입국 시간제 취업허가 승인',
      '바리스타 입문 교육 후 매장 근무 시작',
    ],
    visaSupportNote:
      '표준근로계약서와 사업자등록증을 정식 발급해 주므로 유학생(D-2·D-4)이 합법적으로 시간제 취업허가를 받기 용이합니다.',
    careerUrl: 'https://www.starbucks.co.kr',
    careerPortalName: '스타벅스 코리아 홈페이지',
    isVisaSponsor: false,
  },
];

const VISA_OPTIONS = [
  { code: 'ALL', label: '전체 비자' },
  { code: 'D-2', label: 'D-2 (정규 유학)' },
  { code: 'D-4', label: 'D-4 (어학연수)' },
  { code: 'D-10', label: 'D-10 (구직·인턴)' },
  { code: 'E-7', label: 'E-7 (전문·숙련취업)' },
  { code: 'E-1 ~ E-6', label: 'E-1~E-6 (회화지도E-2·연구)' },
  { code: 'E-9', label: 'E-9 (비전문취업)' },
  { code: 'E-10', label: 'E-10 (선원취업)' },
  { code: 'F-2', label: 'F-2 (거주·우수인재)' },
  { code: 'F-4', label: 'F-4 (재외동포)' },
  { code: 'F-5', label: 'F-5 (영주권)' },
  { code: 'F-6', label: 'F-6 (결혼이민)' },
  { code: 'H-1', label: 'H-1 (워킹홀리데이)' },
  { code: 'H-2', label: 'H-2 (방문취업)' },
];

export default function CompaniesPage() {
  useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [industryFilter, setIndustryFilter] = useState('ALL');
  const [myVisa, setMyVisa] = useState('ALL');
  const [myTopik, setMyTopik] = useState<number>(6);
  const [onlyEligible, setOnlyEligible] = useState(false);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [onlySaved, setOnlySaved] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('workbridge_saved_companies');
      if (stored) setSavedIds(JSON.parse(stored));
    } catch {
      // 무시
    }
  }, []);

  const toggleSaveCompany = (id: number) => {
    setSavedIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      try {
        localStorage.setItem('workbridge_saved_companies', JSON.stringify(next));
      } catch {
        // 무시
      }
      return next;
    });
  };

  const checkEligibility = (company: RealCompany) => {
    const visaMatch =
      myVisa === 'ALL' || company.supportedVisas.includes(myVisa);
    const topikMatch = myTopik >= company.minTopikLevel;
    return {
      isEligible: visaMatch && topikMatch,
      visaMatch,
      topikMatch,
    };
  };

  const filteredCompanies = REAL_COMPANIES.filter((comp) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      comp.name.toLowerCase().includes(q) ||
      comp.englishName.toLowerCase().includes(q) ||
      comp.industry.toLowerCase().includes(q) ||
      comp.location.toLowerCase().includes(q) ||
      comp.supportedVisas.some((v) => v.toLowerCase().includes(q));

    const matchesIndustry =
      industryFilter === 'ALL' || comp.industry.includes(industryFilter);

    const { isEligible } = checkEligibility(comp);
    const matchesEligible = !onlyEligible || isEligible;
    const matchesSaved = !onlySaved || savedIds.includes(comp.id);

    return matchesSearch && matchesIndustry && matchesEligible && matchesSaved;
  });

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
      {/* 통일된 페이지 상단 헤더 */}
      <header className="pb-6 border-b border-zinc-200 space-y-1.5">
        <div className="text-xs font-medium text-zinc-500">
          외국인 채용 및 비자 지원 기업 디렉토리
        </div>
        <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">
          기업 정보 및 공식 채용관 안내
        </h1>
        <p className="text-sm text-zinc-600">
          보유 비자와 TOPIK 급수를 선택해 지원 가능 여부를 확인하고, 각 기업의 공식 채용 홈페이지로 바로 이동할 수 있습니다.
        </p>
      </header>

      {/* 조건 필터 패널 */}
      <section className="bg-white border border-zinc-200 rounded-lg p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-zinc-500">
              보유 비자 선택
            </label>
            <select
              value={myVisa}
              onChange={(e) => setMyVisa(e.target.value)}
              className="w-full h-9 px-3 text-xs bg-white border border-zinc-300 rounded-lg text-zinc-900 focus:outline-none focus:border-zinc-900"
            >
              {VISA_OPTIONS.map((v) => (
                <option key={v.code} value={v.code}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-medium text-zinc-500">
              TOPIK 등급 선택
            </label>
            <select
              value={myTopik}
              onChange={(e) => setMyTopik(Number(e.target.value))}
              className="w-full h-9 px-3 text-xs bg-white border border-zinc-300 rounded-lg text-zinc-900 focus:outline-none focus:border-zinc-900"
            >
              <option value={6}>TOPIK 5~6급</option>
              <option value={4}>TOPIK 4급</option>
              <option value={3}>TOPIK 3급</option>
              <option value={2}>TOPIK 2급</option>
              <option value={0}>미보유 / 영어 중심</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-medium text-zinc-500">
              조건 필터
            </label>
            <button
              type="button"
              onClick={() => setOnlyEligible((prev) => !prev)}
              className={`w-full h-9 px-3 rounded-lg text-xs font-medium border transition-colors ${
                onlyEligible
                  ? 'bg-emerald-700 text-white border-emerald-700'
                  : 'bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-50'
              }`}
            >
              지원 가능 기업만 보기 {onlyEligible ? '· 적용됨' : ''}
            </button>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-medium text-zinc-500">
              관심 기업
            </label>
            <button
              type="button"
              onClick={() => setOnlySaved((prev) => !prev)}
              className={`w-full h-9 px-3 rounded-lg text-xs font-medium border flex items-center justify-center gap-1.5 transition-colors ${
                onlySaved
                  ? 'bg-zinc-900 text-white border-zinc-900'
                  : 'bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-50'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>저장한 기업 ({savedIds.length})</span>
            </button>
          </div>
        </div>

        {/* 검색어 및 업종 탭 */}
        <div className="pt-3 border-t border-zinc-100 flex flex-col lg:flex-row gap-3 items-center justify-between">
          <div className="relative w-full lg:max-w-xs">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="기업명, 지역, 비자 검색"
              className="w-full h-9 pl-9 pr-3 text-xs border border-zinc-300 rounded-lg focus:outline-none focus:border-zinc-900"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 w-full lg:w-auto">
            {[
              { id: 'ALL', label: '전체 업종' },
              { id: 'IT', label: 'IT·반도체' },
              { id: '해외영업', label: '모빌리티·제조' },
              { id: '조선', label: '조선·중공업' },
              { id: '호텔', label: '호텔·관광' },
              { id: '교육', label: '교육·강사' },
              { id: 'F&B', label: 'F&B·매장' },
            ].map((ind) => (
              <button
                key={ind.id}
                type="button"
                onClick={() => setIndustryFilter(ind.id)}
                className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  industryFilter === ind.id
                    ? 'bg-zinc-900 text-white'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                {ind.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 기업 목록 (카드 격자 대신 채용 공고형 수직 디렉토리 리스트) */}
      <section className="space-y-2">
        <div className="flex items-center justify-between text-xs text-zinc-500 px-1">
          <span>검색 결과 {filteredCompanies.length}개 기업</span>
          <span>공식 채용포털 직통 연결</span>
        </div>

        {filteredCompanies.length === 0 ? (
          <div className="bg-white border border-zinc-200 rounded-lg p-12 text-center space-y-1.5">
            <p className="text-sm font-medium text-zinc-900">
              선택한 조건과 일치하는 기업이 없습니다.
            </p>
            <p className="text-xs text-zinc-500">
              비자 필터를 '전체 비자'로 변경하거나 검색어를 지워보세요.
            </p>
          </div>
        ) : (
          <div className="bg-white border border-zinc-200 rounded-lg divide-y divide-zinc-200">
            {filteredCompanies.map((company) => {
              const { isEligible, visaMatch, topikMatch } = checkEligibility(company);
              const isSaved = savedIds.includes(company.id);
              const isExpanded = expandedId === company.id;

              return (
                <div key={company.id} className="p-5 sm:p-6 space-y-4">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    {/* 좌측: 기업 기본 정보 */}
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-medium text-zinc-500">
                          {company.industry} · {company.companyScale}
                        </span>
                        {company.isVisaSponsor && (
                          <span className="px-2 py-0.5 text-[11px] font-medium bg-zinc-100 text-zinc-800 rounded">
                            비자 스폰서 지원
                          </span>
                        )}
                        {(myVisa !== 'ALL' || myTopik < 6) && (
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded ${
                              isEligible
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-amber-50 text-amber-800'
                            }`}
                          >
                            {isEligible ? (
                              <>
                                <Check className="w-3 h-3" />
                                <span>내 조건 지원 가능</span>
                              </>
                            ) : (
                              <>
                                <AlertTriangle className="w-3 h-3" />
                                <span>
                                  {!visaMatch
                                    ? '비자 전환 필요'
                                    : `TOPIK ${company.minTopikLevel}급 이상 권장`}
                                </span>
                              </>
                            )}
                          </span>
                        )}
                      </div>

                      <div className="flex items-baseline gap-2">
                        <h2 className="text-lg font-semibold text-zinc-900">
                          {company.name}
                        </h2>
                        <span className="text-xs text-zinc-400">
                          {company.englishName}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-3xl">
                        {company.description}
                      </p>

                      {/* 핵심 조건 3줄 메타 */}
                      <div className="pt-1 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-zinc-500">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                          {company.location}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-zinc-400" />
                          {company.employeeCount}
                        </span>
                        <span className="text-zinc-700 font-medium">
                          {company.compensation}
                        </span>
                      </div>

                      {/* 지원 가능 비자 태그 */}
                      <div className="pt-1 flex items-center gap-1.5 flex-wrap">
                        <span className="text-[11px] text-zinc-400 mr-1">
                          지원 비자:
                        </span>
                        {company.supportedVisas.map((v) => {
                          const active = myVisa !== 'ALL' && v === myVisa;
                          return (
                            <span
                              key={v}
                              className={`px-2 py-0.5 text-[11px] rounded border ${
                                active
                                  ? 'bg-emerald-700 text-white border-emerald-700 font-medium'
                                  : 'bg-zinc-50 text-zinc-700 border-zinc-200'
                              }`}
                            >
                              {v}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* 우측: 실행 액션 버튼 영역 */}
                    <div className="flex sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-between gap-2 shrink-0">
                      <a
                        href={company.careerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg text-xs font-medium inline-flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <span>채용공고 바로가기</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedId(isExpanded ? null : company.id)
                          }
                          className="px-3 py-2 border border-zinc-200 hover:bg-zinc-50 rounded-lg text-xs font-medium text-zinc-700 inline-flex items-center gap-1 transition-colors"
                        >
                          <span>전형·비자 안내</span>
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => toggleSaveCompany(company.id)}
                          aria-label="관심 기업 저장"
                          className={`p-2 rounded-lg border transition-colors ${
                            isSaved
                              ? 'bg-zinc-900 text-white border-zinc-900'
                              : 'bg-white text-zinc-500 border-zinc-200 hover:text-zinc-900'
                          }`}
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 펼쳐지는 전형 및 비자 행정 상세 영역 */}
                  {isExpanded && (
                    <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1.5">
                        <div className="font-semibold text-zinc-900">
                          채용 전형 절차 ({company.careerPortalName})
                        </div>
                        <ol className="list-decimal list-inside space-y-1 text-zinc-600">
                          {company.hiringProcess.map((step, idx) => (
                            <li key={idx}>{step}</li>
                          ))}
                        </ol>
                      </div>

                      <div className="space-y-1.5">
                        <div className="font-semibold text-zinc-900">
                          어학 기준 및 비자 전환 안내
                        </div>
                        <p className="text-zinc-700 font-medium">
                          • 권장 어학: {company.topikText}
                        </p>
                        <p className="text-zinc-600 leading-relaxed">
                          • {company.visaSupportNote}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}