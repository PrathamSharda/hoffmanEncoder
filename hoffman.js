
const fs=require("fs");
//class of hufmman tree
class hoffmanNode{
    constructor(num,freq,left,right){
        this.num=num;
        this.freq=freq;
        this.left=left;
        this.right=right;
    }
}
//building the huffman tree
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
 //getting the huffman codes from the tree
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

 //main funtion with logic
 async function main(fileName){
    return new Promise(function(resolve,reject)
{
    try{
        let count=0;
        const reader=fs.createReadStream(`${fileName}`,{encoding:'utf-8'}); 
let hash=new Map();
const codename=fileName.replace(".txt",".txt.codes");
const binname=fileName.replace(".txt",".bin");
let total=0;
let codes=new Map();
const writer = fs.createWriteStream(binname);
console.log(`compressing ${fileName}..........`);
reader.on('data',function(chucks){
    total+=chucks.length;
    for (let char of chucks )
        {
            if (hash.has(char)) {
                hash.set(char, hash.get(char) + 1); 
            } else {
                hash.set(char, 1);
            }
        }
})
reader.on('error',function(error){
    throw error;
})

reader.on('end',function()
{
       
    let nodes=[];

for(let [char,freq] of hash)
{

    nodes.push(new hoffmanNode(char,freq,null,null));
}
nodes.sort((a, b) => a.freq - b.freq);
let root=treeBuilder(nodes);
let code="";

codeGenerator(root,code,codes);

let stringCodes="";
let codesObject = {};
for(let [char, encode] of codes) {
  codesObject[char] = encode;
}
fs.writeFileSync(`${codename}`, JSON.stringify(codesObject));
console.log("writting in file........");

const reader2=fs.createReadStream(`${fileName}`,{encoding:'utf-8'},{highWaterMark:1024*1024});
reader2.on('data',function(chucks){
    //console.log(codes);
    let newData="";
    for(let char of chucks)
    {
        count++;
        let num=codes.get(char);

        newData+=num;
        
    }
    let paddingBits = 8 - (newData.length % 8);
    if (paddingBits === 8) paddingBits = 0; 
    const paddedBits = newData + "0".repeat(paddingBits);
    let buffer = Buffer.alloc(1 + Math.ceil(paddedBits.length / 8));
    buffer[0] = paddingBits;
    for (let i = 0; i < paddedBits.length; i += 8) {
      const byte = parseInt(paddedBits.substring(i, i + 8), 2);
      buffer[1 + (i / 8)] = byte; 
    }
    writer.write(buffer);
    buffer=null;
    });
    reader2.on('end',function(){
    
  const originalSize = total; 
  const stats = fs.statSync(fileName.replace('.txt', '.bin'));
  const compressedSize = stats.size;
  
  // Log compression statistics
  console.log(`Original size: ${count} bytes`);
  console.log(`Compressed size: ${compressedSize} bytes`);
  console.log(`Compression ratio: ${(originalSize / compressedSize).toFixed(2)}:1`);
    writer.end();
    resolve("success");
})
    

});
    }
catch(error){
    console.log(error);
    reject("error occured");
    throw 'error';
}
})
   
}
module.exports={
    main
}