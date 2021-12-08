module.exports = {
  babel: {
    plugins: [
      [
        '@emotion',
        {
          autoLabel: 'dev-only',
          labelFormat: '[filename]--[local]',
        },
      ],
    ],
  },
};
