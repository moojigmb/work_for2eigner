import { Lang } from '../LanguageContext';

const LANG_PAIR_MAP: Record<Lang, string> = {
  ko: 'ko',
  en: 'en',
  jp: 'ja',
  cn: 'zh-CN',
  vn: 'vi',
};

// 1. 공고 UI 및 고정 항목 5개국어 사전
export const JOB_UI_TEXT: Record<
  Lang,
  {
    banners: { badge: string; title: string; description: string }[];
    filterTab: string;
    companyTab: string;
    specMatchBtn: string;
    totalPrefix: string;
    totalSuffix: string;
    addJobBtn: string;
    all: string;
    strongMatch: string;
    goodMatch: string;
    urgent: string;
    viewDetails: string;
    searchPlaceholder: string;
    noJobs: string;
    resetFilter: string;
  }
> = {
  ko: {
    banners: [
      {
        badge: '유학생 맞춤 기획전',
        title: '한국어가 서툴러도 OK! 초보 환영 아르바이트 모음',
        description: 'TOPIK 2~3급부터 바로 지원 가능한 검증된 사업장 공고를 확인하세요.',
      },
      {
        badge: '시급 13,000원 이상',
        title: '외국어 능력 우대 채용관 (통번역 · 어학원 · 글로벌 스토어)',
        description: '모국어와 한국어 강점을 살려 더 높은 시급으로 일해 보세요.',
      },
      {
        badge: '비자 가이드',
        title: 'D-2 / D-4 유학생 시간제 취업허가 신청 안내',
        description: '법정 근로시간 기준과 출입국 신고 필수 서류를 한눈에 정리했습니다.',
      },
    ],
    filterTab: '조건 필터 검색',
    companyTab: '기업·매장명 검색',
    specMatchBtn: '내 스펙(TOPIK 4급) 맞춤 공고만 보기',
    totalPrefix: '총',
    totalSuffix: '개 공고',
    addJobBtn: '+ 공고 등록하기',
    all: '전체',
    strongMatch: '합격 유력 · 내 스펙 추천',
    goodMatch: '지원 적합',
    urgent: '급구',
    viewDetails: '자세히 보기 · 지원자 통계',
    searchPlaceholder: '알바처명, 지역(예: 홍대, 신촌) 또는 직무를 입력하세요',
    noJobs: '조건에 맞는 채용 공고가 없습니다.',
    resetFilter: '필터 초기화',
  },
  en: {
    banners: [
      {
        badge: 'For International Students',
        title: 'Beginner Friendly! Part-Time Jobs Open to Basic Korean',
        description: 'Verified workplaces you can apply to starting from TOPIK Level 2–3.',
      },
      {
        badge: '₩13,000+ / hr',
        title: 'Foreign Language Preferred Jobs (Translation · Academy · Global Store)',
        description: 'Leverage your native language and Korean skills for higher hourly pay.',
      },
      {
        badge: 'Visa Guide',
        title: 'D-2 / D-4 Student Part-Time Work Permit Guide',
        description: 'Check legal working hours and required immigration documents at a glance.',
      },
    ],
    filterTab: 'Filter Search',
    companyTab: 'Search by Company',
    specMatchBtn: 'Show Only Jobs Matching My Spec (TOPIK 4)',
    totalPrefix: 'Total',
    totalSuffix: 'jobs',
    addJobBtn: '+ Post a Job',
    all: 'All',
    strongMatch: 'High Chance · Recommended',
    goodMatch: 'Good Fit',
    urgent: 'Urgent',
    viewDetails: 'Details · Applicant Stats',
    searchPlaceholder: 'Search by company, area (e.g., Hongdae), or role',
    noJobs: 'No job postings match your filters.',
    resetFilter: 'Reset Filters',
  },
  jp: {
    banners: [
      {
        badge: '留学生向け特集',
        title: '韓国語が苦手でもOK！初心者歓迎アルバイト特集',
        description: 'TOPIK 2〜3級からすぐに応募できる安心の求人を確認しましょう。',
      },
      {
        badge: '時給13,000ウォン以上',
        title: '外国語スキル優遇採用（通訳・翻訳・語学堂・グローバルストア）',
        description: '母国語と韓国語の強みを活かして高時給で働きましょう。',
      },
      {
        badge: 'ビザガイド',
        title: 'D-2 / D-4 留学生資格外活動（アルバイト）許可申請案内',
        description: '法定労働時間の基準と出入国申告の必要書類をまとめました。',
      },
    ],
    filterTab: '条件フィルター検索',
    companyTab: '企業・店舗名検索',
    specMatchBtn: '自分のスペック(TOPIK 4級)適合求人のみ表示',
    totalPrefix: '全',
    totalSuffix: '件の求人',
    addJobBtn: '+ 求人を登録する',
    all: 'すべて',
    strongMatch: '合格有力 · おすすめ',
    goodMatch: '応募適合',
    urgent: '急募',
    viewDetails: '詳細を見る · 応募者統計',
    searchPlaceholder: '店舗名、地域（例：弘大、新村）または職種を入力',
    noJobs: '条件に一致する求人がありません。',
    resetFilter: 'フィルター初期化',
  },
  cn: {
    banners: [
      {
        badge: '留学生专属企划',
        title: '韩语不熟练也OK！欢迎新手的兼职合集',
        description: '查看TOPIK 2~3级即可直接申请的认证商家招聘信息。',
      },
      {
        badge: '时薪13,000韩元以上',
        title: '外语能力优先招聘专场（翻译 · 语言学院 · 国际门店）',
        description: '发挥母语与韩语优势，获得更高时薪的工作机会。',
      },
      {
        badge: '签证指南',
        title: 'D-2 / D-4 留学生打工证（时间制就业许可）申请指南',
        description: '一目了然查看法定工作时间标准及出入境申报必备材料。',
      },
    ],
    filterTab: '条件筛选搜索',
    companyTab: '企业·店名搜索',
    specMatchBtn: '仅看符合我履历(TOPIK 4级)的职位',
    totalPrefix: '共',
    totalSuffix: '个职位',
    addJobBtn: '+ 发布招聘',
    all: '全部',
    strongMatch: '录用概率高 · 推荐',
    goodMatch: '符合条件',
    urgent: '急聘',
    viewDetails: '查看详情 · 应聘者统计',
    searchPlaceholder: '请输入店名、地区（如：弘大、新村）或职位',
    noJobs: '没有符合条件的招聘信息。',
    resetFilter: '重置筛选',
  },
  vn: {
    banners: [
      {
        badge: 'Dành cho Du học sinh',
        title: 'Tiếng Hàn chưa giỏi cũng OK! Việc làm thêm chào đón người mới',
        description: 'Xem các công việc uy tín có thể ứng tuyển ngay từ TOPIK cấp 2–3.',
      },
      {
        badge: 'Lương trên 13,000 KRW/giờ',
        title: 'Tuyển dụng ưu tiên ngoại ngữ (Biên phiên dịch · Trung tâm ngoại ngữ)',
        description: 'Phát huy thế mạnh tiếng mẹ đẻ và tiếng Hàn để nhận mức lương cao hơn.',
      },
      {
        badge: 'Hướng dẫn Visa',
        title: 'Hướng dẫn xin giấy phép làm thêm cho du học sinh D-2 / D-4',
        description: 'Tổng hợp quy định giờ làm việc và hồ sơ cần thiết nộp cục xuất nhập cảnh.',
      },
    ],
    filterTab: 'Tìm theo bộ lọc',
    companyTab: 'Tìm theo tên công ty',
    specMatchBtn: 'Chỉ xem việc phù hợp hồ sơ (TOPIK 4)',
    totalPrefix: 'Tổng',
    totalSuffix: 'việc làm',
    addJobBtn: '+ Đăng tin tuyển dụng',
    all: 'Tất cả',
    strongMatch: 'Khả năng đậu cao · Đề xuất',
    goodMatch: 'Phù hợp',
    urgent: 'Tuyển gấp',
    viewDetails: 'Xem chi tiết · Thống kê ứng viên',
    searchPlaceholder: 'Nhập tên cửa hàng, khu vực (VD: Hongdae) hoặc vị trí',
    noJobs: 'Không có tin tuyển dụng phù hợp.',
    resetFilter: 'Đặt lại bộ lọc',
  },
};

// 2. 자주 쓰이는 공고 태그/문구 즉시 번역 사전
const PHRASE_DICT: Record<string, Record<Lang, string>> = {
  '카페/음료': { ko: '카페/음료', en: 'Cafe / Beverage', jp: 'カフェ・飲料', cn: '咖啡/饮品', vn: 'Cà phê / Đồ uống' },
  '매장관리/판매': { ko: '매장관리/판매', en: 'Store / Retail', jp: '店舗管理・販売', cn: '门店管理/销售', vn: 'Quản lý cửa hàng / Bán hàng' },
  '음식점/서빙': { ko: '음식점/서빙', en: 'Restaurant / Serving', jp: '飲食店・ホール', cn: '餐饮/服务员', vn: 'Nhà hàng / Phục vụ' },
  '교육/강사': { ko: '교육/강사', en: 'Education / Tutor', jp: '教育・講師', cn: '教育/讲师', vn: 'Giáo dục / Gia sư' },
  '사무/번역': { ko: '사무/번역', en: 'Office / Translation', jp: '事務・翻訳', cn: '文职/翻译', vn: 'Văn phòng / Biên dịch' },
  '학력무관': { ko: '학력무관', en: 'Any Education', jp: '学歴不問', cn: '学历不限', vn: 'Không yêu cầu bằng cấp' },
  '대학교 재학': { ko: '대학교 재학', en: 'University Student', jp: '大学在学中', cn: '大学在读', vn: 'Sinh viên đại học' },
  'TOPIK 2급 이상': { ko: 'TOPIK 2급 이상', en: 'TOPIK Lv.2+', jp: 'TOPIK 2級以上', cn: 'TOPIK 2级以上', vn: 'TOPIK cấp 2 trở lên' },
  'TOPIK 3급 이상': { ko: 'TOPIK 3급 이상', en: 'TOPIK Lv.3+', jp: 'TOPIK 3級以上', cn: 'TOPIK 3级以上', vn: 'TOPIK cấp 3 trở lên' },
  'TOPIK 4급 이상': { ko: 'TOPIK 4급 이상', en: 'TOPIK Lv.4+', jp: 'TOPIK 4級以上', cn: 'TOPIK 4级以上', vn: 'TOPIK cấp 4 trở lên' },
  'TOPIK 5급 이상': { ko: 'TOPIK 5급 이상', en: 'TOPIK Lv.5+', jp: 'TOPIK 5級以上', cn: 'TOPIK 5级以上', vn: 'TOPIK cấp 5 trở lên' },
};

// 시급 숫자 포맷 자동 변환 (예: "시급 12,000원" -> "₩12,000 / hr")
export function formatWage(wage: string, lang: Lang): string {
  if (lang === 'ko') return wage;
  const numMatch = wage.replace(/,/g, '').match(/\d+/);
  if (!numMatch) return wage;
  const formattedNum = Number(numMatch[0]).toLocaleString();
  if (lang === 'en') return `₩${formattedNum} / hr`;
  if (lang === 'jp') return `時給 ${formattedNum}ウォン`;
  if (lang === 'cn') return `时薪 ${formattedNum}韩元`;
  if (lang === 'vn') return `${formattedNum} KRW / giờ`;
  return wage;
}

// 3. 사전 조회 + 신규 공고 실시간 번역(캐시 지원)
export async function translateText(text: string, lang: Lang): Promise<string> {
  if (!text || lang === 'ko') return text;
  if (PHRASE_DICT[text]?.[lang]) return PHRASE_DICT[text][lang];

  const cacheKey = `tr_${lang}_${text}`;
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(cacheKey);
    if (cached) return cached;
  }

  try {
    const target = LANG_PAIR_MAP[lang];
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=ko|${target}`
    );
    const json = await res.json();
    const translated = json?.responseData?.translatedText;
    if (translated && typeof translated === 'string') {
      if (typeof window !== 'undefined') {
        localStorage.setItem(cacheKey, translated);
      }
      return translated;
    }
  } catch {
    // 네트워크 오류 시 원문 유지
  }

  return text;
}