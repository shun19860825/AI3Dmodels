import { MeasurementResponse } from '../types';

const BASE_URL = 'https://backend-XXXX.onrender.com';

export interface EstimateParams {
  frontImageUri: string;
  sideImageUri?: string | null;
  heightCm: number;
  weightKg?: number | null;
  gender?: string;
  footSizeCm?: number | null;
}

export async function estimateMeasurements(
  params: EstimateParams,
): Promise<MeasurementResponse> {
  const form = new FormData();

  form.append('front_image', {
    uri: params.frontImageUri,
    type: 'image/jpeg',
    name: 'front.jpg',
  } as unknown as Blob);

  if (params.sideImageUri) {
    form.append('side_image', {
      uri: params.sideImageUri,
      type: 'image/jpeg',
      name: 'side.jpg',
    } as unknown as Blob);
  }

  form.append('height_cm', String(params.heightCm));
  if (params.weightKg != null) form.append('weight_kg', String(params.weightKg));
  form.append('gender', params.gender ?? 'unknown');
  if (params.footSizeCm != null) form.append('foot_size_cm', String(params.footSizeCm));

  const res = await fetch(`${BASE_URL}/api/v1/measurements/estimate`, {
    method: 'POST',
    body: form,
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { detail?: { message?: string } })?.detail?.message ??
        `サーバーエラー (${res.status})`,
    );
  }

  return res.json() as Promise<MeasurementResponse>;
}
