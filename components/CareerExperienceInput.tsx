'use client';

import React, { useState, useEffect } from 'react';
import { Plus, X, Calendar, Store, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const EXPERIENCE_ROLES = [
  '홀 서빙',
  '주방 보조/조리',
  '설거지/매장 청소',
  '카페/바리스타',
  '편의점/매장관리',
  '고객 응대/캐셔',
  '통역/번역',
  '외국어 튜터/강사',
  '사무/데이터 보조',
];

interface CareerItem {
  id: string;
  startMonth: string; // "2026-03"
  endMonth: string;   // "2026-10"
  isCurrent: boolean;
  placeName: string;
  roles: string[];
}

interface Props {
  value: string;
  onChange: (formattedText: string) => void;
}

function parseExperiences(raw: string): CareerItem[] {
  if (!raw || !raw.trim()) return [];
  return raw
    .split('\n')
    .map((line) => line.replace(/^\/\/+/, '').trim())
    .filter(Boolean)
    .map((line, idx) => {
      const match = line.match(
        /^(\d{4})[.-](\d{2})\s*~\s*(현재|\d{4}[.-]\d{2})\s+(.+)$/
      );
      if (match) {
        const startMonth = `${match[1]}-${match[2]}`;
        const isCurrent = match[3] === '현재';
        const endMonth = isCurrent ? '' : match[3].replace('.', '-');
        const rest = match[4];

        const roleMatch = rest.match(/^(.+?)\s*\(([^)]+)\)$/);
        if (roleMatch) {
          return {
            id: `${idx}-${Date.now()}`,
            startMonth,
            endMonth,
            isCurrent,
            placeName: roleMatch[1].trim(),
            roles: roleMatch[2].split(',').map((r) => r.trim()),
          };
        }
        return {
          id: `${idx}-${Date.now()}`,
          startMonth,
          endMonth,
          isCurrent,
          placeName: rest.trim(),
          roles: [],
        };
      }
      return {
        id: `${idx}-${Date.now()}`,
        startMonth: '2026-01',
        endMonth: '2026-02',
        isCurrent: false,
        placeName: line,
        roles: [],
      };
    });
}

function serializeExperiences(items: CareerItem[]): string {
  return items
    .map((item) => {
      const start = item.startMonth.replace('-', '.');
      const end = item.isCurrent
        ? '현재'
        : (item.endMonth || item.startMonth).replace('-', '.');
      const rolesText =
        item.roles.length > 0 ? ` (${item.roles.join(', ')})` : '';
      return `${start} ~ ${end} ${item.placeName}${rolesText}`;
    })
    .join('\n');
}

export default function CareerExperienceInput({ value, onChange }: Props) {
  const [items, setItems] = useState<CareerItem[]>(() =>
    parseExperiences(value)
  );
  const [placeName, setPlaceName] = useState('');
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [startMonth, setStartMonth] = useState('2026-01');
  const [endMonth, setEndMonth] = useState('2026-06');
  const [isCurrent, setIsCurrent] = useState(false);

  useEffect(() => {
    if (value && items.length === 0) {
      setItems(parseExperiences(value));
    }
  }, [value]);

  const toggleRole = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const handleAdd = () => {
    if (!placeName.trim() || !startMonth) return;

    const newItem: CareerItem = {
      id: `${Date.now()}`,
      startMonth,
      endMonth: isCurrent ? '' : endMonth || startMonth,
      isCurrent,
      placeName: placeName.trim(),
      roles: selectedRoles,
    };

    const nextItems = [...items, newItem];
    setItems(nextItems);
    onChange(serializeExperiences(nextItems));

    setPlaceName('');
    setSelectedRoles([]);
    setIsCurrent(false);
  };

  const handleRemove = (id: string) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
    onChange(serializeExperiences(nextItems));
  };

  return (
    <div className="space-y-4">
      {/* 등록된 경력 목록 */}
      {items.length > 0 && (
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 p-3 rounded-xl border bg-muted/40"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold text-muted-foreground">
                    {item.startMonth.replace('-', '.')} ~{' '}
                    {item.isCurrent
                      ? '현재'
                      : item.endMonth.replace('-', '.')}
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    {item.placeName}
                  </span>
                </div>
                {item.roles.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {item.roles.map((role) => (
                      <span
                        key={role}
                        className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-background border text-foreground"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => handleRemove(item.id)}
                className="p-1.5 text-muted-foreground hover:text-destructive rounded-lg transition-colors shrink-0"
                aria-label="경력 삭제"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 새 경력 입력 폼 */}
      <div className="p-4 rounded-xl border bg-background space-y-4">
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold flex items-center gap-1.5">
            <Store className="w-3.5 h-3.5" />
            알바처 이름
          </Label>
          <Input
            spellCheck={false}
            value={placeName}
            onChange={(e) => setPlaceName(e.target.value)}
            placeholder="예: 상하이 마라꼬치, GS25 편의점"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-semibold">
            알바 분야 (복수 선택 가능)
          </Label>
          <div className="flex flex-wrap gap-1.5">
            {EXPERIENCE_ROLES.map((role) => {
              const active = selectedRoles.includes(role);
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => toggleRole(role)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                    active
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-muted/40 text-muted-foreground border-border hover:bg-muted'
                  }`}
                >
                  {active && <Check className="w-3 h-3" />}
                  {role}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              시작 연·월
            </Label>
            <Input
              type="month"
              value={startMonth}
              onChange={(e) => setStartMonth(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold">종료 연·월</Label>
              <label className="inline-flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={isCurrent}
                  onChange={(e) => setIsCurrent(e.target.checked)}
                  className="rounded"
                />
                현재 근무 중
              </label>
            </div>
            <Input
              type="month"
              disabled={isCurrent}
              value={isCurrent ? '' : endMonth}
              onChange={(e) => setEndMonth(e.target.value)}
            />
          </div>
        </div>

        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={handleAdd}
          disabled={!placeName.trim()}
          className="w-full font-semibold gap-1"
        >
          <Plus className="w-4 h-4" />
          경력 추가하기
        </Button>
      </div>
    </div>
  );
}