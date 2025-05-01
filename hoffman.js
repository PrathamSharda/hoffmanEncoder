
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
    //console.log(hash);
    for(let [char,freq] of hash)
    {
 
        nodes.push(new hoffmanNode(char,freq,null,null));
        

    }
    nodes.sort((a, b) => a.freq - b.freq);
   
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
 
    //console.log(codes);
    for(let char of data)
    {
        
        let num=codes.get(char);
        
        newData+=num;
        
    }
    let count=0;
    for (let char of newData){
        count++;
    }
    console.log(count);
     const paddingBits = 8 - (newData.length % 8);
     const paddedBits=newData+"0".repeat(paddingBits);
     
     const buffer=Buffer.alloc(Math.ceil(paddedBits.length/8));
     for(let i=0;i<paddedBits.length;i+=8)
     {
        const byte=parseInt(paddedBits.substring(i,i+8),2); 
        buffer[i/8]=byte;
     }
    let codename=fileName.replace('.txt', '.txt.codes');
    let binname=fileName.replace('.txt', '.bin')

    fs.writeFileSync(`${codename}`,stringCodes,"utf-8");
    fs.writeFileSync(`${binname}`,buffer,"utf-8");
    fs.unlinkSync(`${fileName}`);

}
module.exports={
    main
}