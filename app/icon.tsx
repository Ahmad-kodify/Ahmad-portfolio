import { ImageResponse } from 'next/og';
import { WOLF_EYES, WOLF_NOSE, WOLF_OUTLINE } from '@/lib/brand';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

/** Favicon: white wolf on a terracotta tile (eyes/nose painted back in terracotta). */
export default function Icon() {
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
          borderRadius: 16,
        }}
      >
        <svg width="50" height="50" viewBox="0 0 100 100">
          <path d={WOLF_OUTLINE} fill="#FFFFFF" />
          <path d={WOLF_EYES} fill="#E8602C" />
          <path d={WOLF_NOSE} fill="#E8602C" />
        </svg>
      </div>
    ),
    size,
  );
}
