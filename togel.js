import {readFile, appendFile} from 'fs/promises';
// try {
//     const data = await readFile('datajawatogel2025.txt', 'utf8');
//     console.log(data);
// } catch (error) {
//     console.log(error.mmessage);
// }

try {
    // await appendFile('datajawatogel2025.txt', '\nData tambahan', 'utf8');
    // console.log('Data berhasil ditambahkan');
    const data = await readFile('datajawatogel2025.txt', 'utf8');
    const dataArr = data.split('\n').map((item) => item.trim());
    console.log(dataArr.includes('1518'))
    // dataArr.forEach((item, index) => {
    //     if(item.includes(keyword)){
    //         console.log(`Data ditemukan pada baris ke-${index + 1}`);
    //     }
    //     // console.log(`${index + 1}. ${item}`);
    // });

} catch (error) {
    console.log(error.message);
}
