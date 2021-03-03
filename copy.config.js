const cpx = require('cpx');
const path = require('path');

const paths = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'public'),
};

const copyFiles = [
  {
    source: `${paths.src}/html/**/*.html`,
    dest: paths.dist,
    watch: process.env.NODE_ENV === 'development' ? true : false,
  },
  {
    source: `${paths.src}/php/**/*.php`,
    dest: paths.dist,
    watch: process.env.NODE_ENV === 'development' ? true : false,
  },
  {
    source: `${paths.src}/**/*.css`,
    dest: paths.dist,
    watch: process.env.NODE_ENV === 'development' ? true : false,
  },
  {
    source: `${paths.src}/assets/js/libs/*.js`,
    dest: `${paths.dist}/assets/js/libs`,
    watch: process.env.NODE_ENV === 'development' ? true : false,
  },
  {
    source: `${paths.src}/assets/**/*.{wof,woff2,woff,tff,eot,mp3,mp4,mov,pdf,webp}`,
    dest: `${paths.dist}/assets`,
    watch: process.env.NODE_ENV === 'development' ? false : false,
  },
  {
    source: `${paths.src}/*.{txt, json, xml, png, icon}`,
    dest: paths.dist,
    watch: process.env.NODE_ENV === 'development' ? false : false,
  },
  {
    source: `${paths.src}/.htaccess`,
    dest: paths.dist,
    watch: process.env.NODE_ENV === 'development' ? false : false,
  },
];

// File copy & Watch
const watchFiles = copyFiles.filter((file) => file.watch === true);
watchFiles.forEach(function (file) {
  cpx.watch(file.source, file.dest, {
    clean: true,
  });
});

const noWatchFiles = copyFiles.filter((file) => file.watch === false);
noWatchFiles.forEach(function (file) {
  cpx.copy(file.source, file.dest, {
    clean: true,
  });
});
