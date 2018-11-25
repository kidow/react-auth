const Book = require('../../models/book')

exports.list = async (req, res) => {
  let books
  try {
    books = await Book.find()
                      .sort({ _id: -1})
                      .limit(3)
                      .exec()
    res.json(books)
  } catch (e) {
    res.status(500)
    console.log(e)
  }
};

exports.get = async (req, res) => {
  const { id } = req.params
  let book
  try {
    book = await Book.findById(id).exec()
    if (!book) {
      res.status(404)
      res.json({ message: 'book not found' })
      return
    }
    res.json(book)
  } catch (e) {
    if (e.name === 'CastError') {
      ctx.status = 400
      return
    }
    res.status(500)
    console.log(e)
  }
}

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

exports.delete = async (req, res) => {
  const { id } = req.params
  try {
    await Book.findByIdAndRemove(id).exec()
    res.status(204)
  } catch (e) {
    if (e.name === 'CastError') {
      ctx.status = 400;
      return;
    }
    res.status(500)
    console.log(e)
  }
};

exports.replace = (req, res) => {
  res.send('replaced');
};

exports.update = (req, res) => {
  res.send('updated');
};