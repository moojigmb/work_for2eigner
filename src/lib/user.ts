export interface UserProfile {
  name: string;
  nationality: string;
  bio: string;
  topik: {
    level: string;
    status: string;
  };
  toeic: {
    score: string;
    status: string;
  };
  careers: { period: string; description: string }[];
  skills: string[];
}

// 가상 인물 1: 아시타 티무르치-이
export const PERSONA_ASHITA: UserProfile = {
  name: '홍길동1',
  nationality: '일본',
  bio: '안녕하세요! 새로운 도전을 좋아하는\n열정적인 사람입니다.',
  topik: { level: '4급', status: '취득완료' },
  toeic: { score: '미응시', status: '미신청' },
  careers: [
    { period: '2023.03 - 2024.02', description: '카페 아르바이트 (홍대점)' },
    { period: '2024.06 - 2024.08', description: '편의점 아르바이트 (서강대점)' },
    { period: '2024.09 - 현재', description: '개인 프로젝트 (웹 개발)' },
  ],
  skills: [
    '프로그래밍 (Java, Python, JavaScript)',
    '웹 개발 (React, Node.js)',
    '디자인 툴 (Figma)',
    '소통 능력, 책임감',
  ],
};

// 가상 인물 2: 김머직
export const PERSONA_KIM: UserProfile = {
  name: '김머직',
  nationality: '우즈베키스탄',
  bio: '안녕하세요! 새로운 도전을 좋아하는\n서강대학교 컴퓨터공학과 학생입니다.',
  topik: { level: '6급 (273점)', status: '취득완료' },
  toeic: { score: '미응시', status: '미신청' },
  careers: [
    { period: '2023.09 - 2024.02', description: '서강 어학원 보조 강사' },
    { period: '2024.03 - 현재', description: '교내 소프트웨어 연구실 인턴' },
  ],
  skills: [
    '프로그래밍 (C++, Python, TypeScript)',
    '웹 풀스택 (Next.js, Supabase)',
    '한국어 고급 통번역',
  ],
};

// ★ 현재 화면에 띄울 동일인물 (PERSONA_ASHITA 또는 PERSONA_KIM 선택)
export const CURRENT_USER: UserProfile = PERSONA_ASHITA;