const upload = (req, res) => {
  if (!req.files) return res.status(400).send('No files were uploaded.');

  // The name of the input field (i.e. "sampleFile")
  // is used to retrieve the uploaded file
  const sampleFile = req.files.sampleFile;

  const course = req.body.course;
  const filename = sampleFile.name;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(`public/files/${course}/${filename}`, err => (err ?
  res.status(500).send(err) : res.redirect('back')));
};

module.exports = upload;
