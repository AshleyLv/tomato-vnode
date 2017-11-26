import VNode from './src/vnode'

var children = [new VNode('h3',1,{'data-title':'title1','width':'300'},'vnode-title',[new VNode(null,3,null,'This is title')]),new VNode('div',1,{'style':{'background':'#ea8e8e','width':'100px','height':'100px'}},null,null),new VNode(null,8,null,'comments')]
var nodes = new VNode('div',1,{'data-org':'test'},null,children)
var el =nodes.render()
document.body.appendChild(el)


console.log(nodes)