module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "indent":[
      "error",
      2
    ],
    "comma-dangle": ["error", "never"],
    "quotes":[
      1,
      "single"
    ],
    "block-spacing":[
      "error",
      "always"
    ],
    "array-bracket-spacing":[
      "error",
      "always",
      {
          "objectsInArrays":false,
          "arraysInArrays":false
      }
    ],
    "array-bracket-spacing":[
      "error",
      "always",
      {
          "objectsInArrays":false,
          "arraysInArrays":false
      }
    ],
    "eol-last":2,
    "no-console":1,
    "space-before-function-paren":0,
    "no-multiple-empty-lines":[
        "off"
    ]
  }
}
