module.exports = {
  chainWebpack: config => {
    config.module
      .rule('vue')
      .test(/\.vue$/)
      .use('vue-loader')
      .loader('vue-loader')
      .end();
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      externals: ['@unblockneteasemusic/rust-napi'],
      builderOptions: {
        productName: 'YesPlayMusic',
        copyright: 'Copyright © YesPlayMusic',
        asar: true,
        publish: [
          {
            provider: 'github',
            owner: 'qier222',
            repo: 'YesPlayMusic',
            vPrefixedTagName: true,
            releaseType: 'draft',
          },
        ],
        directories: {
          output: 'dist_electron',
        },
        mac: {
          target: [
            {
              target: 'dmg',
              arch: ['x64', 'arm64', 'universal'],
            },
          ],
          artifactName: '${productName}-${os}-${version}-${arch}.${ext}',
          category: 'public.app-category.music',
          darkModeSupport: true,
        },
        win: {
          target: [
            {
              target: 'portable',
              arch: ['x64'],
            },
            {
              target: 'nsis',
              arch: ['x64'],
            },
          ],
          publisherName: 'YesPlayMusic',
          icon: 'build/icons/icon.ico',
          publish: ['github'],
        },
        linux: {
          target: [
            {
              target: 'AppImage',
              arch: ['x64'],
            },
            {
              target: 'tar.gz',
              arch: ['x64', 'arm64'],
            },
            {
              target: 'deb',
              arch: ['x64', 'armv7l', 'arm64'],
            },
            {
              target: 'rpm',
              arch: ['x64'],
            },
            {
              target: 'snap',
              arch: ['x64'],
            },
            {
              target: 'pacman',
              arch: ['x64'],
            },
          ],
          category: 'Music',
          icon: './build/icon.icns',
        },
        dmg: {
          icon: 'build/icons/icon.icns',
        },
        nsis: {
          oneClick: true,
          perMachine: true,
          deleteAppDataOnUninstall: true,
        },
      },
    },
  },
};
