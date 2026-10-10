import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const config = [
  ...nextVitals,
  ...nextTs,
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'out/**',
      'dist/**',
      'data/**',
      'tmp-images/**',
      'next-env.d.ts',
      'legacy/**',
      'scripts/**',
    ],
  },
];

export default config;
