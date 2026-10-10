import { ImageResponse } from 'next/og';
import { WOLF_EYES, WOLF_NOSE, WOLF_OUTLINE } from '@/lib/brand';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#E8602C',
        }}
      >
        <svg width="132" height="132" viewBox="0 0 100 100">
          <path d={WOLF_OUTLINE} fill="#FFFFFF" />
          <path d={WOLF_EYES} fill="#E8602C" />
          <path d={WOLF_NOSE} fill="#E8602C" />
        </svg>
      </div>
    ),
    size,
  );
}
