#!/usr/bin/env node
const path = require("path");
const fs = require("fs");
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

yargs(hideBin(process.argv))
  .command('convert [input]', 'convert config json to application.properties', (yargs) => {
    return yargs.positional("input", {
      describe: "The json file to convert to a application.properties file"
    }).option("output", {
      alias: 'o',
      describe: "The output file, default is ./application.properties",
      default: "./application.properties"
    });
  }, (argv) => {

    const inputFileUri = path.resolve(process.cwd(), argv.input);
    const outputFileUri = path.resolve(process.cwd(), argv.output);

    console.log(`Converting ${inputFileUri} to ${outputFileUri}`);
    
    const inputFile = fs.readFileSync(inputFileUri);
    let inputFileData = "";

    try{
      inputFileData = JSON.parse(inputFile);
    } catch(e){
      console.error(e);
      console.error(`Unable to parse ${inputFileUri}`);
      console.error(`With content ${inputFile}`);
      process.exit(1);
    }

    let outputFileContent = "";

    const keys = Object.keys(inputFileData);

    for(let key of keys){
      outputFileContent += `${key}=${inputFileData[key]}\n`;
    }

    fs.writeFileSync(outputFileUri, outputFileContent);

    console.log("Done!");
  })
  .strictCommands()
  .demandCommand(1)
  .parse();








