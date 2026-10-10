import { ImageResponse } from 'next/og';
import { site } from '@/lib/site';
import { WOLF_EYES, WOLF_NOSE, WOLF_OUTLINE } from '@/lib/brand';

export const alt = 'Arkar — Software Studio. From first lead to repeat customer — one system.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Try to load a Poppins weight from Google Fonts (subset to `text`); fall back to the default font if offline. */
async function loadPoppins(weight: 500 | 800, text: string): Promise<ArrayBuffer | null> {
  try {
    // No browser User-Agent on purpose: Google then serves TTF, which the OG renderer can use (it cannot read woff2).
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=Poppins:wght@${weight}&text=${encodeURIComponent(text)}`)
    ).text();
    const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
    if (!match) return null;
    const res = await fetch(match[1]);
    return res.ok ? res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpenGraphImage() {
  const headline = 'From first lead to repeat customer. One system.';
  const subline = 'Website, bookings, customer records and automatic follow-ups — in one place.';
  const [bold, medium] = await Promise.all([
    loadPoppins(800, `Arkar.${headline}SOFTWARE STUDIO`),
    loadPoppins(500, `${subline}${site.domain}`),
  ]);
  const fonts = [
    bold && { name: 'Poppins', data: bold, weight: 800 as const, style: 'normal' as const },
    medium && { name: 'Poppins', data: medium, weight: 500 as const, style: 'normal' as const },
  ].filter((f): f is NonNullable<typeof f> => Boolean(f));

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: '#F0EDE8',
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(15,15,15,0.08) 1.5px, transparent 2px)',
          backgroundSize: '28px 28px',
          fontFamily: 'Poppins, sans-serif',
          color: '#0F0F0F',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: -220,
            top: -260,
            width: 720,
            height: 720,
            borderRadius: 9999,
            border: '2px solid rgba(232,96,44,0.18)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: -120,
            top: -160,
            width: 520,
            height: 520,
            borderRadius: 9999,
            border: '2px solid rgba(232,96,44,0.18)',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 56, fontWeight: 800, letterSpacing: -3 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 72,
                height: 72,
                borderRadius: 20,
                background: '#E8602C',
              }}
            >
              <svg width="54" height="54" viewBox="0 0 100 100">
                <path d={WOLF_OUTLINE} fill="#FFFFFF" />
                <path d={WOLF_EYES} fill="#E8602C" />
                <path d={WOLF_NOSE} fill="#E8602C" />
              </svg>
            </div>
            <div style={{ display: 'flex' }}>
              Arkar<span style={{ color: '#E8602C' }}>.</span>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              background: '#E8602C',
              color: '#fff',
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: 3,
              padding: '10px 22px',
              borderRadius: 9999,
            }}
          >
            SOFTWARE STUDIO
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: 78, fontWeight: 800, letterSpacing: -4, lineHeight: 1.02, maxWidth: 1000 }}>
            <span>From first lead to&nbsp;</span>
            <span style={{ color: '#E8602C' }}>repeat customer.</span>
            <span style={{ background: '#F8C9AE', padding: '0 12px', borderRadius: 8 }}>One system.</span>
          </div>
          <div style={{ display: 'flex', marginTop: 28, fontSize: 26, color: '#464442', fontWeight: 500 }}>{subline}</div>
        </div>

        <div style={{ display: 'flex', fontSize: 22, color: '#8C8A86', fontWeight: 500 }}>{site.domain}</div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length ? fonts : undefined,
    },
  );
}
