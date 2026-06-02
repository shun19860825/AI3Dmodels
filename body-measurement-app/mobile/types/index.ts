export type Confidence = 'high' | 'medium' | 'low' | 'manual';

export interface Measurement {
  key: string;
  name_ja: string;
  value: number | null;
  unit: string;
  confidence: Confidence;
  note?: string | null;
}

export interface MeasurementResponse {
  measurements: Measurement[];
  has_side_view: boolean;
  processing_time_ms: number;
}

export interface UserInput {
  height: string;
  weight: string;
  footSize: string;
  gender: 'female' | 'male' | 'unknown';
}

export interface PhotoState {
  frontUri: string | null;
  sideUri: string | null;
}

export type MeasurementCategory = 'basic' | 'upper' | 'lower' | 'arm';

export interface MeasurementMeta {
  key: string;
  name_ja: string;
  unit: string;
  category: MeasurementCategory;
  description: string;
}
