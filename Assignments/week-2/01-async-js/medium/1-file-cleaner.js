const fs = require('fs');

fs.readFile('file.txt', 'utf-8', (e,d) => {
    const afterRemoving = removeExtraSpace(d);
    // console.log(afterRemoving);
    fs.writeFile('file.txt', afterRemoving, () => {});
})

function removeExtraSpace(data){
    // console.log(data);
    return data.replace(/\s{2,}/g,' ');
}