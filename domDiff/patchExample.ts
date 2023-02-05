//补丁包的示例

const patchExample = {
    //需要打补丁的节点标号
    0:[ 
        //每个节点的补丁是一个数组

        //每个具体的补丁用一个对象刻画
        {
            type:'ATTR', //补丁的类型
            attrs:{} //需要更新或修改的值
        },
        {
            //一个节点可以有多个补丁对象
        }
    ],
    1:[
        {
            type:'TEXT',
            text:newText //需要更新的文本值
        }
    ],
    2:[
        {
            type:'REMOVE', //需要移除的节点
            index:2
        }
    ],
    3:[
        {
            type:'REPLACE', //需要替换的节点
            node:newNode
        }
    ]
}