import VNode from './src/vnode'

var children = [new VNode('h3','t3',{'data-title':'title1'},'vnode-title',null),new VNode('div','t3',{'style':{'background':'#ea8e8e','width':'100px','height':'100px'}},null,null)]
var nodes = new VNode('div','t3',null,null,children)

console.log(nodes)