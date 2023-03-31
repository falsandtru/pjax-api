const path = require('path');
const glob = require('glob');
const shell = cmd => require('child_process').execSync(cmd, { stdio: [0, 1, 2] });
const webpack = require('webpack');
const { mergeWithRules } = require('webpack-merge');
const ESLintPlugin = require('eslint-webpack-plugin');
const pkg = require('./package.json');

shell('rm -rf dist coverage');

module.exports = env => {
  const merge = mergeWithRules({
    entry: 'replace',
    module: {
      rules: {
        test: 'match',
        use: {
          loader: 'match',
          options: 'replace',
          plugins: 'replace',
        },
      },
    },
    plugins: 'append',
  });
  const config = {
    mode: 'production',
    resolve: {
      extensions: ['.ts', '.js'],
    },
    entry: glob.sync('./{src,test}/**/*.ts'),
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist'),
      library: pkg.name,
      libraryTarget: 'umd',
      globalObject: 'this',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          //exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {},
            },
            {
              loader: 'ts-loader',
              options: {
                onlyCompileBundledFiles: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.BannerPlugin({
        banner: `${pkg.name} v${pkg.version} ${pkg.repository.url} | (c) 2012, ${pkg.author} | ${pkg.license} License`,
      }),
    ],
    performance: {
      maxEntrypointSize: Infinity,
      maxAssetSize: Infinity,
    },
    optimization: {
      minimize: false,
    },
  };
  switch (env.mode) {
    case 'test':
      return merge(config);
    case 'lint':
      return merge(config, {
        entry: glob.sync('./!(node_modules)/**/*.ts'),
        plugins: [
          new ESLintPlugin({
            extensions: ['ts'],
          }),
        ],
      });
    case 'bench':
      return merge(config, {
        entry: glob.sync('./benchmark/**/*.ts'),
        module: {
          rules: [
            {
              test: /\.ts$/,
              use: [
                {
                  loader: 'babel-loader',
                  options: {
                    plugins: ['babel-plugin-unassert'],
                  },
                },
              ],
            },
          ],
        },
      });
    case 'dist':
      return merge(config, {
        entry: glob.sync('./index.ts'),
        module: {
          rules: [
            {
              test: /\.ts$/,
              use: [
                {
                  loader: 'babel-loader',
                  options: {
                    plugins: ['babel-plugin-unassert'],
                  },
                },
              ],
            },
          ],
        },
      });
  }
};
