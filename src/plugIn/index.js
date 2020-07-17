
const files = require.context('.', true, /\.js$/);

let components = {};

files.keys().forEach(key => {
    let name = key.split('/index.js');
    if(name[0] !== '.'){
        let comp = files(key).default;
        if(!comp){
            console.error(`${key.split('./')[1]}：未定义 class 导出类！`);
            return;
        }
        if(comp.name === '_default'){
            console.error(`${key.split('./')[1]}：未定义 class 类名！`);
            return;
        }
        components[comp.name] = comp;
    }
});

module.exports = {
    components
};

