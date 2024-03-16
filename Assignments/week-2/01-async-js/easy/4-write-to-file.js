const fs = require('fs');

function readData() {
    fs.readFile('4-write-to-file.md', 'utf-8', (err, data) => {
        fs.writeFile('4-write-to-file.md', data += "\nfrom fs write module - Thank You",'utf-8',() => {})

        console.log(data);
    })
    
}

readData()

// fs.writeFile('4-write-to-file.md',data += 'from js code', (e)=>{console.log(e);})