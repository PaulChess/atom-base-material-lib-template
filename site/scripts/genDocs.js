const childProcess = require('child_process');
const chokidar = require('chokidar');
const fastGlob = require('fast-glob');
const chalk = require('chalk');
const fs = require('fs');
const { join } = require('path');
const { components, isPublishDoc } = require('../../atom.config');
const { env } = require('./env');

const packageSrc = join(__dirname, '../../packages');
const componentsDir = join(__dirname, '../docs/guide/components');
const componentsDevDir = join(__dirname, '../docs/guide/components-dev');

const guideDocSrc = env === 'dev'
  ? componentsDevDir
  : componentsDir;

function mkDirs() {
  if (
    env === 'dev'
      && !fs.existsSync(componentsDevDir)
  ) {
    fs.mkdirSync(componentsDevDir);
  }

  if (
    env === 'prod'
      && !fs.existsSync(componentsDir)
  ) {
    fs.mkdirSync(componentsDir);
  }
}

function getReadMePath(componentName) {
  const pathRes = {
    oriReadMePath: `${packageSrc}/${componentName}/README.md`,
    targetReadMePath: `${guideDocSrc}/${componentName}.md`,
  };
  return pathRes;
}

function copyFile(oriPath, targetPath, componentName) {
  const ls = childProcess.spawn('cp', ['-f', oriPath, targetPath]);
  ls.on('close', (code) => {
    if (typeof code === 'number' && code === 0) {
      console.log(chalk.green(`✔ ${componentName} 组件文档同步成功`));
    } else {
      console.log(chalk.red(`× ${componentName} 组件文档同步失败`));
    }
  });
}

// only get README files which defined in indexes
function getWatchedReadMeFiles() {
  const watchedFilePathList = [];
  components.forEach((component) => {
    watchedFilePathList.push(`${packageSrc}/${component.enName}/*.md`);
  });
  return fastGlob.sync(watchedFilePathList);
}

// only watch README files which defined in indexes
function watchFileChange(watchedFiles) {
  chokidar.watch(watchedFiles).on('change', (path) => {
    const componentName = path.split('/')[path.split('/').length - 2];
    const { oriReadMePath, targetReadMePath } = getReadMePath(componentName);
    copyFile(oriReadMePath, targetReadMePath, componentName);
  });
}

function init() {
  console.log('isPublishDoc', isPublishDoc);
  mkDirs();
  if (!isPublishDoc) return;
  const watchedReadMeFiles = getWatchedReadMeFiles();
  components.forEach((component) => {
    const { oriReadMePath, targetReadMePath } = getReadMePath(component.enName);
    copyFile(oriReadMePath, targetReadMePath, component.enName);
  });
  if (env === 'dev') {
    watchFileChange(watchedReadMeFiles);
  }
}

init();
