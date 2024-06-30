
/**
 * 給变更的行前面加上 //@changed-scoped 标识
 * @param {*} source 资源输入，对于第一个执行的 loader 为资源文件的内容；后续执行的 loader 则为前一个 loader 的执行结果
 * @param {*} sourceMap 可选参数，代码的 sourcemap 结构
 * @param {*} data 可选参数，其它需要在 Loader 链中传递的信息，比如 posthtml/posthtml-loader 就会通过这个参数传递参数的 AST 对象
 * @returns
 */
function BLoader(source, sourceMap, data) {
  const callback = this.async();

  callback(null, source, sourceMap, data);
}
module.exports.pitch = function (source, sourceMap, data) {

  console.log( source, sourceMap, data);
}
module.exports.default = BLoader;
