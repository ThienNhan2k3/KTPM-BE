const fs = require('fs');


// Remove the file
function removeFile(filePath) {
    fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error removing file: ${err}`);
          return;
        }
    })
}

module.exports = {
  removeFile
}

