# Corona Challenges
## Web applications SCE-2020 

# Demo
Mobile
[![Demo Mobile](https://img.youtube.com/vi/mgvYX4QgubI/0.jpg)](https://www.youtube.com/watch?v=mgvYX4QgubI)


Desktop
[![Demo Desktop](https://img.youtube.com/vi/YLtegLEDosQ/0.jpg)](https://www.youtube.com/watch?v=YLtegLEDosQ)


# Online Demo
[websce2020.rubnet.fr](http://websce2020.rubnet.fr:9000/)


# Installation

Corona Challenges requires [Node.js](https://nodejs.org/) to run.

Install the dependencies and start the front end.

```sh
$ cd frontEnd
$ npm install
$ npm run start
```

Install the dependencies and start the back end.

```sh
$ cd backEnd
$ npm install
$ npm run start
```

For build we can use:

```sh
$ npm run build
```


## Important 
Change the file backEnd/src/config/db.ts with the file in the moodle submission / mail submission

# Poject structure
The project is written in Vue for the front and NodeJS(TS) for the back.

The project uses the following dependencies for the front:
###### bootstrap && [BootstrapVue](https://bootstrap-vue.org/docs/)
- Featuring Sass variables and mixins, responsive grid system
###### [VueMaterial](https://vuematerial.io/)
- Build apps with Material Design and Vue.js
###### [Axios](https://www.npmjs.com/package/axios)
- Promise based HTTP client for the browser and node.js


The project uses the following dependencies for the back:
###### [TypeScript](https://www.typescriptlang.org/)
- TypeScript brings you optional static type-checking along with the latest ECMAScript features.
###### [Express.JS](https://expressjs.com/)
- Fast, unopinionated, minimalist web framework for Node.js
###### [Bcryptjs](https://www.npmjs.com/package/bcryptjs)
- Algo for encrypted data
###### [Mongoose](https://www.npmjs.com/package/mongoose)
- Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.
###### [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- An implementation of JSON Web Tokens.



# FOLDER STRUCTURE
```
web-applications-sce
├─ .gitattributes
├─ .gitignore
├─ backEnd
│  ├─ package.json
│  ├─ private.key
│  ├─ public.key
│  ├─ src
│  │  ├─ config
│  │  │  └─ db.ts
│  │  ├─ controllers
│  │  │  ├─ like.controller.ts
│  │  │  ├─ movie.controller.ts
│  │  │  └─ user.controller.ts
│  │  ├─ index.ts
│  │  ├─ middleware
│  │  │  ├─ authentification.middleware.ts
│  │  │  └─ requirements.middleware.ts
│  │  ├─ models
│  │  │  ├─ like.model.ts
│  │  │  ├─ movie.model.ts
│  │  │  └─ user.model.ts
│  │  ├─ public
│  │  │  ├─ Admocs Project - Google Chrome 2020-06-18 14-18-47.mp4
│  │  │  └─ bgvideo.mp4
│  │  └─ routes
│  │     ├─ like.route.ts
│  │     ├─ movie.route.ts
│  │     └─ user.route.ts
│  ├─ test.js
│  └─ tsconfig.json
├─ frontEnd
│  ├─ .browserslistrc
│  ├─ .eslintrc.js
│  ├─ .gitignore
│  ├─ .postcssrc.js
│  ├─ babel.config.js
│  ├─ frontEnd.rar
│  ├─ package.json
│  ├─ public
│  │  ├─ favicon.png
│  │  └─ index.html
│  ├─ src
│  │  ├─ assets
│  │  │  ├─ css
│  │  │  │  ├─ caroussel.css
│  │  │  │  ├─ notes.css
│  │  │  │  └─ styles.css
│  │  │  ├─ img
│  │  │  │  ├─ bg3.jpg
│  │  │  │  ├─ bg7.jpg
│  │  │  │  ├─ city-profile.jpg
│  │  │  │  ├─ examples
│  │  │  │  │  ├─ clem-onojegaw.jpg
│  │  │  │  │  ├─ clem-onojeghuo.jpg
│  │  │  │  │  ├─ cynthia-del-rio.jpg
│  │  │  │  │  ├─ mariya-georgieva.jpg
│  │  │  │  │  ├─ olu-eletu.jpg
│  │  │  │  │  ├─ studio-1.jpg
│  │  │  │  │  ├─ studio-2.jpg
│  │  │  │  │  ├─ studio-3.jpg
│  │  │  │  │  ├─ studio-4.jpg
│  │  │  │  │  └─ studio-5.jpg
│  │  │  │  ├─ faces
│  │  │  │  │  ├─ christian.jpg
│  │  │  │  │  └─ marc.jpg
│  │  │  │  ├─ nature-2.jpg
│  │  │  │  ├─ nature-3.jpg
│  │  │  │  ├─ nature.jpg
│  │  │  │  ├─ profile_city.jpg
│  │  │  │  └─ vue-mk-header.jpg
│  │  ├─ components
│  │  │  ├─ Badge.vue
│  │  │  ├─ cards
│  │  │  │  ├─ LoginCard.vue
│  │  │  │  └─ NavTabsCard.vue
│  │  │  ├─ Dropdown.vue
│  │  │  ├─ index.js
│  │  │  ├─ Modal.vue
│  │  │  ├─ Parallax.vue
│  │  │  └─ Tabs.vue
│  │  ├─ layout
│  │  │  ├─ MainNavbar.vue
│  │  │  └─ MobileMenu.vue
│  │  ├─ main.js
│  │  ├─ App.vue
│  │  ├─ plugins
│  │  │  ├─ globalComponents.js
│  │  │  ├─ globalMixins.js
│  │  │  └─ material-kit.js
│  │  ├─ router.js
│  │  └─ views
│  │     ├─ Carousel.vue
│  │     ├─ Home.vue
│  │     ├─ Login.vue
│  │     ├─ Profile.vue
│  │     └─ Register.vue
│  ├─ vue.config.js
│  └─ yarn.lock
├─ LICENSE
└─ README.md

```

