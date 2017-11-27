import VNode from './src/vnode'
import diff from './src/diff'

// var children = [new VNode('h3',1,{'data-title':'title1','width':'300'},'vnode-title',[new VNode(null,3,null,'This is title')]),new VNode('div',1,{'style':{'background':'#ea8e8e','width':'100px','height':'100px'}},null,null),new VNode(null,8,null,'comments')]
// var nodes = new VNode('div',1,{'data-org':'test'},null,children)
var oldNodes = new VNode('div',1,{'data-org':'test'},null,null)
var newNodes = new VNode('div',1,{'data-org':'test1','data-cc':'ccc'},null,null)
var el =oldNodes.render()
document.body.appendChild(el)
diff(oldNodes,newNodes)

console.log(oldNodes)