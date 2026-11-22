'use client';

import React, { useState, useEffect } from 'react';
import {
  Building2,
  MapPin,
  Users,
  Award,
  CheckCircle2,
  Search,
  Briefcase,
  ExternalLink,
  Bookmark,
  Sparkles,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Filter,
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
  minTopikLevel: number; // 0: 어학무관/영어가능, 2~5: TOPIK 급수
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
    location: '경기 수원시 / 화성시 / 서울 서초구',
    employeeCount: '약 129,000명',
    supportedVisas: ['D-2', 'D-10', 'E-7', 'F-2', 'F-4', 'F-5', 'F-6'],
    minTopikLevel: 3,
    topikText: 'TOPIK 3급 이상 (R&D·영어트랙 별도 기준)',
    compensation: '신입 초봉 5,300만 원 이상 + 성과급(OPI/TAI)',
    description:
      '글로벌 R&D, 소프트웨어 개발, 반도체 공정, 해외영업 및 마케팅 분야에서 국내 대학 외국인 유학생 및 해외 석·박사 인재를 정기·상시 채용합니다.',
    hiringProcess: [
      '지원서 접수 (삼성 채용포털)',
      '직무적합성평가 및 GSAT / SW역량테스트',
      '종합면접 (직무·임원) 및 건강검진',
      '최종합격 후 E-7-1 전문인력 비자 전환 행정 지원',
    ],
    visaSupportNote:
      '국내 대학 학사 이상 졸업(예정)자의 경우 경력 면제 특례를 적용받아 E-7-1 취업비자 발급을 적극 지원합니다.',
    careerUrl: 'https://www.samsungcareers.com',
    careerPortalName: '삼성 공식 채용포털 (Samsung Careers)',
    isVisaSponsor: true,
  },
  {
    id: 2,
    name: '현대자동차',
    englishName: 'Hyundai Motor Company',
    industry: '모빌리티·제조·해외영업',
    companyScale: '대기업',
    location: '서울 서초구 양재동 / 경기 화성 남양연구소',
    employeeCount: '약 73,000명',
    supportedVisas: ['D-2', 'D-10', 'E-7', 'F-2', 'F-4', 'F-5', 'F-6'],
    minTopikLevel: 4,
    topikText: 'TOPIK 4급 이상 권장 (해외사업·R&D 영어 능통자 우대)',
    compensation: '신입 연봉 5,000만 원대 + 경영성과급',
    description:
      '미래 모빌리티 연구개발(R&D), 글로벌 권역별 해외영업, 생산·품질 관리 분야에서 외국인 유학생 채용 전형 및 글로벌 인턴십을 운영합니다.',
    hiringProcess: [
      '상시채용 공고 지원 (현대차 채용 홈페이지)',
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
    location: '서울 송파구 잠실 / 전국 물류캠프',
    employeeCount: '약 80,000명 (계열사 포함)',
    supportedVisas: ['D-2', 'D-10', 'E-7', 'F-2', 'F-4', 'F-5', 'F-6', 'H-2'],
    minTopikLevel: 0,
    topikText: '직무별 상이 (IT·글로벌 직무 영어 가능 / 현장직 기초 한국어)',
    compensation: 'IT·기획 연봉 5,000만~8,000만 원대 / 물류직 시급·월급제',
    description:
      '백엔드·AI 엔지니어, 글로벌 프로덕트 매니저(PM) 등 본사 전문직부터 전국 물류센터 오퍼레이션 인력까지 다국적 인재를 폭넓게 채용합니다.',
    hiringProcess: [
      'Coupang Jobs 영문/국문 공고 지원',
      '리크루터 폰 스크리닝 (직무·비자 요건 확인)',
      '화상/대면 직무 인터뷰 (Bar Raiser 포함)',
      '오퍼 레터 발급 및 글로벌 모빌리티 팀 비자 지원',
    ],
    visaSupportNote:
      '본사 IT·비즈니스 전문직은 E-7 비자 스폰서십을 제공하며, F-2·F-4·F-5·F-6·H-2 소지자는 물류·운영 직군 지원이 용이합니다.',
    careerUrl: 'https://www.coupang.jobs',
    careerPortalName: 'Coupang Jobs 공식 채용관',
    isVisaSponsor: true,
  },
  {
    id: 4,
    name: '네이버',
    englishName: 'NAVER',
    industry: 'IT·플랫폼·AI',
    companyScale: '대기업',
    location: '경기 성남시 분당구 정자동 (1784)',
    employeeCount: '약 4,500명 (본사 기준)',
    supportedVisas: ['D-2', 'D-10', 'E-7', 'F-2', 'F-4', 'F-5', 'F-6'],
    minTopikLevel: 4,
    topikText: 'TOPIK 4급 이상 (글로벌 서비스·AI 직무 영어/일본어 우대)',
    compensation: '신입 연봉 5,000만 원 이상 + 스톡옵션·복지포인트',
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
    careerPortalName: 'NAVER Careers 공식 채용사이트',
    isVisaSponsor: true,
  },
  {
    id: 5,
    name: 'LG전자',
    englishName: 'LG Electronics',
    industry: '가전·전장·B2B',
    companyScale: '대기업',
    location: '서울 영등포구 여의도 / 마곡 사이언스파크 / 창원',
    employeeCount: '약 36,000명 (국내 기준)',
    supportedVisas: ['D-2', 'D-10', 'E-7', 'F-2', 'F-4', 'F-5', 'F-6'],
    minTopikLevel: 4,
    topikText: 'TOPIK 4급 이상 권장 (R&D·해외마케팅 영어 능통자 우대)',
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
    careerPortalName: 'LG그룹 공식 채용포털 (LG Careers)',
    isVisaSponsor: true,
  },
  {
    id: 6,
    name: '카카오',
    englishName: 'Kakao',
    industry: 'IT·모바일·콘텐츠',
    companyScale: '대기업',
    location: '경기 성남시 분당구 판교역 / 제주',
    employeeCount: '약 4,000명 (본사 기준)',
    supportedVisas: ['D-10', 'E-7', 'F-2', 'F-4', 'F-5', 'F-6'],
    minTopikLevel: 4,
    topikText: 'TOPIK 4급 이상 (한국어 비즈니스 커뮤니케이션 가능자)',
    compensation: '신입 연봉 5,000만 원대 + 유연근무·복지지원',
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
    location: '경기 이천시 / 충북 청주시 / 성남 분당',
    employeeCount: '약 32,000명',
    supportedVisas: ['D-2', 'D-10', 'E-7', 'F-2', 'F-4', 'F-5'],
    minTopikLevel: 3,
    topikText: 'TOPIK 3급 이상 (반도체 R&D·설계 영어 능통자 우대)',
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
      '국내 이공계 대학 학·석·박사 졸업 예정자의 경우 E-7-1 전문인력 비자 요건 충족이 매우 유리합니다.',
    careerUrl: 'https://recruit.skhynix.com',
    careerPortalName: 'SK하이닉스 공식 채용사이트',
    isVisaSponsor: true,
  },
  {
    id: 8,
    name: 'CJ그룹 (CJ제일제당·CJ ENM)',
    englishName: 'CJ Group',
    industry: '식품·바이오·엔터테인먼트',
    companyScale: '대기업',
    location: '서울 중구 쌍림동 / 마포구 상암동',
    employeeCount: '약 30,000명 (주요 계열사 합산)',
    supportedVisas: ['D-2', 'D-10', 'E-7', 'F-2', 'F-4', 'F-5', 'F-6'],
    minTopikLevel: 4,
    topikText: 'TOPIK 4급 이상 (K-푸드·K-콘텐츠 글로벌 마케팅 우대)',
    compensation: '신입 연봉 4,500만~5,000만 원대',
    description:
      'K-푸드 해외 브랜드 마케팅, 글로벌 유통 영업, 바이오 연구 및 K-콘텐츠 해외 배급 분야에서 외국인 유학생 인턴 및 신입사원을 모집합니다.',
    hiringProcess: [
      'CJ그룹 채용사이트 공고 지원',
      '서류전형 및 CJ CAT / 직무테스트',
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
    location: '울산 동구 / 경기 성남 판교 GRC',
    employeeCount: '약 13,000명',
    supportedVisas: ['D-10', 'E-7', 'E-9', 'E-10', 'F-2', 'F-5'],
    minTopikLevel: 2,
    topikText: '직무별 상이 (설계·해외영업 TOPIK 4급 / 기능·선원 2급 이상)',
    compensation: '대졸 신입 5,000만 원대 / 숙련기능인력(E-7-4) 연 3,200만 원 이상',
    description:
      '친환경 선박 설계, 해외 선주 영업, 조선해양 엔지니어링(E-7-1)부터 용접·도장 등 숙련기능인력(E-7-4)·선원(E-10)까지 다양한 비자 트랙을 운영합니다.',
    hiringProcess: [
      'HD현대 채용포털 직무별 지원',
      '서류심사 및 인성검사',
      '실무·임원 면접 (기능직은 기량 검증 포함)',
      '비자 유형별(E-7-1 / E-7-4) 출입국 허가 신청',
    ],
    visaSupportNote:
      '조선업 특례 쿼터가 적용되어 공학계열 유학생(E-7-1) 및 숙련기능인력(E-7-4) 비자 전환 지원이 활발합니다.',
    careerUrl: 'https://recruit.hd.com',
    careerPortalName: 'HD현대 그룹 공식 채용포털',
    isVisaSponsor: true,
  },
  {
    id: 10,
    name: '롯데호텔앤리조트',
    englishName: 'LOTTE Hotels & Resorts',
    industry: '호텔·관광·면세서비스',
    companyScale: '대기업',
    location: '서울 중구 을지로 / 송파구 잠실 / 제주',
    employeeCount: '약 4,500명',
    supportedVisas: ['D-2', 'D-4', 'D-10', 'E-7', 'F-2', 'F-4', 'F-5', 'F-6', 'H-1', 'H-2'],
    minTopikLevel: 3,
    topikText: 'TOPIK 3급 이상 + 영어·일본어·중국어 등 외국어 능통자',
    compensation: '정규 신입 연봉 3,600만~4,000만 원 / 실습·파트타임 시급제',
    description:
      '프런트 오피스, 컨시어지, 해외 VIP 고객 응대, 식음(F&B) 및 호텔 경영 분야에서 다국어 역량을 갖춘 유학생·워홀러·거주비자 인재를 채용합니다.',
    hiringProcess: [
      '롯데그룹 채용홈페이지 지원',
      '서류전형 및 L-TAB (조직적합도 진단)',
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
    location: '서울 종로구 / 강남구 / 신촌 및 전국 센터',
    employeeCount: '약 1,200명',
    supportedVisas: ['D-2', 'D-4', 'E-1 ~ E-6', 'F-2', 'F-4', 'F-5', 'F-6'],
    minTopikLevel: 0,
    topikText: '어학 무관 (원어민 회화강사 E-2 / 한국어 가능 유학생 보조)',
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
    careerPortalName: 'YBM 공식 홈페이지 (채용안내)',
    isVisaSponsor: true,
  },
  {
    id: 12,
    name: '스타벅스 코리아 (SCK컴퍼니)',
    englishName: 'Starbucks Korea',
    industry: 'F&B·카페·매장운영',
    companyScale: '대기업',
    location: '서울 전역 (명동·홍대·강남 등 관광특구) 및 전국 매장',
    employeeCount: '약 23,000명',
    supportedVisas: ['D-2', 'D-4', 'F-2', 'F-4', 'F-5', 'F-6', 'H-1', 'H-2'],
    minTopikLevel: 3,
    topikText: 'TOPIK 3급 이상 (고객 응대 한국어 의사소통 필수)',
    compensation: '시급 11,500원~ (주휴수당·심야수당·식대·4대보험 완비)',
    description:
      '외국인 관광객 방문이 많은 명동·홍대·이태원·강남 상권 매장에서 다국어 소통이 가능한 바리스타(유학생 시간제 취업허가 준수)를 상시 채용합니다.',
    hiringProcess: [
      '스타벅스 코리아 공식 채용 안내 지원',
      '서류 심사 및 매장 관리자 대면 면접',
      '유학생(D-2·D-4) 표준근로계약서 작성 → 출입국 시간제 취업허가 승인',
      '바리스타 입문 교육 후 매장 근무 시작',
    ],
    visaSupportNote:
      '출입국관리법을 철저히 준수하여 표준근로계약서와 사업자등록증을 발급해 주므로 유학생이 합법적으로 시간제 취업허가를 받기 좋습니다.',
    careerUrl: 'https://www.starbucks.co.kr',
    careerPortalName: '스타벅스 코리아 공식 홈페이지',
    isVisaSponsor: false,
  },
];

const VISA_OPTIONS = [
  { code: 'ALL', label: '전체 비자 (선택 안 함)' },
  { code: 'D-2', label: 'D-2 (정규 유학)' },
  { code: 'D-4', label: 'D-4 (어학연수·일반연수)' },
  { code: 'D-10', label: 'D-10 (구직·인턴)' },
  { code: 'E-7', label: 'E-7 (특정활동·전문/숙련)' },
  { code: 'E-1 ~ E-6', label: 'E-1~E-6 (교수·회화지도E-2·연구)' },
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

  // 검색 및 기본 필터
  const [searchQuery, setSearchQuery] = useState('');
  const [industryFilter, setIndustryFilter] = useState('ALL');

  // [추가 기능 1] 내 비자·TOPIK 맞춤 진단기 상태
  const [myVisa, setMyVisa] = useState('ALL');
  const [myTopik, setMyTopik] = useState<number>(6); // 6이면 조건 충족 기준 통과, 0이면 미보유
  const [onlyEligible, setOnlyEligible] = useState(false);

  // [추가 기능 2] 관심 기업 스크랩(찜하기) & 상세 전형 펼치기
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [onlySaved, setOnlySaved] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('workbridge_saved_companies');
      if (stored) {
        setSavedIds(JSON.parse(stored));
      }
    } catch {
      // localStorage 접근 불가 환경 무시
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

  // 내 조건으로 지원 가능한지 판별하는 함수
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
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* 상단 헤더 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          기업 정보 및 공식 채용관 안내
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          외국인 유학생·전문인력 채용 제도가 갖춰진 국내 주요 기업의 지원 가능 비자, 채용 전형, 공식 채용 홈페이지 안내문을 확인하세요.
        </p>
      </div>

      {/* [추가 기능 1] 내 비자·어학 조건 맞춤 기업 판별 바 */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gray-900" />
            <h2 className="text-sm font-bold text-gray-900">
              내 비자·TOPIK 조건 맞춤 기업 매칭
            </h2>
          </div>
          <span className="text-xs text-gray-500">
            보유 비자와 어학 등급을 선택하면 지원 가능 여부를 자동으로 표시합니다.
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600">
              나의 현재 비자
            </label>
            <select
              value={myVisa}
              onChange={(e) => setMyVisa(e.target.value)}
              className="w-full px-3 py-2 text-xs font-medium bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-900"
            >
              {VISA_OPTIONS.map((v) => (
                <option key={v.code} value={v.code}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600">
              나의 TOPIK 급수
            </label>
            <select
              value={myTopik}
              onChange={(e) => setMyTopik(Number(e.target.value))}
              className="w-full px-3 py-2 text-xs font-medium bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-900"
            >
              <option value={6}>TOPIK 5~6급 (최상급)</option>
              <option value={4}>TOPIK 4급</option>
              <option value={3}>TOPIK 3급</option>
              <option value={2}>TOPIK 2급</option>
              <option value={0}>미보유 / 영어·모국어 중심</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => setOnlyEligible((prev) => !prev)}
            className={`py-2 px-3.5 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-colors ${
              onlyEligible
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>내 조건 지원 가능 기업만 ({onlyEligible ? 'ON' : 'OFF'})</span>
          </button>

          <button
            type="button"
            onClick={() => setOnlySaved((prev) => !prev)}
            className={`py-2 px-3.5 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-colors ${
              onlySaved
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>찜한 기업만 보기 ({savedIds.length})</span>
          </button>
        </div>
      </div>

      {/* 검색 및 업종 필터 */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col lg:flex-row gap-3 items-center justify-between">
        <div className="relative w-full lg:max-w-sm">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="기업명(삼성, 쿠팡, 네이버), 비자(E-7, D-2) 검색..."
            className="w-full pl-10 pr-4 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-gray-900"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 w-full lg:w-auto">
          {[
            { id: 'ALL', label: '전체 업종' },
            { id: 'IT', label: 'IT·반도체·플랫폼' },
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
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                industryFilter === ind.id
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {ind.label}
            </button>
          ))}
        </div>
      </div>

      {/* 기업 리스트 그리드 */}
      {filteredCompanies.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center space-y-2">
          <p className="text-sm font-bold text-gray-900">
            조건에 일치하는 기업이 없습니다.
          </p>
          <p className="text-xs text-gray-500">
            비자 필터를 '전체 비자'로 변경하거나 검색어를 초기화해 보세요.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredCompanies.map((company) => {
            const { isEligible, visaMatch, topikMatch } = checkEligibility(company);
            const isSaved = savedIds.includes(company.id);
            const isExpanded = expandedId === company.id;

            return (
              <div
                key={company.id}
                className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-gray-300 transition-colors"
              >
                <div className="space-y-3">
                  {/* 상단 배지 및 찜하기 버튼 */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2.5 py-0.5 text-[11px] font-semibold bg-gray-100 text-gray-700 rounded-lg">
                        {company.industry}
                      </span>
                      <span className="px-2 py-0.5 text-[11px] font-medium border border-gray-200 text-gray-600 rounded-lg">
                        {company.companyScale}
                      </span>
                      {company.isVisaSponsor && (
                        <span className="px-2.5 py-0.5 text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 rounded-lg">
                          비자 스폰서십 지원
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleSaveCompany(company.id)}
                      title="관심 기업 저장"
                      className={`p-2 rounded-xl border transition-colors shrink-0 ${
                        isSaved
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'bg-white text-gray-400 border-gray-200 hover:text-gray-900'
                      }`}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>

                  {/* 내 조건 매칭 상태 배지 (비자 선택 시 활성화) */}
                  {(myVisa !== 'ALL' || myTopik < 6) && (
                    <div>
                      {isEligible ? (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>내 비자·어학 조건으로 바로 지원 가능</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>
                            {!visaMatch && !topikMatch
                              ? '비자 전환(D-10→E-7) 및 TOPIK 보완 필요'
                              : !visaMatch
                              ? `선택한 비자(${myVisa}) 외 별도 취업비자 전환 필요`
                              : `권장 어학 기준(TOPIK ${company.minTopikLevel}급 이상) 확인 필요`}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 기업명 및 위치 */}
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-600 shrink-0" />
                      <span>{company.name}</span>
                      <span className="text-xs font-normal text-gray-400">
                        {company.englishName}
                      </span>
                    </h2>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {company.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {company.employeeCount}
                      </span>
                    </div>
                  </div>

                  {/* 기업 소개 */}
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {company.description}
                  </p>

                  {/* 지원 가능 비자 / 어학 / 보상 박스 */}
                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 space-y-2.5 text-xs">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-gray-500 font-medium shrink-0 pt-0.5">
                        지원 가능 비자
                      </span>
                      <div className="flex flex-wrap gap-1 justify-end">
                        {company.supportedVisas.map((v) => {
                          const isHighlighted = myVisa !== 'ALL' && v === myVisa;
                          return (
                            <span
                              key={v}
                              className={`px-2 py-0.5 rounded-md font-semibold border ${
                                isHighlighted
                                  ? 'bg-emerald-600 text-white border-emerald-600'
                                  : 'bg-white border-gray-200 text-gray-800'
                              }`}
                            >
                              {v}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <span className="text-gray-500 font-medium flex items-center gap-1 shrink-0">
                        <Award className="w-3.5 h-3.5" />
                        권장 어학
                      </span>
                      <span className="font-semibold text-gray-900 text-right">
                        {company.topikText}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <span className="text-gray-500 font-medium flex items-center gap-1 shrink-0">
                        <Briefcase className="w-3.5 h-3.5" />
                        처우·보상
                      </span>
                      <span className="font-semibold text-gray-900 text-right">
                        {company.compensation}
                      </span>
                    </div>
                  </div>

                  {/* [추가 기능 2] 채용 전형 & 비자 준비 팁 아코디언 */}
                  <div className="border border-gray-100 rounded-xl overflow-hidden">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedId(isExpanded ? null : company.id)
                      }
                      className="w-full px-3.5 py-2.5 bg-gray-50/70 hover:bg-gray-100/70 text-xs font-semibold text-gray-700 flex items-center justify-between transition-colors"
                    >
                      <span>채용 전형 절차 및 비자 행정 가이드 보기</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="p-3.5 bg-white space-y-2.5 text-xs border-t border-gray-100">
                        <div>
                          <p className="font-bold text-gray-900 mb-1">
                            • 표준 채용 프로세스
                          </p>
                          <ol className="list-decimal list-inside space-y-0.5 text-gray-600">
                            {company.hiringProcess.map((step, idx) => (
                              <li key={idx}>{step}</li>
                            ))}
                          </ol>
                        </div>
                        <div className="p-2.5 rounded-lg bg-blue-50/60 text-blue-900 leading-relaxed">
                          <strong>비자 안내:</strong> {company.visaSupportNote}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 하단 실제 기업 공식 채용 홈페이지 직통 버튼 */}
                <div className="pt-1">
                  <a
                    href={company.careerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>채용공고 바로가기 · {company.careerPortalName}</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}