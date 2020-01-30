'use strict';

const fs = require('fs');
const directoryRoot = './public/assets/lib/';
let paths = [];
let index = 0;

/**
 * @name deleteFiles
 * @description Remove all files from a directory, then delete the directory root.
 * @param {String} path Initial path for file removing function.
 * @returns {boolean} Returns true when the proccess over, other wise throw an error.
 */
async function deleteFiles(path) {
  const dir = await fs.promises.opendir(path);

  for await (const dirent of dir) {
    if (dirent.name !== 'node_modules' && dirent.name.indexOf('.') !== 0) {
      if (dirent.isDirectory()) {
          paths.push(`${path}${dirent.name}/`);
      } else if (dirent.isFile()) {
        console.log(`Remove ${path}${dirent.name} file.`);
        fs.unlinkSync(`${path}${dirent.name}`);
      }
    }
  }

  if (paths.length && paths.length !== index) {
    return deleteFiles(paths[index++]);
  } else {
    return true;
  }
}

// Start process calling the main function
deleteFiles(directoryRoot)
  .then((result)=> {
    console.log(result);
    // TODO: Copy libraries from node_modules to public/assets/lib/
  })
  .catch(console.error);
