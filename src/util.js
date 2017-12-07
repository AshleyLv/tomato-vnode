
export function isSomeTypeNode(node1,node2){
    if(node1.nodeType===node2.nodeType){
        return true
    } else {
        return false
    }
}

export const TEXT = 1
export const PROP = 2
export const MOVE = 3
export const INSERT = 4
export const REMOVE = 5