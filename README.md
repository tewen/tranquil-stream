## Tranquil Stream

Stream utilities to make quick results a little easier.

### Installation

```BASH
npm install --save tranquil-stream
```

### Getting Started

Just require the module, every method lives at the top level.

### Methods

#### bufferToStream(buffer)

Take a buffer object and make it into a Duplex stream.

```JavaScript
const stream = bufferToStream(await fs.readFile('some/path/here.txt'));
``` 

#### jsonStreamToObject(stream)

Takes a stream object that contains stringified JSON data and parses it into an object (async).

```JavaScript
const obj = await jsonStreamToObject(fs.createReadStream('my-json-file.json'));

// obj is just the exact, parsed json as an object
``` 
