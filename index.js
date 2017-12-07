import VNode from './src/vnode'
import diff from './src/diff'
import patch from './src/patch'

/* var children = [new VNode('h3',1,'test5',{'data-title':'title1','width':'300'},'vnode-title',[new VNode(null,3,'test6',null,'This is tle')]),new VNode('div',1,'test7',{'style':{'background':'#ea8e8e','width':'100px','height':'100px'}},null,null)]
  var newChildren = [new VNode('h3',1,'test5',{'data-title':'titl','width':'300'},'vnode-title',[new VNode(null,3,'test6',null,'This is title')]),new VNode('div',1,'test8',{'style':{'background':'#ea8e8e','width':'100px','height':'100px'}},null,null),new VNode('div',1,'test7',{'style':{'background':'#ea8e8e','width':'100px','height':'100px'}},null,null)]
*/// var nodes = new VNode('div',1,{'data-org':'test'},null,children)
var oldNodes = new VNode('div',1,'test1',{'data-org':'test','data-cc':'ccs'},null,null)
var newNodes = new VNode('div',1,'test1',{'data-cc':'ccc'},null,null)
var el =oldNodes.render()
document.body.appendChild(el)
var directives = diff(oldNodes,newNodes)
console.log(directives)
patch(el,directives)