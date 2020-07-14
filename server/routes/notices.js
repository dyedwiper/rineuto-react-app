const router = require('express').Router();
const Notice = require('../models/Notice');
const authenticate = require('../middleware/authenticate');
const { validateNotice } = require('../middleware/validation');
const { readFileWithMulter } = require('../middleware/readFileWithMulter');
const { uploadToCloudinary } = require('../middleware/uploadToCloudinary');

router.get('/', (req, res) => {
  Notice.find()
    .then((notices) => res.json(notices))
    .catch((err) => res.status(400).json(err));
});

router.post('/', authenticate, readFileWithMulter, uploadToCloudinary, validateNotice, (req, res) => {
  const date = Date.now();
  let newNotice;
  if (req.file) {
    newNotice = new Notice({
      date,
      ...req.body,
      imageUrl: req.file.path,
    });
  } else {
    newNotice = new Notice({ date, ...req.body });
  }
  newNotice
    .save()
    .then((newNotice) => res.json(newNotice))
    .catch((err) => res.status(400).json(err));
});

router.patch('/:id', authenticate, readFileWithMulter, uploadToCloudinary, validateNotice, (req, res) => {
  let noticeToUpdate;
  if (req.file) {
    noticeToUpdate = {
      ...req.body,
      imageUrl: req.file.path,
    };
  } else {
    noticeToUpdate = req.body;
  }
  Notice.findByIdAndUpdate(req.params.id, noticeToUpdate)
    .then(() => res.json('updated successfully'))
    .catch((err) => res.status(400).json(err));
});

router.delete('/:id', authenticate, (req, res) => {
  Notice.findByIdAndDelete(req.params.id)
    .then((deletedNotice) => res.json('Deleted ' + deletedNotice.title))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;