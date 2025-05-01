
const fs=require("fs");


function decode(fileName)
{
    let codename=fileName+".codes----";

    const data =fs.readFileSync(`${fileName}`,"utf-8");

    const encode =fs.readFileSync(`${codename}`,"utf-8");

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

for(let i=0;i<data.length;i++)
{
    newcode+=data[i];

    if(hash.get(newcode)!==undefined)
    {
        finalans+=hash.get(newcode);
        newcode="";
    }
}
    fs.writeFileSync(`${fileName}`,finalans,"utf-8");
console.log(finalans);

    
}
module.exports={
    decode
}