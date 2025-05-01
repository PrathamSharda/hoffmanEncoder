
const fs=require("fs");


async function decode(fileName)
{
    console.log(fileName);
    let codename=fileName.replace('.bin', '.txt.codes');
    const data = fs.readFileSync(fileName); // ReturnBuffer
    let Data="";
    for(let i=0;i<data.length;i++){
      const byte = data.readUInt8(i); // Read the first byte
      const binaryString = byte.toString(2).padStart(8, '0');
        Data+=binaryString;
    }
    const encode =fs.readFileSync(`${codename}`,"utf-8");
   // console.log(Data);
    const hash= new Map();

    const codes=encode.split(",");

    for(let i=0;i<codes.length;i++)
    {
        if(codes[i]!=="")
        {        
        const [char,code]=codes[i].split(":");

        hash.set(code,char);
        }
}

let finalans="";

let newcode="";

for(let i=0;i<Data.length;i++)
{
    newcode+=Data[i];

    if(hash.get(newcode)!==undefined)
    {
        finalans+=hash.get(newcode);
        newcode="";
    }
}
    fs.unlinkSync(`${fileName}`);
     fileName=fileName.replace('.bin', '.txt');
    fs.writeFileSync(`${fileName}`,finalans,"utf-8");
       // console.log(finalans);
     
}
module.exports={
    decode
}