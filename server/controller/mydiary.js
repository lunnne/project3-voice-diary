const multer = require('multer');
const { Readable } = require('stream');
const { ObjectId } = require('mongodb');

exports.createRecording = async (req, res) => {
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage, limits: { fileSize: 6000000 } });

  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: 'Upload Request Validation Failed' });
    } else if (!req.body.name) {
      return res.status(400).json({ message: 'No track name in request body' });
    }

    const readStream = Readable.from(req.file.buffer);

    const options = { filename: req.body.name, contenttype: 'audio/wav' };
    req.app.locals.Attachment.write(options, readStream, (err, file) => {
      if (err) return res.status(400).json({ message: 'Bad Request' });
      else {
        console.log('Posted! \n' + file.toString());
        return res.status(200).json(file);
      }
    });
  });
};

exports.getAllRecordings = async (req, res) => {
  req.app.locals.Attachment.find()
    .then((allRecordings) => res.json(allRecordings))
    .catch((err) => console.log(err));
};

exports.getRecording = async (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json({
      message: 'Invalid trackID in URL parameter.',
    });
  }
  res.set('content-type', 'audio/wav');
  res.set('accept-ranges', 'bytes');

  try {
    const reader = req.app.locals.Attachment.read({ _id: ObjectId(req.params.id) });
    reader.on('data', (chunk) => {
      res.write(chunk);
    });
    reader.on('close', () => {
      console.log('All Sent!');
      res.end();
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: 'Cannot find files that have the ID!',
    });
  }
};

exports.deleteRecording = (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({
      message: 'Invalid trackID in URL parameter.',
    });
  }

  req.app.locals.Attachment.unlink({ _id: ObjectId(req.params.id) }, (err, file) => {
    if (err) {
      console.log('Failed to delete\n' + err);
      return res.status(400).json({
        message: 'Wrong Request',
        error: err.message,
      });
    }

    console.log('Deleted\n' + file);
    return res.status(200).json({
      file: file,
    });
  });
};
