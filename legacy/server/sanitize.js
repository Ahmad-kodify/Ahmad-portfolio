/**
 * Strip control characters (tabs and newlines survive) and trim. Everything a
 * visitor submits is stored and rendered as plain text — markup is never
 * interpreted.
 */
export function clean(value) {
  return Array.from(String(value ?? ''))
    .filter((char) => {
      const code = char.codePointAt(0);
      if (code === 9 || code === 10) return true;
      return code > 31 && code !== 127;
    })
    .join('')
    .trim();
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) && value.length <= 254;
}

/** Minimal HTML escaping for the values interpolated into notification emails. */
export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
