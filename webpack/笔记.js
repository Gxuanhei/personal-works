// 构建异常和中断处理
/*

node中的process.exit 规范
0 表示成功完成
非0 表示失败 回调函数中 err 不为null err.code就是传给exit的数字

process.exit 主动构建报错
compiler在每次构建结束后会触发done 这个hook

 */
/*
配置抽离npm包
通用性 统一团队构建脚本
可维护性 构建配置合理的拆分
质量 冒烟测试 单元测试 测试覆盖率

持续集成

构建配置管理的可选方案
1.通过多个配置文件管理不同环境的构建 webpack --config 参数来控制
2.将构建配置设计成一个库 比如 hjs-webpack Neutrino webpack-blocks
3.抽成一个工具进行管理  create-react-app kyt nwb
4.将所有配置放在一个文件 通过--env参数控制分支选择

规范 Git commit日志 Readme eslint 规范  Semver规范

通过 webpack-merge组合配置


 */
/*
1.冒烟测试
冒烟测试是指对提交测试软件在进行详细深入的测试之前而进行的预测试每次构建完成是否build目录是否有相应的内容输出
是否有js css静态资源文件
是否有html文件
2.单元测试
3.集成测试

 */
