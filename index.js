import VNode from './src/vnode'

var children = [new VNode('h3',1,{'data-title':'title1'},null,[new VNode(null,3,null,'title',null)]),new VNode('div',1,{'style':{'background':'#ea8e8e','width':'100px','height':'100px'}},null,null)]
var nodes = new VNode('div',1,null,null,children)
nodes.render()
console.log(nodes)