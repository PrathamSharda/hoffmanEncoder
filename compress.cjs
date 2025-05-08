
const { Command } = require('commander');
const fs = require('fs');
const path = require('path');
const { main } = require("./hoffman.js");
const { decode } = require("./decode.js");

const program = new Command();

program
  .name('file compressor using huffman encoding')
  .description('CLI to compress file using Huffman encoding')
  .version('0.0.0');

program
  .option('-c, --compress <folder>', 'compress the files in a folder')
  .option('-d, --decompress <folder>', 'decompress a folder');

program.parse(process.argv);
const options = program.opts();

if (options.compress) {

  const folderPath = options.compress;  

  fs.readdirSync(folderPath).forEach(file => {

    
    if (file.endsWith('.txt')) { 
      async function compressor(){
      const filePath = path.join(folderPath, file);
      const text=await main(filePath);
      //fs.unlinkSync(`${folderPath}/${file}`);
      console.log(`${file} is compressed`);
      fs.unlinkSync(`${folderPath}/${file}`);
      }
      compressor();
    }else{
      fs.unlinkSync(`${folderPath}/${file}`);
    }
  });
} else if (options.decompress) {

  const folderPath = options.decompress; 

  fs.readdirSync(folderPath).forEach(file => {
    async function decompress()
    {
    if(file.endsWith(".txt")){
      throw "cannot decompress this file as this is not compressed";
    }
    else if (!file.endsWith(".codes")) { 

      const filePath = path.join(folderPath, file);
      const text=await decode(filePath);
     fs.unlinkSync(`${folderPath}/${file}`)
      
    }else fs.unlinkSync(`${folderPath}/${file}`);
  }
  decompress();
  });
}
