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
			case INSERT:
				insertNode(node,directive.node,directive.index)
			default:
			console.log('current node------' + node.key + '----' + MOVE)
		}
		
	}



}

function setProps(node,props){
	Object.keys(props).forEach((prop,i)=>{
		if(props[prop]){
			if(prop==='style'){
				Object.keys(props[prop]).forEach((item,i)=>{
					node.style[item] = props[prop][item]
				})
			} else {
				node.setAttribute(prop, props[prop])
			}
		}
		else
			node.removeAttribute(prop)
	})
}

function setContent(node,content){
	node.textContent = content
}

function removeNode(node){
	node.parentNode.removeChild(node)
}
function insertNode(parentNode,newNode,index){
	let newElm = newNode.render()
	if(parentNode.childNodes.length>index){
		parentNode.insertBefore(newElm,parentNode.childNodes[index])
	} else {
		parentNode.appendChild(newElm)
	}
}
function reorderChildren(node,key,newIndex){

}
//test1 -- props test7--move3-1 test8--insert
//test5 test7
//test5 1-1, test7 3-2, test8 3
//5 7
//8 5 7