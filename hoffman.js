
const fs=require("fs");
class hoffmanNode{
    constructor(num,freq,left,right){
        this.num=num;
        this.freq=freq;
        this.left=left;
        this.right=right;
    }
}

 function treeBuilder(nodes){
    while(nodes.length>1)
    {
        const left=nodes[0];
        const right=nodes[1];
        const newNode=new hoffmanNode(null,left.freq+right.freq,null,null);
        newNode.left=left;
        newNode.right=right;
        console.log('Merging nodes:', left, 'and', right); 
        nodes.splice(0,2);
        nodes.push(newNode);
        nodes.sort((a, b) => a.freq - b.freq);
    }
    
    return nodes[0];
 }
 function codeGenerator(node,code,codes)
 {

    if(node===null)return;

    if(node.num!==null){
        codes.set(node.num,code);
        return;
    }
    codeGenerator(node.left,code+"0",codes);
    codeGenerator(node.right,code+"1",codes);
 }

 function main(fileName){
    let hash=new Map();
    let data=fs.readFileSync(fileName,"utf-8");
    for (let char of data )
    {
        if (hash.has(char)) {
            hash.set(char, hash.get(char) + 1); 
        } else {
            hash.set(char, 1);
        }
    }
    let nodes=[];
    for(let [char,freq] of hash)
    {
 
        nodes.push(new hoffmanNode(char,freq,null,null));
        

    }
    nodes.sort((a, b) => a.freq - b.freq);
    console.log(nodes);
    let root=treeBuilder(nodes);
    let code="";
    let codes=new Map();
    codeGenerator(root,code,codes);
    let newData="";
    let stringCodes="";
    for(let [char,encode]of codes)
    {   
        stringCodes+=`${char}:${encode},`;

    }
    for(let char of data)
    {
        
        let num=codes.get(char);
        console.log(char,num);
        newData+=num;
        
    }
    console.log(newData);
    fs.writeFileSync("codes.txt",stringCodes,"utf-8");

    fs.writeFileSync("output.txt",newData,"utf-8");

}
main("input.txt");

module.exports={
    main
}