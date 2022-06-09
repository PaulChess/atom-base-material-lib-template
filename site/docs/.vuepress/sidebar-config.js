const { join } = require('path');
const fs = require('fs');
const { categories, components } = require('../../../atom.config');


// 根据环境来判断读取是开发环境的组件文件夹还是生产环境的组件文件夹
// const componentDirName = process.env.NODE_ENV === 'development'
//   ? 'components-dev'
//   : 'components';

const COMPONENTS_DIR_NAME = 'components';

// 由于pipeline文档同步问题，需要比较indexes中的components以及实际存在于目录中的文件来得到真正用于渲染的renderComponents
const renderComponents = [];
const fileNameList = [];
const componentsDirFiles = fs.readdirSync(
  join(__dirname, `../guide/${ COMPONENTS_DIR_NAME }`)
);
for (let i = 0; i < componentsDirFiles.length; i++) {
  fileNameList.push(componentsDirFiles[i].substr(0, componentsDirFiles[i].indexOf('.md')));
}
for (let j = 0; j < components.length; j++) {
  if (fileNameList.includes(components[j].enName)) {
    renderComponents.push(components[j]);
  }
}

function flattenArr(arr) {
  var result = [];
  for(var i = 0; i < arr.length; i++) {
      result = result.concat(arr[i]);
  }
  return result;
}

function getComponentsList() {
  let categoryList = [];
  categories.forEach(category => {
    categoryList.push({
      title: category.zhName,
      collapsable: false,
      children: []
    })
  });
  renderComponents.forEach(component => {
    let categoryIdx = 0;
    categories.forEach((category, idx) => {
      if (category.enName === component.category) {
        categoryIdx = idx;
      }
    });
    categoryList[categoryIdx].children.push(`${COMPONENTS_DIR_NAME}/${component.enName}`);
  });
  return JSON.parse(JSON.stringify(categoryList));
}

const sideBarList = flattenArr([
  getComponentsList(),
]);
console.log(sideBarList);

module.exports = {
  '/guide/': [{
    title: '业务组件',
    collapsable: false,
    children: ['components/Alert']
  }]
}

// [
//   {
//     title: '业务组件',
//     collapsable: false,
//     children: [ 'components/Alert' ]
//   }
// ]