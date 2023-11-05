const key = "123";

const personas = {
  nombre: ['julian', 'juan', 'jose'],
  edad: [12, 15, 16],
  localidad: ['colombia', 'mexico', 'panama'],
};

window.crypto.subtle.generateKey(
  { name: "AES-GCM", length: 256 },
  true,
  ["encrypt", "decrypt"]
).then(function (cryptoKey) {
  encryptAndPrintData(personas, cryptoKey);
});

function encryptAndPrintData(data, key) {
  const encryptedData = {};

  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      const values = data[prop];
      const isNumeric = prop === 'edad';

      encryptData(values, key).then(function (encryptedValues) {
        encryptedData[prop] = { data: encryptedValues, isNumeric };
        if (Object.keys(encryptedData).length === Object.keys(data).length) {
          console.log('Objeto cifrado:', encryptedData);
          decryptAndPrintData(encryptedData, key);
        }
      });
    }
  }
}

function decryptAndPrintData(encryptedData, key) {
  const decryptedData = {};

  for (const prop in encryptedData) {
    if (encryptedData.hasOwnProperty(prop)) {
      const { data, isNumeric } = encryptedData[prop];

      decryptData(data, key).then(function (decryptedValues) {
        const values = isNumeric
          ? decryptedValues.map(Number)
          : decryptedValues;

        decryptedData[prop] = values;
        if (Object.keys(decryptedData).length === Object.keys(encryptedData).length) {
          console.log('Objeto descifrado:', decryptedData);
        }
      });
    }
  }
}

function encryptData(data, key) {
  const encryptedPromises = data.map((value) => {
    return window.crypto.subtle.encrypt(
      { name: "AES-GCM", iv: new Uint8Array(12) },
      key,
      new TextEncoder().encode(value.toString())
    );
  });

  return Promise.all(encryptedPromises).then((encryptedValues) => {
    const encryptedArray = encryptedValues.map((encrypted) => {
      return Array.from(new Uint8Array(encrypted))
        .map(byte => ('0' + byte.toString(16)).slice(-2))
        .join('');
    });

    return encryptedArray;
  });
}

function decryptData(encryptedArray, key) {
  const decryptedPromises = encryptedArray.map((encryptedValue) => {
    const encryptedBytes = new Uint8Array(encryptedValue.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    return window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv: new Uint8Array(12) },
      key,
      encryptedBytes
    ).then((decrypted) => {
      return new TextDecoder().decode(decrypted);
    });
  });

  return Promise.all(decryptedPromises);
}

let buttonStart = document.querySelector(".buttonStart");

buttonStart.addEventListener("click", () =>{
    window.location.href = "./login/index.php";
});