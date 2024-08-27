// Byte lar arrayi
// let buffer = new ArrayBuffer(4); // [00000000, 00000000, 00000000, 00000000]

// ArrayBuffer dan foydalanishga misol
let chars = 'Salom Said'.split( '' );
let codePoints = chars.map(c => c.charCodeAt(0) );

let buffer = new ArrayBuffer(10);
let bufferUint8Array = new Uint8Array(buffer);

codePoints.forEach((cp, index) => {
    bufferUint8Array[index] = cp;
})
console.log(bufferUint8Array);

var utf8decoder = new TextDecoder('utf-8');
console.log(utf8decoder.decode(buffer))
