module.exports = {
  // ESLint 默认使用Espree作为其解析器，你可以在配置文件中指定一个不同的解析器
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],

  // ESLint 支持使用第三方插件。在使用插件之前，你必须使用 npm 安装它。
  // 在配置文件里配置插件时，可以使用 plugins 关键字来存放插件名字的列表。插件名称可以省略 eslint-plugin- 前缀。
  plugins: ['react', '@typescript-eslint', 'react-hooks'],

  // 为我们提供运行环境，一个环境定义了一组预定义的全局变量
  env: {
    browser: true,
    es6: true,
  },

  settings: {
    // 自动发现React的版本，从而进行规范react代码
    react: {
      pragma: 'React',
      version: 'detect',
    },
    'import/resolver': {
      node: {
        // import 模块时，不写后缀将尝试导入的后缀，出现频率高的文件类型放前面
        extensions: ['.tsx', '.ts', '.js', '.json', '.d.ts'],
      },
      typescript: {
        // directory: [resolve('./src/tsconfig.json'), resolve('./scripts/tsconfig.json')],
      },
    },
  },

  // 自定义全局变量
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    _: true,
    $: true,
  },
  // 配置解析器支持的语法
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  // ESLint 附带有大量的规则。你可以使用注释或配置文件修改你项目中要使用的规则。要改变一个规则设置，你必须将规则 ID 设置为下列值之一：
  // "off" 或 0 - 关闭规则
  // "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
  // "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
  rules: {
    semi: [2, 'never'],
    quotes: [2, 'single'],
    'linebreak-style': 'off',
    eqeqeq: [2, 'allow-null'],

    // 忽略导入拓展名
    'import/extensions': [
      'error',
      'ignorePackages',
      { ts: 'never', tsx: 'never', json: 'ignorePackages', js: 'never' },
    ],

    // // 未使用的变量名
    // 'no-unused-vars': [
    //   1,
    //   {
    //     vars: 'all',
    //     args: 'after-used',
    //     ignoreRestSiblings: true,
    //     varsIgnorePattern: '^_',
    //     argsIgnorePattern: '^_|^err|^ev', // _xxx, err, error, ev, event
    //   },
    // ],

    // 避免import React却没有显示调用的错误
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],

    'no-useless-escape': 2,

    'no-shadow': 0,

    'react/prop-types': 0,

    'react-hooks/rules-of-hooks': 'error',

    'react-hooks/exhaustive-deps': 'warn',

    'react/display-name': 0,

    '@typescript-eslint/no-empty-function': 'off',

    '@typescript-eslint/no-unused-vars': 1,

    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],

    'react/jsx-props-no-spreading': 0,

    // should be listed in the project's dependencies, not devDependencies
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],

    'no-unused-expressions': 0,

    'jsx-a11y/no-static-element-interactions': 0,

    'jsx-a11y/click-events-have-key-events': 0,

    'no-console': 0,

    camelcase: 0,
  },
}
