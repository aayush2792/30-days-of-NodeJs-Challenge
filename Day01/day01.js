const fs = require('fs');

function readFileContent(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err.message}`);
    } else {
      console.log('File Content:');
      console.log(data);
    }
  });
}

// Test Cases
readFileContent('file1.txt');

readFileContent('test-files/empty-file.txt');

readFileContent('test-files/nonexistent-file.txt');
