const router = require('express').Router();
const Serial = require('../models/Serial');
const authenticate = require('../middleware/authenticate');
const { validateSerial } = require('../middleware/validation');
const { readFileWithMulter } = require('../middleware/readFileWithMulter');
const { uploadToCloudinary } = require('../middleware/uploadToCloudinary');

router.get('/', (req, res) => {
  Serial.find()
    .then((serials) => res.json(serials))
    .catch((err) => res.status(400).json(err));
});

router.post('/', authenticate, readFileWithMulter, uploadToCloudinary, validateSerial, (req, res) => {
  let newSerial;
  if (req.file) {
    newSerial = new Serial({
      ...req.body,
      imageUrl: req.file.path,
    });
  } else {
    newSerial = new Serial(req.body);
  }
  newSerial
    .save()
    .then((serial) => res.json(serial))
    .catch((err) => res.status(400).json(err));
});

router.patch('/:id', authenticate, readFileWithMulter, uploadToCloudinary, validateSerial, (req, res) => {
  let serialToUpdate;
  if (req.file) {
    serialToUpdate = {
      ...req.body,
      imageUrl: req.file.path,
    };
  } else {
    serialToUpdate = req.body;
  }
  Serial.findByIdAndUpdate(req.params.id, serialToUpdate)
    .then(() => res.json('updated successfully'))
    .catch((err) => res.status(400).json(err));
});

router.delete('/:id', authenticate, (req, res) => {
  Serial.findByIdAndDelete(req.params.id)
    .then((deletedSerial) => res.json('Deleted ' + deletedSerial.title))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
