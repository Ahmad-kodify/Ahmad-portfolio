import type { ServiceId } from '@/lib/services';

/**
 * Soft 3D-style icons, one per service. Two fills give depth:
 * terracotta-deep offset underneath, terracotta on top, ink line-work.
 */
export function ServiceIcon({ id, className = 'h-8 w-8' }: { id: ServiceId; className?: string }) {
  const common = {
    viewBox: '0 0 48 48',
    fill: 'none',
    className,
    'aria-hidden': true as const,
  };

  switch (id) {
    case 'websites':
      return (
        <svg {...common}>
          <rect x="7" y="11" width="34" height="26" rx="5" fill="#CF4F1E" />
          <rect x="6" y="9" width="34" height="26" rx="5" fill="#fff" stroke="#0F0F0F" strokeWidth="2" />
          <path d="M6 17h34" stroke="#0F0F0F" strokeWidth="2" />
          <circle cx="11.5" cy="13" r="1.4" fill="#E8602C" />
          <circle cx="16" cy="13" r="1.4" fill="#F8C9AE" />
          <circle cx="20.5" cy="13" r="1.4" fill="#0F0F0F" />
          <rect x="11" y="22" width="14" height="3" rx="1.5" fill="#F8C9AE" />
          <rect x="11" y="28" width="9" height="3" rx="1.5" fill="#0F0F0F" opacity="0.2" />
          <path d="M28 25l11 4.5-4.6 1.6-1.6 4.6L28 25z" fill="#E8602C" stroke="#0F0F0F" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
    case 'bookings':
      return (
        <svg {...common}>
          <rect x="8" y="12" width="32" height="30" rx="6" fill="#CF4F1E" />
          <rect x="7" y="10" width="32" height="30" rx="6" fill="#fff" stroke="#0F0F0F" strokeWidth="2" />
          <path d="M7 19h32" stroke="#0F0F0F" strokeWidth="2" />
          <rect x="14" y="6" width="3" height="8" rx="1.5" fill="#0F0F0F" />
          <rect x="29" y="6" width="3" height="8" rx="1.5" fill="#0F0F0F" />
          <circle cx="23" cy="30" r="7.5" fill="#E8602C" />
          <path d="M19.5 30.2l2.4 2.4 4.8-5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'crm':
      return (
        <svg {...common}>
          <rect x="7" y="13" width="36" height="26" rx="6" fill="#CF4F1E" />
          <rect x="6" y="11" width="36" height="26" rx="6" fill="#fff" stroke="#0F0F0F" strokeWidth="2" />
          <circle cx="17" cy="21" r="4" fill="#E8602C" />
          <path d="M10 31c1-4 4-5.5 7-5.5s6 1.5 7 5.5" fill="#F8C9AE" />
          <rect x="27" y="18" width="10" height="3" rx="1.5" fill="#0F0F0F" />
          <rect x="27" y="24" width="8" height="3" rx="1.5" fill="#0F0F0F" opacity="0.25" />
          <rect x="27" y="30" width="6" height="3" rx="1.5" fill="#F8C9AE" />
        </svg>
      );
    case 'followups':
      return (
        <svg {...common}>
          <path d="M9 12a6 6 0 016-6h19a6 6 0 016 6v13a6 6 0 01-6 6H20l-8 6v-6h-3a0 0 0 010 0V12z" fill="#CF4F1E" transform="translate(1 2)" />
          <path d="M8 10a6 6 0 016-6h19a6 6 0 016 6v13a6 6 0 01-6 6H19l-8 6v-6a6 6 0 01-3-6V10z" fill="#fff" stroke="#0F0F0F" strokeWidth="2" strokeLinejoin="round" />
          <rect x="14" y="13" width="16" height="3" rx="1.5" fill="#F8C9AE" />
          <rect x="14" y="19" width="10" height="3" rx="1.5" fill="#0F0F0F" opacity="0.25" />
          <circle cx="35" cy="34" r="8" fill="#E8602C" />
          <path d="M31.5 34a3.5 3.5 0 016.5-1.8M38.5 34a3.5 3.5 0 01-6.5 1.8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          <path d="M38 30v2.5h-2.5M32 38v-2.5h2.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'custom':
      return (
        <svg {...common}>
          <path d="M25 8l15 8v16l-15 8-15-8V16l15-8z" fill="#CF4F1E" />
          <path d="M24 6l15 8v16l-15 8-15-8V14l15-8z" fill="#fff" stroke="#0F0F0F" strokeWidth="2" strokeLinejoin="round" />
          <path d="M24 6l15 8-15 8-15-8 15-8z" fill="#E8602C" stroke="#0F0F0F" strokeWidth="2" strokeLinejoin="round" />
          <path d="M24 22v16M39 14v16" stroke="#0F0F0F" strokeWidth="2" strokeLinejoin="round" />
          <path d="M14 26l-3 3 3 3M20 26l3 3-3 3" stroke="#0F0F0F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
        </svg>
      );
    case 'integrations':
      return (
        <svg {...common}>
          <path d="M24 24L11 12M24 24l13-12M24 24L11 37M24 24l13 13" stroke="#0F0F0F" strokeWidth="2" strokeLinecap="round" />
          <circle cx="11" cy="12" r="5" fill="#fff" stroke="#0F0F0F" strokeWidth="2" />
          <circle cx="37" cy="12" r="5" fill="#F8C9AE" stroke="#0F0F0F" strokeWidth="2" />
          <circle cx="11" cy="37" r="5" fill="#F8C9AE" stroke="#0F0F0F" strokeWidth="2" />
          <circle cx="37" cy="37" r="5" fill="#fff" stroke="#0F0F0F" strokeWidth="2" />
          <rect x="17" y="18" width="16" height="16" rx="5" fill="#CF4F1E" transform="translate(1 2)" />
          <rect x="16" y="16" width="16" height="16" rx="5" fill="#E8602C" stroke="#0F0F0F" strokeWidth="2" />
          <path d="M20 27v-4M24 27v-7M28 27v-2" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
  }
}
