import { preset } from '@sk-web-gui/core';
import type { Config } from 'tailwindcss';

export default {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/@sk-web-gui/*/dist/**/*.js'],
  theme: {
    extend: {
      transitionProperty: {
        position: 'left, right, top, bottom',
      },
    },
  },
  darkMode: 'selector',
  presets: [preset()],
} satisfies Config;
