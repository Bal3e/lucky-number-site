function generateTogelNumbers(type) {
    // Data dari gambar (contoh)
    const kepala = [6,9,4,2];
    const ekor = [3,7,8,0];
    const color = [17,58];
    const diagram = [1,2,4,5];
    
    // Proses kombinasi angka
    let baseNumbers = [...kepala, ...ekor];
    
    // Faktor keberuntungan (Lucky Factor)
    // Dalam mitologi Tionghoa, angka keberuntungan sering dikaitkan dengan elemen numerologi.
    // Di sini, kami menjumlahkan angka dalam "color", kemudian mengambil modulus 10
    // untuk mendapatkan satu digit angka yang berfungsi sebagai faktor keberuntungan.
    let luckyFactor = color.reduce((a, b) => a + b, 0) % 10;
    
    // Angka spiritual (Spirit Number)
    // Dalam sistem angka mistis, produk dari angka-angka dapat mencerminkan harmoni universal.
    // Oleh karena itu, angka dalam diagram dikalikan dan kemudian diambil modulus 100
    // untuk menjaga agar hasilnya tetap dalam rentang yang relevan.
    let spiritNumber = diagram.reduce((a, b) => a * b, 1) % 100;
    
    // Pengolahan angka berdasarkan input user
    let result = [];
    for (let i = 0; i < 4; i++) {
        let num = (baseNumbers[i] + spiritNumber + luckyFactor) % 10;
        result.push(num);
    }
    
    // Output berdasarkan jenis togel (2D, 3D, 4D)
    switch (type) {
        case '2D':
            return `${result[2]}/${result[3]}`;
        case '3D':
            return `${result[1]}/${result[2]}/${result[3]}`;
        case '4D':
            return `${result[0]}/${result[1]}/${result[2]}/${result[3]}`;
        default:
            return 'Format tidak dikenali';
    }
}

// Contoh penggunaan
console.log(generateTogelNumbers('4D')); // Output: n/n/n/n


// function hitungPola(arr) {
//     const newArr = arr.filter((item) => item % 2 !== 0).reduce((a, b) => a + b, 0);
//     console.log(newArr);
// }
// hitungPola([1,2,3,4,5]);

function cariLokasiOnePiece(peta) {
    const result = [];
    const arrPeta = peta.split(" ").map((item) => item.split(""));
    for (let i = 0; i < arrPeta.length; i++) {
        for (let j = 0; j < arrPeta[i].length; j++) {
            if (arrPeta[i][j] === "X") {
                const res = [i, j];
                result.push(res);
            }
        }
    }
    console.log(result);
}

cariLokasiOnePiece("NENX WEXS EEXE XSEE")