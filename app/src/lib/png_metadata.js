// import { extractChunks } from 'png-chunks-extract';
import extractChunks from 'png-chunks-extract';
// const {extractChunks} = pkg;
// import { encode } from 'png-chunks-encode';
import encodeChunks from 'png-chunks-encode';
// const {encode} = pkg2;

// Example usage:
// const json = JSON.stringify({ key: 'value' });
// const newDataURL = insertMetadataInPNG(originalDataURL, json);

// Convert the dataURL to a binary buffer
function dataURLToArrayBuffer(dataURL) {
  const binaryString = atob(dataURL.split(',')[1]);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

// Convert the ArrayBuffer back to a data URL
function arrayBufferToDataURL(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return 'data:image/png;base64,' + btoa(binary);
}

// Insert JSON metadata
function insertMetadataInPNG(dataURL, json) {
  const buffer = dataURLToArrayBuffer(dataURL);
  const chunks = extractChunks(new Uint8Array(buffer));

  // Create a tEXt chunk with the JSON string
  const textChunk = {
    name: 'tEXt',
    data: new TextEncoder().encode('gordianData\0' + json) // Key-value pair: gordianData\0 followed by the JSON string
  };

  // Add the new chunk before the IEND chunk
  chunks.splice(-1, 0, textChunk); // Insert before the last chunk (IEND)

  console.log(json);
  const newPNG = encodeChunks(chunks);
  return arrayBufferToDataURL(newPNG);
}

function getJsonDataFromPNG(dataURL) {
    const buffer = dataURLToArrayBuffer(dataURL);
    const chunks = extractChunks(new Uint8Array(buffer));
  
    // Search for the tEXt chunk with the keyword 'gordianData'
    for (const chunk of chunks) {
      if (chunk.name === 'tEXt') {
        const text = new TextDecoder().decode(chunk.data);
        const [key, value] = text.split('\0'); // Split the chunk into key and value
        if (key === 'gordianData') {
          return JSON.parse(value); // Return the parsed JSON data
        }
      }
    }
  
    return null;
}
  
export { insertMetadataInPNG, getJsonDataFromPNG };