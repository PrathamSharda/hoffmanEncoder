
const fs=require("fs");


async function decode(fileName)
{
    return new Promise(function(resolve,reject)
{
    try{
        let codename=fileName.replace('.bin', '.txt.codes');
        let textFile=fileName.replace('.bin', '.txt');
        console.log(`decompressing ${textFile}...............`);
        const hash= new Map();
        const writer=fs.createWriteStream(`${textFile}`,{encoding:'utf-8'});
        let count=0;
        const encodedData = fs.readFileSync(`${codename}`, "utf-8");
        const codesObject = JSON.parse(encodedData);
        for (const [char, code] of Object.entries(codesObject)) {
        hash.set(code, char);
        }
        const data = fs.createReadStream(`${fileName}`,{highWaterMark:1024*1024}); // ReturnBuffer ;
        data.on('data', function(chunks) {
            let Data = "";
            let paddingBits = 0;
            paddingBits = parseInt(chunks.readUInt8(0), 10);  
            for (let i = 1; i < chunks.length; i++) {
                const binaryString = chunks.readUInt8(i).toString(2).padStart(8, '0'); 
                Data += binaryString;  
            }
            let finalans = "";
            let newcode = "";
            for (let i = 0; i < Data.length; i++) {
                newcode += Data[i];  // Add bit to newcode
                if (hash.has(newcode)) {  // Check if newcode matches any Huffman code
                    finalans += hash.get(newcode);  // Append decoded character to finalans
                    count++;
                    newcode = "";
                }
            }
            if(finalans.trim().length > 0)
            writer.write(finalans);
        });
        data.on('end',function()
    {
        
        console.log(`${textFile} is decompressed`);
        writer.end();
        resolve("sucess");
    })
    data.on('error',function(error)
    {
        throw error;
    })

    }
    catch(error)
    {
        console.log(error);
        reject(error);
        throw error;
    }

})
     
}
module.exports={
    decode
}