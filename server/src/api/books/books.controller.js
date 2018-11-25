const Book = require('../../models/book')

exports.list = (req, res) => {
  res.send('listed');
};

exports.create = async (req, res) => {
  const { title, authors, publishedDate, price, tags } = req.body
  const book = new Book({ title, authors, publishedDate, price, tags })
  try {
    await book.save()
    res.json(book)
  } catch (e) {
    res.status(500)
    console.log(e)
  }
};

exports.delete = (req, res) => {
  res.send('deleted');
};

exports.replace = (req, res) => {
  res.send('replaced');
};

exports.update = (req, res) => {
  res.send('updated');
};