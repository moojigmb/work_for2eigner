'use client';

import React, { createContext, useContext, useState } from 'react';

export type Lang = 'ko' | 'en' | 'jp' | 'cn' | 'vn';

export const LANGUAGE_OPTIONS: { code: Lang; label: string }[] = [
  { code: 'ko', label: '한국어 (KR)' },
  { code: 'en', label: 'English (EN)' },
  { code: 'jp', label: '日本語 (JP)' },
  { code: 'cn', label: '中文 (CN)' },
  { code: 'vn', label: 'Tiếng Việt (VN)' },
];

const TRANSLATIONS = {
  ko: {
    brandSub: '외국인 채용·스펙 플랫폼',
    portalTitle: '유학생·외국인 맞춤 채용 포털',
    profile: '프로필',
    menu: '메뉴',
    jobs: '채용정보',
    specs: '스펙 쌓기',
    login: '로그인',
    logout: '로그아웃',
    filterSearch: '조건 필터 검색',
    companySearch: '기업·매장명 검색',
    jobType: '직종',
    education: '학력',
    language: '어학',
    all: '전체',
    searchPlaceholder: '알바처명, 지역(예: 홍대, 신촌) 또는 직무를 입력하세요',
    totalJobsPrefix: '총',
    totalJobsSuffix: '개의 맞춤 공고',
    viewDetails: '자세히 보기 · 지원자 통계',
    urgent: '급구',
    fit: '지원 적합',
    strong: '합격 유력 · 내 스펙 추천',
    registerJob: '공고 등록하기',
    matchOnly: '내 스펙 맞춤 공고만 보기',
    
    // 프로필 및 스펙 페이지용 번역 추가
    resumeBuild: '이력서 작성',
    resumeBuildDesc: '지금까지의 경력과 정보를 바탕으로 이력서를 작성해 보세요.',
    coverLetterBuild: '자기소개서 작성',
    coverLetterBuildDesc: '나만의 이야기를 담아 자기소개서를 작성해 보세요.',
    career: '경력',
    skills: '보유 기술 / 특기',
    languageExams: '어학 시험 관리',
    recommendedJobs: '각종 경험에 따른 추천 알바',
    certRecommendations: '자격증 및 스펙 쌓기 추천',
    customerSupport: '고객 지원 / 문의',
    editProfile: '프로필 수정',
    applyStatus: '신청 상태',
    score: '점수',
  },
  en: {
    brandSub: 'Job & Career Platform',
    portalTitle: 'Job Portal for International Students',
    profile: 'Profile',
    menu: 'Menu',
    jobs: 'Jobs',
    specs: 'My Specs',
    login: 'Login',
    logout: 'Logout',
    filterSearch: 'Filter Search',
    companySearch: 'Search by Company',
    jobType: 'Job Type',
    education: 'Education',
    language: 'Language',
    all: 'All',
    searchPlaceholder: 'Enter company name, location, or job title',
    totalJobsPrefix: 'Total',
    totalJobsSuffix: 'matching jobs',
    viewDetails: 'Details · Applicant Stats',
    urgent: 'Urgent',
    fit: 'Suitable',
    strong: 'High Match',
    registerJob: 'Post a Job',
    matchOnly: 'View My Spec Matches Only',

    resumeBuild: 'Build Resume',
    resumeBuildDesc: 'Create your resume based on your past experience and information.',
    coverLetterBuild: 'Cover Letter',
    coverLetterBuildDesc: 'Write your own cover letter sharing your unique story.',
    career: 'Career',
    skills: 'Skills & Specialties',
    languageExams: 'Language Exam Management',
    recommendedJobs: 'Recommended Jobs by Experience',
    certRecommendations: 'Certificate & Spec Recommendations',
    customerSupport: 'Customer Support / Inquiry',
    editProfile: 'Edit Profile',
    applyStatus: 'Status',
    score: 'Score',
  },
  jp: {
    brandSub: '外国人採用・キャリアプラットフォーム',
    portalTitle: '留学生・外国人向け求人ポータル',
    profile: 'プロフィール',
    menu: 'メニュー',
    jobs: '求人情報',
    specs: 'スペック管理',
    login: 'ログイン',
    logout: 'ログアウト',
    filterSearch: '条件フィルター検索',
    companySearch: '企業・店舗名検索',
    jobType: '職種',
    education: '学歴',
    language: '語学',
    all: 'すべて',
    searchPlaceholder: '企業名、エリア（例：弘大、新村）、または職種を入力',
    totalJobsPrefix: '全',
    totalJobsSuffix: '件の求人',
    viewDetails: '詳細を見る · 応募者統計',
    urgent: '急募',
    fit: '応募適正',
    strong: '合格有力',
    registerJob: '求人を登録する',
    matchOnly: 'マイスペック一致求人のみ',

    resumeBuild: '履歴書作成',
    resumeBuildDesc: 'これまでの経歴と情報を元に履歴書を作成してみましょう。',
    coverLetterBuild: '志望動機・自己PR作成',
    coverLetterBuildDesc: 'あなただけのストーリーを込めて自己PRを作成しましょう。',
    career: '経歴',
    skills: '保有スキル・特技',
    languageExams: '語学試験管理',
    recommendedJobs: '各種経験に基づくおすすめバイト',
    certRecommendations: '資格・スペックアップおすすめ',
    customerSupport: 'カスタマーサポート / お問い合わせ',
    editProfile: 'プロフィール編集',
    applyStatus: '申請状態',
    score: 'スコア',
  },
  cn: {
    brandSub: '外国人招聘与履历平台',
    portalTitle: '留学生·外国人专属招聘门户',
    profile: '个人资料',
    menu: '菜单',
    jobs: '招聘信息',
    specs: '提升履历',
    login: '登录',
    logout: '登出',
    filterSearch: '条件筛选搜索',
    companySearch: '按企业·店名搜索',
    jobType: '职种',
    education: '学历',
    language: '语言',
    all: '全部',
    searchPlaceholder: '请输入企业名称、地区或职位',
    totalJobsPrefix: '共',
    totalJobsSuffix: '个匹配职位',
    viewDetails: '查看详情 · 应聘者统计',
    urgent: '急聘',
    fit: '合适',
    strong: '高匹配',
    registerJob: '发布职位',
    matchOnly: '仅看符合我履历的职位',

    resumeBuild: '制作简历',
    resumeBuildDesc: '根据您的过往经历和信息制作简历。',
    coverLetterBuild: '编写求职信',
    coverLetterBuildDesc: '写下您独一无二的故事。',
    career: '工作经历',
    skills: '专业技能 / 特长',
    languageExams: '语言考试管理',
    recommendedJobs: '根据经验推荐的兼职',
    certRecommendations: '证书与履历提升推荐',
    customerSupport: '客户支持 / 咨询',
    editProfile: '编辑个人资料',
    applyStatus: '申请状态',
    score: '分数',
  },
  vn: {
    brandSub: 'Nền tảng Việc làm & Hồ sơ',
    portalTitle: 'Cổng thông tin việc làm cho Du học sinh',
    profile: 'Hồ sơ',
    menu: 'Danh mục',
    jobs: 'Việc làm',
    specs: 'Tích lũy năng lực',
    login: 'Đăng nhập',
    logout: 'Đăng xuất',
    filterSearch: 'Tìm theo bộ lọc',
    companySearch: 'Tìm theo tên công ty',
    jobType: 'Loại công việc',
    education: 'Học lực',
    language: 'Ngôn ngữ',
    all: 'Tất cả',
    searchPlaceholder: 'Nhập tên công ty, khu vực hoặc công việc',
    totalJobsPrefix: 'Tổng cộng',
    totalJobsSuffix: 'việc làm phù hợp',
    viewDetails: 'Xem chi tiết · Thống kê ứng viên',
    urgent: 'Tuyển gấp',
    fit: 'Phù hợp',
    strong: 'Khớp cao',
    registerJob: 'Đăng tuyển dụng',
    matchOnly: 'Chỉ xem việc phù hợp với hồ sơ',

    resumeBuild: 'Tạo hồ sơ',
    resumeBuildDesc: 'Tạo sơ yếu lý lịch dựa trên kinh nghiệm và thông tin của bạn.',
    coverLetterBuild: 'Viết thư giới thiệu',
    coverLetterBuildDesc: 'Chia sẻ câu chuyện độc đáo của riêng bạn.',
    career: 'Kinh nghiệm',
    skills: 'Kỹ năng / Sở trường',
    languageExams: 'Quản lý chứng chỉ ngoại ngữ',
    recommendedJobs: 'Việc làm gợi ý theo kinh nghiệm',
    certRecommendations: 'Gợi ý chứng chỉ & nâng cao năng lực',
    customerSupport: 'Hỗ trợ khách hàng / Liên hệ',
    editProfile: 'Chỉnh sửa hồ sơ',
    applyStatus: 'Trạng thái',
    score: 'Điểm',
  },
};

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (typeof TRANSLATIONS)['ko'];
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('ko');

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: TRANSLATIONS[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}