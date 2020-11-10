var Encore = require('@symfony/webpack-encore');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackConcatPlugin = require('webpack-concat-files-plugin');
const UglifyJS = require("uglify-es");

const ASSETS_DIRECTORY = 'assets'
const PUBLIC_DIRECTORY = '../public'
const TEMPLATE_DIRECTORY = 'templates'

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
// directory where compiled assets will be stored
.setOutputPath('public/build/')
// public path used by the web server to access the output path
.setPublicPath('/build')
// only needed for CDN's or sub-directory deploy
//.setManifestKeyPrefix('build/')

/*
 * ENTRY CONFIG
 *
 * Add 1 entry for each "page" of your app
 * (including one that's included on every page - e.g. "app")
 *
 * Each entry will result in one JavaScript file (e.g. app.js)
 * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
 */
/*
.addEntry('login_material', './assets/js/material/login.js')
.addEntry('register_material', './assets/js/material/register.js')
.addEntry('request_material', './assets/js/material/request.js')
.addEntry('reset_material', './assets/js/material/reset.js')
.addEntry('program_comments_material', './assets/js/material/program_comments.js')
.addEntry('program_description_material', './assets/js/material/program_description.js')
.addEntry('report_material', './assets/js/material/report.js')


  .addEntry('AdminBroadcastNotification', './assets/js/custom/AdminBroadcastNotification.js')
  .addEntry('Help', './assets/js/custom/Help.js')
  .addEntry('OldCodeView', './assets/js/custom/OldCodeView.js')
  .addEntry('Program', './assets/js/custom/Program.js')
  .addEntry('remixgraph.configuration', './assets/js/custom/remixgraph.configuration.js')
  .addEntry('AdminGCM', './assets/js/custom/AdminGCM.js')
  .addEntry('ImageUpload', './assets/js/custom/ImageUpload.js')
  .addEntry('PasswordVisibilityToggler', './assets/js/custom/PasswordVisibilityToggler.js')
  .addEntry('ProgramRecommender', './assets/js/custom/ProgramRecommender.js')
  .addEntry('RemixGraphHandler', './assets/js/custom/RemixGraphHandler.js')
  .addEntry('AdminLogs', './assets/js/custom/AdminLogs.js')
  .addEntry('Index', './assets/js/custom/Index.js')
  .addEntry('ProfileLoader', './assets/js/custom/ProfileLoader.js')
  .addEntry('ProgramReport', './assets/js/custom/ProgramReport.js')
  .addEntry('remixgraph.visualization', './assets/js/custom/remixgraph.visualization.js')
  .addEntry('AdminMail', './assets/js/custom/AdminMail.js')
  .addEntry('LazyLoadIframes', './assets/js/custom/LazyLoadIframes.js')
  .addEntry('ProgramCodeView', './assets/js/custom/ProgramCodeView.js')
  .addEntry('ProgramShare', './assets/js/custom/ProgramShare.js')
  .addEntry('UserNotifications', './assets/js/custom/UserNotifications.js')
  .addEntry('AdminMaintain', './assets/js/custom/AdminMaintain.js')
  .addEntry('LoadingAnimation', './assets/js/custom/LoadingAnimation.js')
  .addEntry('ProgramComments', './assets/js/custom/ProgramComments.js')
  .addEntry('ProjectList', './assets/js/custom/ProjectList.js')
  .addEntry('FetchNotifications', './assets/js/custom/FetchNotifications.js')
  .addEntry('MediaLib', './assets/js/custom/MediaLib.js')
  .addEntry('ProgramCredits', './assets/js/custom/ProgramCredits.js')
  .addEntry('register', './assets/js/custom/register.js')
  .addEntry('Follower', './assets/js/custom/Follower.js')
  .addEntry('MyProfile', './assets/js/custom/MyProfile.js')
  .addEntry('ProgramDescription', './assets/js/custom/ProgramDescription.js')
  .addEntry('remixgraph.builder', './assets/js/custom/remixgraph.builder.js')
*/


// When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
.splitEntryChunks()

// will require an extra script tag for runtime.js
// but, you probably want this, unless you're building a single-page app
.enableSingleRuntimeChunk()

/*
 * FEATURE CONFIG
 *
 * Enable & configure other features below. For a full
 * list of features, see:
 * https://symfony.com/doc/current/frontend.html#adding-more-features
 */
.cleanupOutputBeforeBuild()
.enableBuildNotifications()
.enableSourceMaps(!Encore.isProduction())
// enables hashed filenames (e.g. app.abc123.css)
.enableVersioning(Encore.isProduction())

// enables @babel/preset-env polyfills
.configureBabelPresetEnv((config) => {
  config.useBuiltIns = 'usage';
  config.corejs = 3;
})

// enables Sass/SCSS support
.enableSassLoader()

// uncomment if you use TypeScript
//.enableTypeScriptLoader()

// uncomment to get integrity="..." attributes on your script & link tags
// requires WebpackEncoreBundle 1.4 or higher
//.enableIntegrityHashes(Encore.isProduction())

// uncomment if you're having problems with a jQuery plugin
.autoProvidejQuery()

// uncomment if you use API Platform Admin (composer require api-admin)
//.enableReactPreset()
//.addEntry('admin', './assets/js/admin.js')
;

module.exports = {
  entry: './assets/js/base/Main.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ]
  },
  plugins: [
    new WebpackConcatPlugin({
      bundles: [
        {
          destination: 'public/js/base.js',
          source: ASSETS_DIRECTORY + '/js/base/**/*.js',
        },
        {
          destination: 'public/js/base.min.js',
          source: ASSETS_DIRECTORY + '/js/base/**/*.js',
          transforms: {
            after: (code) => {
              return UglifyJS.minify(code).code;
            },
          },
        },
      ],
    }),
    new CopyPlugin({
      patterns: [
        { from: 'node_modules/bootstrap/', to: PUBLIC_DIRECTORY + '/bootstrap/' },
        { from: 'node_modules/vis/dist/', to: PUBLIC_DIRECTORY + '/vis/' },
        { from: 'node_modules/@fortawesome/', to: PUBLIC_DIRECTORY + '/font_awesome_wrapper/' },
        { from: 'public/font_awesome_wrapper/fontawesome-free/webfonts/*', to: PUBLIC_DIRECTORY + '/webfonts/' },
        { from: ASSETS_DIRECTORY + '/css/fonts', to: PUBLIC_DIRECTORY + '/css/fonts/' },
        { from: 'node_modules/material-design-icons/iconfont', to: PUBLIC_DIRECTORY + '/css/fonts/' },
        { from: 'node_modules/@material/', to: PUBLIC_DIRECTORY + '/@material/' },
        { from: ASSETS_DIRECTORY + '/images', to: PUBLIC_DIRECTORY + '/images/' },
        { from: ASSETS_DIRECTORY + '/images', to: PUBLIC_DIRECTORY },
        { from: ASSETS_DIRECTORY + '/catblocks', to: PUBLIC_DIRECTORY + '/catblocks/' },
        { from: ASSETS_DIRECTORY + '/js/custom', to: PUBLIC_DIRECTORY + '/js/' },
        { from: ASSETS_DIRECTORY + '/js/custom',
          to: PUBLIC_DIRECTORY + '/js/[name].min.js',
          toType: 'template',
          transform: function (content, path) {
            return UglifyJS.minify(content.toString()).code;
          }
        },
        { from: ASSETS_DIRECTORY + '/js/analytics', to: PUBLIC_DIRECTORY + '/js/' },
        { from: ASSETS_DIRECTORY + '/js/analytics',
          to: PUBLIC_DIRECTORY + '/js/[name].min.js',
          toType: 'template',
          transform: function (content, path) {
            return UglifyJS.minify(content.toString()).code;
          }
        },
        { from: 'node_modules/clipboard/dist/clipboard.min.js', to: PUBLIC_DIRECTORY + '/js/modules/clipboard.min.js' },
        { from: 'node_modules/bootstrap/dist/js', to: PUBLIC_DIRECTORY + '/js/modules/' },
        { from: 'node_modules/sweetalert2/dist/sweetalert2.all.min.js', to: PUBLIC_DIRECTORY + '/js/modules/sweetalert2.all.min.js' },
        { from: 'node_modules/jquery/dist/jquery.min.js', to: PUBLIC_DIRECTORY + '/js/modules/jquery.min.js' },
        { from: 'node_modules/textfilljs/dist/textfill.min.js', to: PUBLIC_DIRECTORY + '/js/modules/textfill.min.js' },
        { from: 'node_modules/jquery-ui-dist/jquery-ui.min.js', to: PUBLIC_DIRECTORY + '/js/modules/jquery-ui.min.js' },
        { from: 'node_modules/jquery-contextmenu/dist/jquery.contextMenu.min.js', to: PUBLIC_DIRECTORY + '/js/modules/jquery.contextMenu.min.js' },
        { from: 'node_modules/jquery-contextmenu/dist/jquery.contextMenu.min.css', to: PUBLIC_DIRECTORY + '/css/modules/jquery.contextMenu.min.css' },
        { from: 'node_modules/jquery-contextmenu/dist/jquery.ui.position.min.js', to: PUBLIC_DIRECTORY + '/js/modules/jquery.ui.position.min.js' },
        { from: 'node_modules/animatedmodal/animatedModal.min.js', to: PUBLIC_DIRECTORY + '/js/modules/animatedModal.min.js' },
        { from: 'node_modules/animate.css/animate.min.css', to: PUBLIC_DIRECTORY + '/css/modules/animate.min.css' },

      ]
    }),
  ],
}
