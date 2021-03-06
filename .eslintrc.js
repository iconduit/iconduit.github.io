/* eslint-disable import/no-commonjs */

module.exports = {
  extends: 'standard',
  plugins: [
    'react',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'arrow-parens': ['error', 'as-needed'],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'always-multiline',
    }],
    'no-unused-vars': 'error',
    'object-curly-spacing': ['error', 'never'],
    'padding-line-between-statements': ['error', {
      blankLine: 'always',
      prev: '*',
      next: 'return',
    }],
    'prefer-const': 'error',
    'quote-props': ['error', 'as-needed'],

    'react/default-props-match-prop-types': 'error',
    'react/destructuring-assignment': 'error',
    'react/display-name': 'error',
    'react/forbid-component-props': ['error', {
      forbid: [
        'style',
      ],
    }],
    'react/forbid-dom-props': ['error', {
      forbid: [
        'bgcolor',
        'border',
        'color',
        'height',
        'style',
        'width',
      ],
    }],
    'react/forbid-elements': ['error', {
      forbid: [
        'acronym',
        'applet',
        'b',
        'basefont',
        'bgsound',
        'big',
        'blink',
        'center',
        'command',
        'content',
        'dir',
        'element',
        'font',
        'frame',
        'frameset',
        'i',
        'image',
        'isindex',
        'keygen',
        'listing',
        'marquee',
        'menu',
        'menuitem',
        'muticol',
        'nextid',
        'nobr',
        'noembed',
        'noframes',
        'plaintext',
        's',
        'shadow',
        'spacer',
        'strike',
        'tt',
        'xmp',
      ],
    }],
    'react/forbid-foreign-prop-types': 'error',
    'react/forbid-prop-types': 'error',
    'react/jsx-boolean-value': 'error',
    'react/jsx-closing-bracket-location': ['error', {
      location: 'line-aligned',
    }],
    'react/jsx-curly-brace-presence': 'error',
    'react/jsx-curly-spacing': 'error',
    'react/jsx-equals-spacing': 'error',
    'react/jsx-first-prop-new-line': 'error',
    'react/jsx-handler-names': 'error',
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-key': 'error',
    'react/jsx-max-props-per-line': ['error', {
      when: 'multiline',
    }],
    'react/jsx-no-bind': ['error', {
      ignoreRefs: true,
    }],
    'react/jsx-no-comment-textnodes': 'error',
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-target-blank': 'error',
    'react/jsx-no-undef': 'error',
    'react/jsx-pascal-case': 'error',
    'react/jsx-tag-spacing': 'error',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/no-access-state-in-setstate': 'error',
    'react/no-array-index-key': 'error',
    'react/no-children-prop': 'error',
    'react/no-danger': 'error',
    'react/no-deprecated': 'error',
    'react/no-did-mount-set-state': 'error',
    'react/no-did-update-set-state': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/no-find-dom-node': 'error',
    'react/no-is-mounted': 'error',
    'react/no-multi-comp': 'error',
    'react/no-redundant-should-component-update': 'error',
    'react/no-render-return-value': 'error',
    'react/no-string-refs': 'error',
    'react/no-this-in-sfc': 'error',
    'react/no-typos': 'error',
    'react/no-unknown-property': 'error',
    'react/no-unused-prop-types': 'error',
    'react/no-unused-state': 'error',
    'react/no-will-update-set-state': 'error',
    'react/prefer-es6-class': 'error',
    'react/prefer-stateless-function': 'error',
    'react/prop-types': ['error', {
      skipUndeclared: true,
    }],
    'react/react-in-jsx-scope': 'error',
    'react/require-default-props': 'error',
    'react/require-render-return': 'error',
    'react/self-closing-comp': 'error',
    'react/sort-comp': 'error',
    'react/style-prop-object': 'error',
    'react/void-dom-elements-no-children': 'error',

    'import/default': 'error',
    'import/export': 'error',
    'import/extensions': ['error', 'ignorePackages'],
    'import/first': 'error',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/newline-after-import': 'error',
    'import/no-amd': 'error',
    'import/no-commonjs': 'error',
    'import/no-cycle': 'error',
    'import/no-deprecated': 'error',
    'import/no-duplicates': 'error',
    'import/no-extraneous-dependencies': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-named-as-default-member': 'error',
    'import/no-named-default': 'error',
    'import/no-self-import': 'error',
    'import/no-unresolved': 'error',
    'import/no-useless-path-segments': 'error',
    'import/order': ['error', {
      'newlines-between': 'always',
    }],
  },
}
