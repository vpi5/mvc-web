import {React, ReactDom} from './src/utils/react';

const M = require(`./startUpConfig/${pageEnv}.js`);
const {guid} = require('./src/utils/uuid');


const DefaultModule = () => {
    return null;
};

class Render_Fun {
    constructor(object) {
        this.handleInit_$(object);
        this.handleMonitor_$();
    }

    // 删除 render 方法
    Render_close = (dom) => {
        if(!dom || typeof dom !== 'object'){
            console.error('dom元素不存在或已通过 DOMNodeRemoved 方法进入卸载期！');
            return;
        }
        // 清空渲染
        ReactDom.render(
            <DefaultModule/>,
            dom,
        );
        // 清除 dom 缓存
        let position = this.domArr_$.indexOf(dom);
        if(position !== -1){
            this.domArr_$.splice(position, 1);
        }
    };
}

// dom 存储器
Render_Fun.prototype.domArr_$ = [];

// 初始化 赋值 原型
Render_Fun.prototype.handleInit_$ = function (object) {
    for(let item in object){
        this[item] = (dom, option = null) => {
            if (option === null){
                console.error('option 配置不存在！');
                return;
            }
            // 记录 key 值
            dom.setAttribute('plugin-key', guid());
            // 查找当前 组件 并 渲染
            let Comp = M[item];
            ReactDom.render(
                <Comp
                    dom={dom}
                    option={option}
                />,
                dom,
            );
            // 记录当前 dom 元素
            this.handleRenderPush_$(dom);
        };
    }
};

// 执行 render 后记录当前 dom 元素
Render_Fun.prototype.handleRenderPush_$ = function (dom) {
    if(this.domArr_$.indexOf(dom) !== -1){
        return;
    }
    this.domArr_$.push(dom);
};

// 删除全部 render 方法
Render_Fun.prototype.close_all_$ = function () {
    let {domArr_$} = this;
    for (let i=0;i<domArr_$.length;i++){
        // 清空渲染
        ReactDom.render(
            <DefaultModule/>,
            domArr_$[i],
        );
    }
    this.domArr_$ = [];
};

// 记录监听
Render_Fun.prototype.handleMonitor_$ = function () {
    let {domArr_$} = this;

    document.addEventListener('DOMNodeRemoved', (e) => {
        if(domArr_$.indexOf(e.target) !== -1){
            console.log(`监听 [plugin-key] dom：${domArr_$[domArr_$.indexOf(e.target)].getAttribute('plugin-key')} 被移除！`);
            this.Render_close(domArr_$[domArr_$.indexOf(e.target)]);
        }
    });
};

const Render = new Render_Fun(M);

export {
    Render
};
