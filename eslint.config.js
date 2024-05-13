import defineConfig from '@antfu/eslint-config'
import unocss from '@unocss/eslint-plugin'

export default defineConfig({
  unocss,
  jsx: true,
  rules: {
    'no-console': 0,
    'no-debugger': 0,
    'no-unused-vars': 0,
    'unused-imports/no-unused-imports': 0,
    // 'ts/no-unused-vars': 1,
    'ts/no-unused-expressions': 0,
    'unused-imports/no-unused-vars': 0,
    'vue/valid-attribute-name': 1,
    'ts/method-signature-style': 1,
    'ts/consistent-type-definitions': 0,
    'vue/no-ref-as-operand': 0,
    'ts/ban-ts-comment': 0,
    'antfu/top-level-function': 0,
    'style/eol-last': 0,
    'node/prefer-global/process': 0,
    'no-extend-native': 0,
    'ts/no-this-alias': 0,
    'vue/no-unused-refs': 0,
    'curly': 0,
  },
  ignores: ['node-modules', 'dist'],
})
