import presetRemToPx from '@unocss/preset-rem-to-px'
import { defineConfig, presetAttributify, presetIcons, presetMini, transformerDirectives, transformerVariantGroup } from 'unocss'
import { presetExtra } from 'unocss-preset-extra'

export default defineConfig({
  presets: [
    presetMini(),
    presetIcons(),
    presetAttributify(),
    presetExtra(),
    // @ts-expect-error
    presetRemToPx({
      baseFontSize: 4,
    }),
  ],
  // 指令合可变修饰组
  transformers: [transformerDirectives(), transformerVariantGroup()],
  rules: [
    ['f-c-c', { 'display': 'flex', 'justify-content': 'center', 'align-items': 'center' }],
    [
      /^ell-(\d+)$/,
      ([, ell]) => ({
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
        'display': '-webkit-box',
        '-webkit-line-clamp': ell,
        '-webkit-box-orient': 'vertical',
      }),
    ],
    ['cursor-col', { cursor: 'col-resize' }],
  ],

  shortcuts: {
    'wh-full': 'w-full h-full',
    'fc': 'flex items-center',
    'fcc': 'flex justify-center items-center',
    'f-col': 'flex flex-col',
    'cur-p': 'cursor-pointer',
    'trans-c': 'absolute right-1/2 top-1/2 translate-x-1/2 translate-y--1/2',
    'o-auto': 'overflow-auto',
    'o-hidden': 'overflow-hidden',
  },
  theme: {
    colors: {
      primary: 'var(--primary)',
      primary_light: 'var(--primary-light)',
      info: '#e6a23c',
      success: 'var(--success-color)',
      error: 'var(--error-color)',
      dark: '#18181c',
    },
    borderRadius: {
      '4xl': '20px',
    },
    cursor: {
      col: 'col-resize',
    },
  },
})
