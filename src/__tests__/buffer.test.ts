import fs from 'fs-extra';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { bufferToStream } from '../';

describe('buffer', () => {
  const DIRECTORY = 'tmp/buffer';

  const waitForStreamFinish = (stream: fs.WriteStream) =>
    new Promise(resolve => stream.on('finish', resolve));

  describe('bufferToStream()', () => {
    it('should be able to convert a buffer with a JSON object to a stream', async () => {
      await fs.mkdirp(DIRECTORY);
      const buffer = await fs.readFile(
        path.join(__dirname, 'fixtures/object.json')
      );
      const filepath = path.join(DIRECTORY, uuid());
      const writeStream = fs.createWriteStream(filepath);
      await waitForStreamFinish(bufferToStream(buffer).pipe(writeStream));
      expect(await fs.readFile(filepath, 'utf8')).toEqual(
        await fs.readFile(path.join(__dirname, 'fixtures/object.json'), 'utf8')
      );
      await fs.remove(filepath);
    });

    it('should be able to convert a buffer with a JSON array to a stream', async () => {
      await fs.mkdirp(DIRECTORY);
      const buffer = await fs.readFile(
        path.join(__dirname, 'fixtures/array.json')
      );
      const filepath = path.join(DIRECTORY, uuid());
      const writeStream = fs.createWriteStream(filepath);
      await waitForStreamFinish(bufferToStream(buffer).pipe(writeStream));
      expect(await fs.readFile(filepath, 'utf8')).toEqual(
        await fs.readFile(path.join(__dirname, 'fixtures/array.json'), 'utf8')
      );
      await fs.remove(filepath);
    });
  });
});
