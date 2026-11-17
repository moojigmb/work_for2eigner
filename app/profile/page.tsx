'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  User,
  Globe,
  FileText,
  Briefcase,
  Pencil,
  Save,
  Loader2,
  CheckCircle2,
  Building2,
  Trash2,
  Calendar,
} from 'lucide-react';
import { supabase } from '@/src/lib/supabase';
import CareerExperienceInput from '@/components/CareerExperienceInput';
import { useLanguage, Lang } from '@/src/LanguageContext';
import { translateText, formatWage } from '@/src/lib/jobTranslator';
import { Button, buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface AppliedJob {
  id: number;
  status: string;
  created_at: string;
  jobs: {
    id: number;
    company_name: string;
    title: string;
    hourly_wage: string;
    location: string;
  } | null;
}

const PROFILE_UI_TEXT: Record<
  Lang,
  {
    title: string;
    subtitle: string;
    savedDb: string;
    saveAllBtn: string;
    nameLabel: string;
    namePlaceholder: string;
    birthDateLabel: string;
    nationalityLabel: string;
    bioLabel: string;
    bioPlaceholder: string;
    topikLabel: string;
    toeicLabel: string;
    toeicPlaceholder: string;
    careerSkillsTitle: string;
    careerLabel: string;
    skillsLabel: string;
    skillsPlaceholder: string;
    resumeTitle: string;
    resumeBadgeComplete: string;
    resumeBadgeEmpty: string;
    resumeDesc: string;
    resumeEditBtn: string;
    resumeCreateBtn: string;
    resumeModalTitle: string;
    resumePlaceholder: string;
    saveToDb: string;
    saving: string;
    coverLetterTitle: string;
    coverLetterDesc: string;
    coverLetterEditBtn: string;
    coverLetterCreateBtn: string;
    coverLetterModalTitle: string;
    coverLetterPlaceholder: string;
    appliedHistoryTitle: string;
    noAppliedJobs: string;
    cancelBtn: string;
    confirmCancel: string;
  }
> = {
  ko: {
    title: '내 프로필 및 스펙 관리',
    subtitle: '등록한 정보는 계정에 자동 저장되며, 다음 로그인 시에도 그대로 불러옵니다.',
    savedDb: 'DB에 저장 완료!',
    saveAllBtn: '내 정보 전체 저장하기',
    nameLabel: '이름 (닉네임)',
    namePlaceholder: '이름을 입력하세요',
    birthDateLabel: '생년월일 (나이 계산용)',
    nationalityLabel: '국적',
    bioLabel: '한 줄 소개',
    bioPlaceholder: '예: 성실하게 근무하는 유학생입니다. 주 3일 오후 근무 가능합니다!',
    topikLabel: '한국어능력 (TOPIK)',
    toeicLabel: '영어 능력 (TOEIC)',
    toeicPlaceholder: '예: 850점 또는 미응시',
    careerSkillsTitle: '경력 및 보유 기술',
    careerLabel: '경력 사항',
    skillsLabel: '보유 기술 / 특기 (쉼표로 구분)',
    skillsPlaceholder: '예: 한국어 회화, 영어 응대, 포스기 결제, 엑셀, 바리스타 기초',
    resumeTitle: '이력서 작성',
    resumeBadgeComplete: '작성 완료',
    resumeBadgeEmpty: '미작성',
    resumeDesc: '지금까지의 학력, 비자 종류, 희망 근무 조건을 작성해 보세요.',
    resumeEditBtn: '이력서 수정하기',
    resumeCreateBtn: '이력서 작성하기',
    resumeModalTitle: '이력서 작성',
    resumePlaceholder: '대학교/전공, 체류 비자(D-2, D-4 등), 희망 근무 요일 및 시간을 작성해 주세요.',
    saveToDb: 'DB에 저장하기',
    saving: '저장 중...',
    coverLetterTitle: '자기소개서 작성',
    coverLetterDesc: '나만의 성실함과 한국어 강점을 담아 자기소개서를 작성해 보세요.',
    coverLetterEditBtn: '자기소개서 수정하기',
    coverLetterCreateBtn: '자기소개서 작성하기',
    coverLetterModalTitle: '자기소개서 작성',
    coverLetterPlaceholder: '지원 동기, 성격의 장점, 아르바이트 경험을 자유롭게 작성해 주세요.',
    appliedHistoryTitle: '내 알바 지원 내역',
    noAppliedJobs: '아직 지원한 공고가 없습니다. 채용정보 메뉴에서 원하는 알바에 간편 지원해 보세요!',
    cancelBtn: '취소',
    confirmCancel: '이 공고의 지원을 취소하시겠습니까?',
  },
  en: {
    title: 'Profile & Spec Management',
    subtitle: 'Your information is automatically saved to your account and loaded upon your next login.',
    savedDb: 'Saved to DB!',
    saveAllBtn: 'Save All Info',
    nameLabel: 'Name (Nickname)',
    namePlaceholder: 'Enter your name',
    birthDateLabel: 'Birth Date',
    nationalityLabel: 'Nationality',
    bioLabel: 'One-line Bio',
    bioPlaceholder: 'e.g., Diligent international student available 3 afternoons a week!',
    topikLabel: 'Korean Proficiency (TOPIK)',
    toeicLabel: 'English Proficiency (TOEIC)',
    toeicPlaceholder: 'e.g., 850 or N/A',
    careerSkillsTitle: 'Career & Skills',
    careerLabel: 'Work Experience',
    skillsLabel: 'Skills / Specialties (Comma-separated)',
    skillsPlaceholder: 'e.g., Korean conversation, English support, POS, Excel, Barista basics',
    resumeTitle: 'Resume',
    resumeBadgeComplete: 'Completed',
    resumeBadgeEmpty: 'Not Written',
    resumeDesc: 'Write your education, visa type, and preferred working conditions.',
    resumeEditBtn: 'Edit Resume',
    resumeCreateBtn: 'Create Resume',
    resumeModalTitle: 'Write Resume',
    resumePlaceholder: 'University/Major, Visa (D-2, D-4, etc.), preferred working days and hours.',
    saveToDb: 'Save to DB',
    saving: 'Saving...',
    coverLetterTitle: 'Cover Letter',
    coverLetterDesc: 'Write your cover letter highlighting your diligence and Korean skills.',
    coverLetterEditBtn: 'Edit Cover Letter',
    coverLetterCreateBtn: 'Create Cover Letter',
    coverLetterModalTitle: 'Write Cover Letter',
    coverLetterPlaceholder: 'Motivation, strengths, and part-time work experience.',
    appliedHistoryTitle: 'My Job Applications',
    noAppliedJobs: 'You have not applied to any jobs yet. Check out the job listings!',
    cancelBtn: 'Cancel',
    confirmCancel: 'Are you sure you want to cancel this application?',
  },
  jp: {
    title: 'プロフィール及びスペック管理',
    subtitle: '登録した情報はアカウントに自動保存され、次回ログイン時にもそのまま読み込まれます。',
    savedDb: 'DB保存完了！',
    saveAllBtn: 'マイ情報全体を保存',
    nameLabel: '名前 (ニックネーム)',
    namePlaceholder: '名前を入力してください',
    birthDateLabel: '生年月日',
    nationalityLabel: '国籍',
    bioLabel: '一言紹介',
    bioPlaceholder: '例：誠実に勤務する留学生です。週3日の午後勤務が可能です！',
    topikLabel: '韓国語能力 (TOPIK)',
    toeicLabel: '英語能力 (TOEIC)',
    toeicPlaceholder: '例：850点または未受験',
    careerSkillsTitle: '経歴および保有スキル',
    careerLabel: '経歴事項',
    skillsLabel: '保有スキル / 特技 (カンマ区切り)',
    skillsPlaceholder: '例：韓国語会話、英語対応、POSレジ、Excel、バリスタ基礎',
    resumeTitle: '履歴書作成',
    resumeBadgeComplete: '作成完了',
    resumeBadgeEmpty: '未作成',
    resumeDesc: '学歴、ビザの種類、希望する勤務条件を作成してみてください。',
    resumeEditBtn: '履歴書を修正',
    resumeCreateBtn: '履歴書を作成',
    resumeModalTitle: '履歴書作成',
    resumePlaceholder: '大学/専攻、滞在ビザ(D-2、D-4など)、希望する勤務曜日と時間を記入してください。',
    saveToDb: 'DBに保存',
    saving: '保存中...',
    coverLetterTitle: '自己紹介書作成',
    coverLetterDesc: '自分自身の誠実さと韓国語の強みを込めて自己紹介書を作成してみましょう。',
    coverLetterEditBtn: '自己紹介書を修正',
    coverLetterCreateBtn: '自己紹介書を作成',
    coverLetterModalTitle: '自己紹介書作成',
    coverLetterPlaceholder: '志望動機、性格の長所、アルバイト経験を自由に書いてください。',
    appliedHistoryTitle: '応募済みアルバイト履歴',
    noAppliedJobs: 'まだ応募した求人がありません。求人情報メニューから簡単に応募してみましょう！',
    cancelBtn: 'キャンセル',
    confirmCancel: 'この求人への応募をキャンセルしますか？',
  },
  cn: {
    title: '个人资料及履历管理',
    subtitle: '输入的信息将自动保存至账户，下次登录时将自动加载。',
    savedDb: '已保存至数据库！',
    saveAllBtn: '保存全部信息',
    nameLabel: '姓名 (昵称)',
    namePlaceholder: '请输入您的姓名',
    birthDateLabel: '出生日期',
    nationalityLabel: '国籍',
    bioLabel: '一句话简介',
    bioPlaceholder: '例：认真负责的留学生，每周可工作3个下午！',
    topikLabel: '韩语能力 (TOPIK)',
    toeicLabel: '英语能力 (TOEIC)',
    toeicPlaceholder: '例：850分 或 未参考',
    careerSkillsTitle: '工作经历与拥有技能',
    careerLabel: '经历事项',
    skillsLabel: '拥有技能 / 特长 (用逗号分隔)',
    skillsPlaceholder: '例：韩语会话, 英语接待, 收银机, Excel, 咖啡师基础',
    resumeTitle: '撰写简历',
    resumeBadgeComplete: '已完成',
    resumeBadgeEmpty: '未填写',
    resumeDesc: '填写您的学历、签证类型及期望的工作条件。',
    resumeEditBtn: '修改简历',
    resumeCreateBtn: '撰写简历',
    resumeModalTitle: '撰写简历',
    resumePlaceholder: '请填写大学/专业、签证类型(D-2, D-4等)、期望工作日及时间。',
    saveToDb: '保存至数据库',
    saving: '保存中...',
    coverLetterTitle: '撰写自我介绍书',
    coverLetterDesc: '写出您的诚实品质与韩语优势，制作您的自我介绍书。',
    coverLetterEditBtn: '修改自我介绍书',
    coverLetterCreateBtn: '撰写自我介绍书',
    coverLetterModalTitle: '撰写自我介绍书',
    coverLetterPlaceholder: '请自由填写申请动机、性格优点及兼职经验。',
    appliedHistoryTitle: '我的兼职应聘记录',
    noAppliedJobs: '暂无应聘记录。请在招聘信息菜单中轻松应聘心仪的兼职！',
    cancelBtn: '取消',
    confirmCancel: '确定要取消该职位的应聘吗？',
  },
  vn: {
    title: 'Quản lý hồ sơ & Năng lực',
    subtitle: 'Thông tin đã nhập được tự động lưu vào tài khoản và tải lại khi bạn đăng nhập lần sau.',
    savedDb: 'Đã lưu vào DB!',
    saveAllBtn: 'Lưu toàn bộ thông tin',
    nameLabel: 'Họ tên (Biệt danh)',
    namePlaceholder: 'Nhập tên của bạn',
    birthDateLabel: 'Ngày sinh',
    nationalityLabel: 'Quốc tịch',
    bioLabel: 'Giới thiệu ngắn',
    bioPlaceholder: 'VD: Du học sinh chăm chỉ, có thể làm việc 3 buổi chiều mỗi tuần!',
    topikLabel: 'Năng lực tiếng Hàn (TOPIK)',
    toeicLabel: 'Năng lực tiếng Anh (TOEIC)',
    toeicPlaceholder: 'VD: 850 điểm hoặc Chưa thi',
    careerSkillsTitle: 'Kinh nghiệm & Kỹ năng',
    careerLabel: 'Quá trình làm việc',
    skillsLabel: 'Kỹ năng / Sở trường (Phân cách bằng dấu phẩy)',
    skillsPlaceholder: 'VD: Giao tiếp tiếng Hàn, Tiếng Anh, Máy POS, Excel, Pha chế cơ bản',
    resumeTitle: 'Viết sơ yếu lý lịch',
    resumeBadgeComplete: 'Đã hoàn thành',
    resumeBadgeEmpty: 'Chưa viết',
    resumeDesc: 'Viết về học vấn, loại visa và điều kiện làm việc mong muốn của bạn.',
    resumeEditBtn: 'Chỉnh sửa lý lịch',
    resumeCreateBtn: 'Tạo lý lịch',
    resumeModalTitle: 'Viết sơ yếu lý lịch',
    resumePlaceholder: 'Trường/Chuyên ngành, loại Visa (D-2, D-4...), ngày giờ làm việc mong muốn.',
    saveToDb: 'Lưu vào DB',
    saving: 'Đang lưu...',
    coverLetterTitle: 'Viết thư giới thiệu',
    coverLetterDesc: 'Thể hiện sự chăm chỉ và thế mạnh tiếng Hàn của bạn trong thư giới thiệu.',
    coverLetterEditBtn: 'Chỉnh sửa thư giới thiệu',
    coverLetterCreateBtn: 'Tạo thư giới thiệu',
    coverLetterModalTitle: 'Viết thư giới thiệu',
    coverLetterPlaceholder: 'Lý do ứng tuyển, điểm mạnh, kinh nghiệm làm việc bán thời gian.',
    appliedHistoryTitle: 'Lịch sử ứng tuyển việc làm',
    noAppliedJobs: 'Bạn chưa ứng tuyển công việc nào. Hãy khám phá các mục việc làm!',
    cancelBtn: 'Hủy',
    confirmCancel: 'Bạn có chắc muốn hủy ứng tuyển công việc này không?',
  },
};

export default function ProfilePage() {
  const router = useRouter();
  const { lang } = useLanguage();
  const t = PROFILE_UI_TEXT[lang] || PROFILE_UI_TEXT.ko;

  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState(''); // 생년월일(나이 계산용) 상태 추가
  const [nationality, setNationality] = useState('우즈베키스탄');
  const [bio, setBio] = useState('');
  const [topikLevel, setTopikLevel] = useState('TOPIK 4급');
  const [toeicScore, setToeicScore] = useState('미응시');
  const [experiences, setExperiences] = useState('');
  const [skills, setSkills] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [coverLetterText, setCoverLetterText] = useState('');
  const [appliedJobs, setAppliedJobs] = useState<AppliedJob[]>([]);

  const [translatedCache, setTranslatedCache] = useState<Record<string, string>>({});

  useEffect(() => {
    async function loadUserProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace('/login');
        return;
      }

      setUserId(user.id);

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profile) {
        setFullName(profile.full_name || user.user_metadata?.full_name || '');
        setBirthDate(profile.birth_date || ''); // DB에서 생년월일 불러오기
        setNationality(
          profile.nationality ||
            user.user_metadata?.nationality ||
            '우즈베키스탄'
        );
        setBio(profile.bio || '');
        setTopikLevel(profile.topik_level || '미응시');
        setToeicScore(profile.toeic_score || '미응시');
        setExperiences(profile.experiences || '');
        setSkills(profile.skills || '');
        setResumeText(profile.resume_text || '');
        setCoverLetterText(profile.cover_letter_text || '');
      } else {
        setFullName(user.user_metadata?.full_name || '');
        setNationality(user.user_metadata?.nationality || '우즈베키스탄');
      }

      const { data: apps } = await supabase
        .from('applications')
        .select(
          'id, status, created_at, jobs(id, company_name, title, hourly_wage, location)'
        )
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (apps) {
        setAppliedJobs(apps as unknown as AppliedJob[]);
      }

      setLoading(false);
    }

    loadUserProfile();
  }, [router]);

  useEffect(() => {
    async function translateDynamicFields() {
      if (lang === 'ko' || appliedJobs.length === 0) return;
      const newCache: Record<string, string> = {};
      for (const app of appliedJobs) {
        if (app.jobs) {
          if (!newCache[app.jobs.company_name]) {
            newCache[app.jobs.company_name] = await translateText(app.jobs.company_name, lang);
          }
          if (!newCache[app.jobs.title]) {
            newCache[app.jobs.title] = await translateText(app.jobs.title, lang);
          }
          if (!newCache[app.jobs.location]) {
            newCache[app.jobs.location] = await translateText(app.jobs.location, lang);
          }
        }
      }
      setTranslatedCache(newCache);
    }
    translateDynamicFields();
  }, [lang, appliedJobs]);

  const tr = (text: string) => (lang === 'ko' ? text : translatedCache[text] || text);

  const handleSaveProfile = async () => {
    if (!userId) return;
    setSaving(true);
    setSavedNotice(false);

    const { error } = await supabase.from('profiles').upsert({
      id: userId,
      full_name: fullName,
      birth_date: birthDate || null, // DB에 생년월일 저장
      nationality,
      bio,
      topik_level: topikLevel,
      toeic_score: toeicScore,
      experiences,
      skills,
      resume_text: resumeText,
      cover_letter_text: coverLetterText,
      updated_at: new Date().toISOString(),
    });

    setSaving(false);

    if (error) {
      alert(`저장 중 오류가 발생했습니다: ${error.message}`);
      return;
    }

    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleCancelApplication = async (applicationId: number) => {
    if (!confirm(t.confirmCancel)) return;

    const { error } = await supabase
      .from('applications')
      .delete()
      .eq('id', applicationId);

    if (error) {
      alert(`지원 취소 중 오류가 발생했습니다: ${error.message}`);
      return;
    }

    setAppliedJobs((prev) => prev.filter((item) => item.id !== applicationId));
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-sm text-muted-foreground gap-2">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>내 프로필 정보를 확인하는 중입니다...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {t.title}
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            {t.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {savedNotice && (
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              {t.savedDb}
            </span>
          )}
          <Button
            onClick={handleSaveProfile}
            disabled={saving}
            className="gap-2"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{t.saveAllBtn}</span>
          </Button>
        </div>
      </div>

      {/* 1행: 기본 프로필 (이름, 생년월일, 국적, 한줄소개) & 어학 성적 */}
      <Card>
        <CardContent className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 flex flex-col sm:flex-row items-start gap-5">
            <Avatar className="w-20 h-20 border border-border shrink-0">
              <AvatarFallback className="bg-muted">
                <User className="w-10 h-10 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 w-full space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs">{t.nameLabel}</Label>
                  <Input
                    spellCheck={false}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t.namePlaceholder}
                  />
                </div>
                {/* 생년월일 입력 필드 추가 */}
                <div className="space-y-1.5">
                  <Label className="text-xs flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {t.birthDateLabel}
                  </Label>
                  <Input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs flex items-center gap-1">
                    <Globe className="w-3 h-3" /> {t.nationalityLabel}
                  </Label>
                  <Select
                    value={nationality}
                    onValueChange={(val) => val && setNationality(val)}
                  >
                    <SelectTrigger>
                      <SelectValue />
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
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs">{t.bioLabel}</Label>
                <Input
                  spellCheck={false}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder={t.bioPlaceholder}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:border-l lg:border-border lg:pl-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                {t.topikLabel}
              </Label>
              <Select
                value={topikLevel}
                onValueChange={(val) => val && setTopikLevel(val)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="미응시">미응시</SelectItem>
                  <SelectItem value="TOPIK 1급">TOPIK 1급</SelectItem>
                  <SelectItem value="TOPIK 2급">TOPIK 2급</SelectItem>
                  <SelectItem value="TOPIK 3급">TOPIK 3급</SelectItem>
                  <SelectItem value="TOPIK 4급">TOPIK 4급</SelectItem>
                  <SelectItem value="TOPIK 5급">TOPIK 5급</SelectItem>
                  <SelectItem value="TOPIK 6급">TOPIK 6급</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                {t.toeicLabel}
              </Label>
              <Input
                spellCheck={false}
                value={toeicScore}
                onChange={(e) => setToeicScore(e.target.value)}
                placeholder={t.toeicPlaceholder}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2행: 경력 및 보유 기술 */}
      <Card>
        <CardHeader className="pb-3 border-b border-border">
          <CardTitle className="text-sm flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-muted-foreground" />
            <span>{t.careerSkillsTitle}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label className="text-xs font-bold">{t.careerLabel}</Label>
            <CareerExperienceInput
              value={experiences}
              onChange={(val) => setExperiences(val)}
            />
          </div>

          <div className="space-y-2 pt-2 border-t border-border">
            <Label className="text-xs font-bold">
              {t.skillsLabel}
            </Label>
            <Textarea
              rows={3}
              spellCheck={false}
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder={t.skillsPlaceholder}
            />
          </div>
        </CardContent>
      </Card>

      {/* 3행: 이력서 및 자기소개서 작성 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="w-5 h-5" />
                <span>{t.resumeTitle}</span>
              </CardTitle>
              <Badge variant={resumeText ? 'default' : 'outline'}>
                {resumeText ? t.resumeBadgeComplete : t.resumeBadgeEmpty}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground pt-1 line-clamp-2">
              {resumeText || t.resumeDesc}
            </p>
          </CardHeader>
          <CardContent>
            <Dialog>
              <DialogTrigger
                className={cn(
                  buttonVariants({ variant: 'default' }),
                  'w-full gap-1.5'
                )}
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>
                  {resumeText ? t.resumeEditBtn : t.resumeCreateBtn}
                </span>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>{t.resumeModalTitle}</DialogTitle>
                </DialogHeader>
                <Textarea
                  rows={8}
                  spellCheck={false}
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder={t.resumePlaceholder}
                />
                <div className="flex justify-end">
                  <Button onClick={handleSaveProfile} disabled={saving}>
                    {saving ? t.saving : t.saveToDb}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <Card className="flex flex-col justify-between">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="w-5 h-5" />
                <span>{t.coverLetterTitle}</span>
              </CardTitle>
              <Badge variant={coverLetterText ? 'default' : 'outline'}>
                {coverLetterText ? t.resumeBadgeComplete : t.resumeBadgeEmpty}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground pt-1 line-clamp-2">
              {coverLetterText || t.coverLetterDesc}
            </p>
          </CardHeader>
          <CardContent>
            <Dialog>
              <DialogTrigger
                className={cn(
                  buttonVariants({ variant: 'default' }),
                  'w-full gap-1.5'
                )}
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>
                  {coverLetterText
                    ? t.coverLetterEditBtn
                    : t.coverLetterCreateBtn}
                </span>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>{t.coverLetterModalTitle}</DialogTitle>
                </DialogHeader>
                <Textarea
                  rows={8}
                  spellCheck={false}
                  value={coverLetterText}
                  onChange={(e) => setCoverLetterText(e.target.value)}
                  placeholder={t.coverLetterPlaceholder}
                />
                <div className="flex justify-end">
                  <Button onClick={handleSaveProfile} disabled={saving}>
                    {saving ? t.saving : t.saveToDb}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>

      {/* 4행: 내 알바 지원 내역 */}
      <Card>
        <CardHeader className="pb-3 border-b border-border">
          <CardTitle className="text-sm flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-muted-foreground" />
              <span>{t.appliedHistoryTitle}</span>
            </span>
            <Badge variant="secondary">{appliedJobs.length}건</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {appliedJobs.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-4">
              {t.noAppliedJobs}
            </p>
          ) : (
            <div className="space-y-3">
              {appliedJobs.map((app) => (
                <div
                  key={app.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-xl border border-border bg-muted/30"
                >
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {tr(app.jobs?.company_name || '')} · {tr(app.jobs?.location || '')}
                    </p>
                    <p className="text-sm font-bold mt-0.5">
                      {tr(app.jobs?.title || '')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      {formatWage(app.jobs?.hourly_wage || '', lang)}
                    </Badge>
                    <Badge variant="default">{app.status}</Badge>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCancelApplication(app.id)}
                      className="h-7 px-2 text-xs text-destructive hover:text-destructive hover:bg-destructive/10 gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{t.cancelBtn}</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}