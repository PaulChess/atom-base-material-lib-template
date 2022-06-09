/**
 * Author: shenjiaqi@myhexin.com
 * Date: 2022.06.09
 */
const childProcess = require('child_process');
const chalk = require('chalk');
const chokidar = require('chokidar');
const fastGlob = require('fast-glob');
const { join } = require('path');
const { existsSync, mkdirSync } = require('fs');
const { components } = require('../atom.config');

const ROOT_PATH = process.cwd();
const COMPONENTS_DOCS_STORE_DIR = join(ROOT_PATH, 'site/docs/guide/components');
const COMPONENTS_PACKAGE_DIR = join(ROOT_PATH, 'packages');

function mkDirs() {
  if (!existsSync(COMPONENTS_DOCS_STORE_DIR)) {
    mkdirSync(COMPONENTS_DOCS_STORE_DIR);
  }
}

function getReadMePath(componentName) {
  const pathRes = {
    oriReadMePath: `${COMPONENTS_PACKAGE_DIR}/${componentName}/README.md`,
    targetReadMePath: `${COMPONENTS_DOCS_STORE_DIR}/${componentName}.md`,
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
    watchedFilePathList.push(`${COMPONENTS_PACKAGE_DIR}/${component.enName}/*.md`);
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
  mkDirs();
  components.forEach((component) => {
    const { oriReadMePath, targetReadMePath } = getReadMePath(component.enName);
    copyFile(oriReadMePath, targetReadMePath, component.enName);
  });
  const watchedReadMeFiles = getWatchedReadMeFiles();
  watchFileChange(watchedReadMeFiles);
}

init();