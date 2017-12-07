import vnode from './vnode'
import {isSomeTypeNode,TEXT,PROP,MOVE,INSERT,REMOVE} from './util'

export default function patch(node,directives){
	if(node){
		var orderList = []
		for(let child of node.childNodes){

			patch(child,directives)
		}
		if(directives[node.key]){
			applyPatch(node,directives[node.key])
		}
	}

}

function applyPatch(node, directives){
	
	for(let directive of directives){
		switch (directive.type){
			case TEXT:
				setContent(node,directive.content)
				break
			case PROP:
				setProps(node,directive.content)
				break
			case REMOVE:
				removeNode(node)
				break
			default:
			console.log('current node------' + node.key + '----' + MOVE)
		}
		
	}



}

function setProps(node,props){
	Object.keys(props).forEach((prop,i)=>{
		if(props[prop])
			node.setAttribute(prop, props[prop])
		else
			node.removeAttribute(prop)
	})
}

function setContent(node,content){
	node.textContent = content
}

function removeNode(node){
	
}

function reorderChildren(node,directive){

}
