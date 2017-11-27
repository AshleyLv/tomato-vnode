import {isSomeTypeNode} from './util'
import vnode from './vnode'

const TEXT = 1
const PROP = 2


export default function diff(oldVNode, newVNode){
    let index = 0
    let patches = []
    diffVNode(oldVNode,newVNode,index,patches)
    return patches

}

function diffVNode(oldVNode,newVNode,index,patches){
    var patch = []

    if(newVNode && isSomeTypeNode(oldVNode,newVNode)){
        if(newVNode.nodeType===3 || newVNode.nodeType===8){
            if(oldVNode.text !== newVNode.text){
                patch.push({type:TEXT, content: newVNode})
            }
        } else if(newVNode.nodeType===1){
            if(oldVNode.tag === newVNode.tag && oldVNode.key == newVNode.key){
                var propPatches = diffProps(oldVNode.props, newVNode.props)
                if(Object.keys(propPatches).length>0){
                    patch.push({type:PROP, content: propPatches})
                }
                diffChildren(oldVNode.children,newVNode.children)
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

function diffChildren(oldChildren,newChildren){

}