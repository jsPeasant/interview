# 1. https

应对中间人攻击

对称加密内容，非对称加密 对称密钥
完整性 签名算法
证书 确保是目标服务器

# 2. http2

二进制帧，唯一帧标识
链路复用，依据帧标识重新组装
头部压缩 维护一套压缩表进行解析
服务推送
共用 tcp,降低 tcp 慢启动影响， 有 tcp 头部阻塞问题

# 3. 性能优化

加载：网络 dns-prefetch http2 资源大小：gzip, 关键可视资源 服务器：复杂逻辑
解析：html js  
运行: 梳理逻辑链路 针对性优化运行时间长的代码段

# 4. 浏览器输入 url 到显示

解析 url
域名解析
三次握手
发起请求
读取响应
解析 html-》 dom 与 cssom -> 渲染树 -》Layout 树-》 Gpu 绘制显示

![alt text](urlToShow.png)

# 5. tps/qps

https://blog.csdn.net/weixin_49562132/article/details/125720343

https://dbaplus.cn/news-141-5420-1.html

# 6. vite 热更新

https://juejin.cn/post/7351430820714266650

https://cn.vite.dev/guide/dep-pre-bundling.html#%E6%B5%8F%E8%A7%88%E5%99%A8%E7%BC%93%E5%AD%98

# 7. pnpm

快速的 节省磁盘空间的 包管理器

快： 比 npm 和 yarn 快 2 倍
高效节省（中心化和自动硬链接(hard link)和软链接(sybolic link)管理）：依赖项存储在一个内容可寻址的仓库， 硬链接将资源链接到项目的虚拟文件存储 VS npm&yarn 依赖副本
支持 monorepo

https://zhuanlan.zhihu.com/p/419399115
