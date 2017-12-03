import {isSomeTypeNode} from './util'
import vnode from './vnode'

const TEXT = 1
const PROP = 2
const MOVE = 3
const INSERT = 4
const REMOVE = 5


export default function diff(oldVNode, newVNode){
    let index = 0
    let directives = []
    diffVNode(oldVNode,newVNode,directives)
    console.log(directives)
    return directives

}

function diffVNode(oldVNode,newVNode,directives){
    var patch = []

    if(newVNode && isSomeTypeNode(oldVNode,newVNode)){
        if(newVNode.nodeType===3 || newVNode.nodeType===8){
            if(oldVNode.text !== newVNode.text){
                directives.push({type:TEXT, content: newVNode,key:newVNode.key})
            }
        } else if(newVNode.nodeType===1){
            if(oldVNode.tag === newVNode.tag && oldVNode.key == newVNode.key){
                var propPatches = diffProps(oldVNode.props, newVNode.props)
                if(Object.keys(propPatches).length>0){
                    directives.push({type:PROP, content: propPatches,key:newVNode.key})
                }
                if(oldVNode.children || newVNode.children)
                    diffChildren(oldVNode.children,newVNode.children,directives)
            }
        }
    }
}

function diffProps(oldProps,newProps){
    let patches={}

    Object.keys(oldProps).forEach((prop)=>{
        if(prop === 'style' && newProps[prop]){
            let newStyle = newProps[prop]
            let isSame = true
            Object.keys(oldProps[prop]).forEach((item)=>{
                if(prop[item] !== newStyle[item]){
                    isSame = false
                }
            })
            if(isSame){
                Object.keys(newStyle).forEach((item)=>{
                    if(!prop.hasOwnProperty(item)){
                        isSame = false
                    }
                })
            }
            if(!isSame)
                patches[prop] = newProps[prop]
            
        }
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
    oldChildren = oldChildren || []
    newChildren = newChildren || []
    let oldKeyIndexObject = parseNodeList(oldChildren)
    let newKeyIndexObject = parseNodeList(newChildren)
    let sameItems = []
    for(let key in oldKeyIndexObject){
        if(newKeyIndexObject.hasOwnProperty(key)){
            if(oldKeyIndexObject[key] !== newKeyIndexObject[key]){
                let moveObj = {'oldIndex':oldKeyIndexObject[key],'newIndex':newKeyIndexObject[key],'node':newChildren[newKeyIndexObject[key]]}
                sameItems.push(moveObj)
                
                directives.push({type:MOVE, node:moveObj})
            }
            diffVNode(oldChildren[oldKeyIndexObject[key]],newChildren[newKeyIndexObject[key]],directives)
        } else {
            directives.push({type:REMOVE,index:oldKeyIndexObject[key],key:key})
        }
    }
    for(let key in newKeyIndexObject){
        if(!oldKeyIndexObject.hasOwnProperty(key)){
            directives.push({type:INSERT,index:newKeyIndexObject[key],node:newChildren[newKeyIndexObject[key]]})
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
/*test1 
test2,test3,test5
test2--test8,test3-test10

test1
test6,test2,test7,test3
test2--test8,test7-test9,test3-test9

test1:prop
test2 move,test3-remove,test5-remove,test6-insert,test7-insert
test8--prop,test10-remove,test9-insert




*/