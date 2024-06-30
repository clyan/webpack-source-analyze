
/**
 * Loader-runner 可以通过该包进行loader的开发和调试
 * Loader-utils 集成了loader开发中，常用的一些方法，方便开发。
 * Schema-utils 便于验证loader options的合法性（包括但不限于loader使用）。
 */

/**
 * 給变更的行前面加上 //@changed-scoped 标识
 * @param {*} source 资源输入，对于第一个执行的 loader 为资源文件的内容；后续执行的 loader 则为前一个 loader 的执行结果
 * @param {*} sourceMap 可选参数，代码的 sourcemap 结构
 * @param {*} data 可选参数，其它需要在 Loader 链中传递的信息，webpack\lib\NormalModule.js 中 this._ast 会使用 data.webpackAST， 比如 posthtml/posthtml-loader 就会通过这个参数传递参数的 AST 对象
 * 
 * @returns
 */
function ALoader(source, sourceMap, data) {
  const callback = this.async();

  callback(null, source, sourceMap, data);
}

/** 
 * 如果pitch返回非undefined值，则后面的Loader不会再执行，会 直接执行ALoader
 * @param {*} remainingRequest 当前loader右侧的所有loader加上资源路径，根据!分割，连接而成的内联loader。
 * @param {*} precedingRequest 当前loader左侧的所有loader，根据!分割，连接而成的内联loader。
 * @param {*} data 在 pitch 阶段和 normal 阶段之间共享的 data 对象。即：pitch阶段的参数data和normal阶段通过this.data获取的data为同一对象。
 */
module.exports.pitch = function (remainingRequest, precedingRequest, data) {
  console.log(remainingRequest, precedingRequest, data);
}
module.exports.default = ALoader;
