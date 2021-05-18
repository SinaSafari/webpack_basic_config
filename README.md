# webpack basic configuration

> this configuration and forler structure is suitable for basic static sites and it does not configured for SPAs and so on. by the way you can add vuejs library.

## Commands

- `npm run build`:

generate production ready code (optimized and minimized) in `dist` directory. all the assets (including images and fonts) get contenthash for caching in the client browser.

- `npm run dev`

build the project in `dist` directory in `watch` mode. the css is not optimized, just extracted to separate files. also file names are simple and there's no contenthash.

---

## Folder structure

main development environment folder structure:

```zsh
project
│   webpack.dev.js
│   webpack.config.js
│   postcss.config.js
│   package.json
│   .babelrc.json
│   .browserslistrc
│   .gitignore
│
└───src
│   │   index.js
│   │   vendor.js
│   │   HTML file(s)
│   │
│   └───assets
│       │
│       └───css
│       │   css file(s)
│       │
│       └───scss
│       │   scss file(s)
│       │
│       └───js
│       │   js file(s)
│       │
│       └───images
│       │   images folder(s)/file(s)
│       │
│       └───fonts
│           font(s) file(s)

```

output (dist) folder structure

```zsh
────dist
│   │   main.bundle.js
│   │   vendor.bundle.js
│   │   HTML file(s)
│   │
│   └───assets
│       │
│       └───css
│       │   css file(s)
│       │
│       └───images
│       │   images folder(s)/file(s)
│       │
│       └───fonts
│           font(s) file(s)

```

**Note:** `dist` and `node_module` directories are in .gitignore so you should install the dependencies by `npm i` and also build the project.

all the code should be in the `src` directory. in `src`, `index.js` is the entry point of all the code (including styles and registering html files). `vendor.js` is the entry point of all 3rd party packages. \
these 2 files are required based on are configuration. rest rest of structure is up to you. \

---

## Webpack configuration

- ### **_html_**

`html-loader` parse all the html files and handle paths for images and so on. also `html-webpack-plugin` generate html files in `dist` based on options we passed to it (options are just template which is going to use and output filename). also this plugin automatically import the paths for css, js, and photos. the output path for html files is `/dist`.

- ### **_javascript_**

all the javascript code (except for `node_modules`) will transpile with babel to version that is understandable for all browsers. `babel-preset-env` used for configuring babel. the output path for javascript files is `/dist`.

- ### **_css_ and _scss_**

all the `.css` and `.scss` files handle with ofiicial `css-loader` and `scss-loader`. also we use `postcss` to use it's autoprefixer feature (we use `postcss-preset-env` in postcss config file, it has all the default features of postcss). \
also all the css file in both development and production modes, will be extracted to new files using `mini-css-extract-plugin`. the output path for css and scss files is `/dist/assets/css`.

- ### **_fonts / images_**

all photos and font will be handled by `file-loader`. photos folder structure in `src` will be in `dist` folder too. the output path for images is `/dist/assets/image`.

---

## Register new html file

In webpack file, each intance of `HtmlWebpackPlugin` represents a html file.

in configuration object:

- `template`: is the path to html file in `src` directory which is going to use as template for building new html file in `dist`.

- `filename`: is the name of the file in `dist`.

- `chunks`: is an array of bundle files which is required and shoul import in html file.

for example:

```js
new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["main", "vendor"],
    }),
```
