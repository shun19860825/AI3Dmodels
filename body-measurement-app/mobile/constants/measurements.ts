import { MeasurementMeta } from '../types';

export const MEASUREMENT_META: MeasurementMeta[] = [
  { key: 'height',        name_ja: '身長',           unit: 'cm', category: 'basic',  description: '頭のてっぺんからかかとまで' },
  { key: 'weight',        name_ja: '体重',            unit: 'kg', category: 'basic',  description: '体重' },
  { key: 'foot_size',     name_ja: '足のサイズ',      unit: 'cm', category: 'basic',  description: '足の実寸サイズ' },
  { key: 'shoulder_width',name_ja: '肩幅',            unit: 'cm', category: 'upper',  description: '肩先から肩先までの直線距離' },
  { key: 'back_width',    name_ja: '背巾',            unit: 'cm', category: 'upper',  description: '肩甲骨を通って腕の付け根から腕の付け根まで' },
  { key: 'bust',          name_ja: 'バスト',          unit: 'cm', category: 'upper',  description: '一番高いところを水平に一周' },
  { key: 'under_bust',    name_ja: 'アンダーバスト',  unit: 'cm', category: 'upper',  description: '胸の真下を水平に一周' },
  { key: 'waist',         name_ja: 'ウエスト',        unit: 'cm', category: 'upper',  description: '腰の一番細いところを水平に一周' },
  { key: 'back_length',   name_ja: '背丈',            unit: 'cm', category: 'upper',  description: '首後ろの骨からウエストまで' },
  { key: 'total_length',  name_ja: '総丈',            unit: 'cm', category: 'upper',  description: '首後ろの骨から裾まで' },
  { key: 'neck',          name_ja: '首回り',          unit: 'cm', category: 'upper',  description: '首と体の付け根を一周' },
  { key: 'armhole',       name_ja: 'アームホール',    unit: 'cm', category: 'upper',  description: '腕の付け根（肩を通って一周）' },
  { key: 'hip',           name_ja: 'ヒップ',          unit: 'cm', category: 'lower',  description: 'お尻の一番高いところを水平に一周' },
  { key: 'thigh',         name_ja: '太もも',          unit: 'cm', category: 'lower',  description: '太ももの最も太い部分を一周' },
  { key: 'knee',          name_ja: 'ひざ周り',        unit: 'cm', category: 'lower',  description: 'ひざを一周' },
  { key: 'inseam',        name_ja: '股下',            unit: 'cm', category: 'lower',  description: '足の付け根から裾まで' },
  { key: 'skirt_length',  name_ja: 'スカート丈',      unit: 'cm', category: 'lower',  description: 'スカート上端から裾まで' },
  { key: 'crotch_depth',  name_ja: 'PP',              unit: 'cm', category: 'lower',  description: '前ウエスト→股下→後ろウエスト' },
  { key: 'sleeve_length', name_ja: '袖丈',            unit: 'cm', category: 'arm',    description: '肩先から肘を通って袖口まで' },
  { key: 'upper_arm',     name_ja: '二の腕周り',      unit: 'cm', category: 'arm',    description: '二の腕の最も太い部分を一周' },
  { key: 'wrist',         name_ja: '手首周り',        unit: 'cm', category: 'arm',    description: '手首を一周' },
];

export const CATEGORY_LABELS: Record<string, string> = {
  basic: '基本情報',
  upper: '上半身',
  lower: '下半身',
  arm:   '腕',
};

export const CONFIDENCE_LABELS: Record<string, string> = {
  high:   '高精度',
  medium: '中精度',
  low:    '推定値',
  manual: '入力値',
};

export const CONFIDENCE_COLORS: Record<string, string> = {
  high:   '#22c55e',
  medium: '#f59e0b',
  low:    '#ef4444',
  manual: '#6366f1',
};
