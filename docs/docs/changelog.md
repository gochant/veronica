# 更新日志

## v 1.0.0


* 移除 在全局配置 paths 中 widgets 路径的特性
* 移除 widgetMapping 特性
* 移除 widget 中 的 _widgetRef
* 移除 view 中的 instance 配置
* 移除 autoReport的实现，改由用户自己实现
* 移除 view 的 refresh 方法，并更名为 _refresh
* 移除 dialog 的 destroyedOnClose 配置，后续版本再添加


* 新增 根据页面名称，自动跳转到页面，例如 ProjectDemo/Home/Index，则会去查找名为 ProjectDemo-Home-Index 的 Widget
* 新增 定义view时，支持直接返回对象
* 新增 requirejs 的插件 ver，这样不用手动注册 control 了

* 修复 ajax 缺失 options 的bug
* 修复 dialog 默认弹出的bug
* 修复 _render 方法内的bug

## v 0.2.3

* 废弃 veronica-mvc 项目

### veronica

* 移除在全局配置 paths 中 widgets 路径的特性
* 移除 widgetMapping 特性
* 移除 widget 中 的 _widgetRef
* 移除 app 中加载默认页面的机制
* View 的 window 配置不再支持 widgetOpt 和 viewOpt
* Bugfix：修复对话框不能继承配置的bug
* 增强了路由配置，支持页面传递参数，支持多种路由格式
* 支持库的直接引用，可脱离AMD Loader使用
* 支持 modules 下 widget 的多级目录放置
* 通过配置 features 支持 Application 的不同模式

### grunt-veronica

* 升级以支持多级目录 widget 的打包

### veronica-ui *New*

* 包括一些轻量级UI相关方法

## v 0.2.0

### veronica

* 将插件源配置项 'source' 更名为 '_source'
* 将 Application 的 init 方法 更名为 launch
* 所有部件对象包装成延迟对象

### veronica-mvc
* 添加 notify 组件，notify 的接口产生重大变化
* 添加 router 组件
* tableView
    * `filter` 的筛选方式 `isGroup` 由 true 改为 false
* formView
    * 添加 schema 和 params 配置项
	* 移除 processData 方法

### generator-veronica
* 生成器升级，执行 `grunt` 能同时打包网站和部件