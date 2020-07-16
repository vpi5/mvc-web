## DOM组件使用说明文档

#### 使用说明
- Mv*中使用方式
```javascript
    // 1、引入 css js 文件
    import 'com.plugIn.css';
    import {Render} from '@/utils/com.plugIn.js';
    // 2、使用渲染方法
    Render['组件名称']('dom元素', '入参');
    // 3、关闭Render ==> 清除 DOM 和 数据订阅
    Render.Render_close('dom元素');
```

- jQuery 原生使用方式
```html
    <!-- 引用 css js 文件 -->
    <link rel="stylesheet" href="./com.plugIn.css">
    <script src="./com.plugIn.js"></script>
    
    <!-- 使用渲染方法 -->
    <script >
        var Render = plugIn.Render;
        Render['组件名称']('dom元素', '入参');
    </script>

    <!-- 关闭渲染方法 -->
    <script >
        var Render = plugIn.Render;
        Render.Render_close('dom元素');
    </script>
```

- 注意事项<br/>
本插件会使用 DOMNodeRemoved API 方法监听 DOM数的变化 会自动删除组件；<br/>
但：若要考虑兼容性 不支持 DOMNodeRemoved 的方法 请手动关闭组件；<br/>

更新参数则无需关闭操作，直接调用渲染方法即可<br/>

相同DOM节点只能挂载一个组件，若同一DOM节点赋值两个组件，那么后一个组件将替代前一个组件

- 参数说明
```javascript
    /*
    
        TODO 组件名称：src/plugIn 目录下的导出文件名称  但受限于启动文件（startUpConfig/*.js）
        
        TODO dom元素：一个div标签使用 ref 或 document.getElementBy[*] 可查到的 dom 元素

        TODO 入参：各个组件可规定入参 [格式不限]，中间层通过 props 的 option[key值] 方式传递

    */
```

#### css 样式修改
- React<br/>
查找便签 class 类名 在 less、sass、css等文件中直接可更改<br/>
若配置了 global.less 也可直接更改<br/>
若无法更改请提高层级在 App.js、App.css之前 引用 com.plugIn.css 文件<br/>
或可直接在 html 文件中 head 标签中直接引用 选择合适的层级

- Vue<br/>
style标签属性中不可存在scoped，否则无法更改样式<br/>
若无法更改请提高层级在main.js中的 App.js、App.css之前 引用 com.plugIn.css 文件<br/>
或可直接在 html 文件中 head 标签中直接引用 选择合适的层级

- 原生应用<br/>
在head标签中通过 link 的方式引用 com.plugIn.css [需在顶层引用]<br/>
在head便签中[com.plugIn.css 之下]定义 style 标签中即可更改样式


- 注意 若使用了 css module 请使用以下方式
在global.less使用 @import 或 在 html中使用 link 引用
在全局中样式库文件中 使用 :global{} 方法可直接修改
