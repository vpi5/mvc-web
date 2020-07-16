## Dom组件
- 包含表格、盘口、涨跌榜、分笔成交等
- 依赖（com.quote）

#### 建立文件夹时的必要说明

- 小驼峰命名法，例如：testTable

#### 文件夹目录说明树
```
.
├── src
│   ├── assets  ## 引用静态资源
│   ├── components  ## 二级以上组件存放处
│   ├── plugIn  ## 一级导出组件存放处（export default 导出 class 类）
│   ├── utils  ## 全局引用公共类
│   ├── global.less  ## 全局引用样式
│
├── END！         
```
