1. react-router-dom
2. antd ui框
    antd 4版本 使用的less文件 而react　不支持编译less 文件 
    需要到 react-scripts => config =>webpack.config.js => rules 351 =>  修改 
    356 test: /\.(js|mjs|jsx|ts|tsx|less)$/, 加上 less
3. axios
4. sass 
5. 封装axios 请求
    请求Axios  
6. 创建文件夹
compones 组件
pages 路由组件
router 路由配置文件
assets 静态资源
7. 由路由 组件login 设置 登录
   1. 由路由组件login 设置登录
       1.  配置useRoutes  设置router文件
       2.  配置路由环境 BrowserRouter 
       3.  通过antd设置登录模板

8. antd    labelCol 输入框名称占宽比     wrapperCol 输入框

   将元素宽的100%  分成24份

9. let reg = /^[\u4e00-\u9fa5_\w]{3,14}$/;

   let reg = /^[\w_`~!@#$%^&*()+=-\\\]\]\{\}:;'\,.<>/?]{6,15}$/;

