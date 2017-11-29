import {isSomeTypeNode} from './util'
import vnode from './vnode'

const TEXT = 1
const PROP = 2


export default function diff(oldVNode, newVNode){
    let index = 0
    let directives = []
    diffVNode(oldVNode,newVNode,index,directives)
    return directives

}

function diffVNode(oldVNode,newVNode,index,directives){
    var patch = []

    if(newVNode && isSomeTypeNode(oldVNode,newVNode)){
        if(newVNode.nodeType===3 || newVNode.nodeType===8){
            if(oldVNode.text !== newVNode.text){
                directives.push({type:TEXT, content: newVNode})
            }
        } else if(newVNode.nodeType===1){
            if(oldVNode.tag === newVNode.tag && oldVNode.key == newVNode.key){
                var propPatches = diffProps(oldVNode.props, newVNode.props)
                if(Object.keys(propPatches).length>0){
                    directives.push({type:PROP, content: propPatches})
                }
                diffChildren(oldVNode.children,newVNode.children,directives)
            }
        }
    }
}

function diffProps(oldProps,newProps){
    let patches={}

    Object.keys(oldProps).forEach((prop)=>{
        if(newProps[prop] !== oldProps[prop]){
            patches[prop] = newProps[prop]
        }
    })
    Object.keys(newProps).forEach((prop)=>{
        if(!oldProps.hasOwnProperty(prop)){
            patches[prop] = newProps[prop]
        }
    })
    return patches
}

function diffChildren(oldChildren,newChildren,directives){
    let oldKeyIndexObject = parseNodeList(oldChildren)
    let newKeyIndexObject = parseNodeList(newChildren)
    let sameItems = []
    
    for(let key in oldKeyIndexObject){
        if(newKeyIndexObject.hasOwnProperty(key)){
            sameItems.push({'oldIndex':oldKeyIndexObject[key],'newIndex':newKeyIndexObject[key],'node':newChildren[newKeyIndexObject[key]]})
        }
    }
}

function parseNodeList(nodeList){
    let keyIndex = {}
    nodeList.forEach((item,i)=>{
        if(item.key){
            keyIndex[item.key] = i
        }
       
    })
    return keyIndex

}