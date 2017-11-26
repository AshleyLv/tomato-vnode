import {isSomeTypeNode} from './util'
import vnode from './vnode'


export function diff(oldVNode, newVNode){
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
                patch.push(newVNode)
            }
        } else if(newVNode.nodeType===1){
            if(oldVNode.tag === newVNode.tag && oldVNode.key == newVNode.key){
                
            }
        }
    }
}

function diffProps(){

}

function diffChildren(){

}