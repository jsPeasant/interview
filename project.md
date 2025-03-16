一、 why? qiankun 拆项目
1. 20+子系统， 组织架构拆分出4条业务线， 每条业务线公共部分差异越来越大，导致公共部分代码互相影响，发布频率也不一致，线上构建也缓慢 4min
2. 本项目由Vite构建，qiankun 生态丰富，业界也相对成熟，改造成本相对不大，故选qiankun
3. 按也无限拆，共Layout,主应用只包含layout和登陆页面，各业务线路由加前缀标识， 执行环境处于qiankun还是自身

二、why? 国际化
1. 便于东南亚人使用系统
2. 静态语言包方案：快速扫描文件夹从现项目1000多个文件中抽离出键值对json,并用翻译函数替换掉原中文字符串， key的规范是文件路径+自增id,cli命令写入语言包

三、ts规范化校验
由于项目中ts规则不规范，有些ts提示异常的代码也成功提交，故在pre-commit阶段增量动态校验ts, ts不支持命令files跟json文件混用，故须需要写动态脚本

四、why? 统一表单配置
1. 业务人员使用习惯，有些人喜欢在搜索栏搜，有些人喜欢在表格列上搜；搜索栏搜索条件过多，占用空间大；不同业务线的有不同种类的搜索栏，配置不一样
2. 不同搜索栏的搜索条件需要联动同步，业务搜索场景很多
3. 统一的配置，中间统一处理，搜索值统一缓存在indexdb中

五、why? 双向选择的链表树 (自动按需更新节点序号， 虚拟列表)
1. 标识文档节点父子兄弟关系，o(1)时间复杂度，随着op调整节点关系，收集副作用path
2. normalize

六、why? 性能优化
1. 渲染架构  请求公共数据完 + ejs + include script.js + parse html + hygen js
2. TTFB + FCP + FMP时间
3. 启动阶段缓存公共数据 + 弃用ejs + 缓存各各站点layout + 弃用ddl(拆分defer异步加载首页必须依赖) + 只渲染首页可视区相关资源

七、 webpack 与 vite 区别
1. webpack 以 commonjs模块化为基础， vite以es module为基础
2. dev  vite bundless ,esbuild预编译node_modules，冷启动速度快,  webpack必须打包
3. prod vite 用rollup构建
