
export function isSomeTypeNode(node1,node2){
    if(node1.nodeType===node2.nodeType){
        return true
    } else {
        return false
    }
}