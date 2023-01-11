const express = require('express')
const app = express()
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
app.use(express.json())

// Mongoose Schema && Model

const itemsList = new mongoose.Schema({
  items: String
});
const ItemModel = mongoose.model('ItemsList', itemsList);

// Express

async function main() {
  await mongoose.connect('mongodb+srv://marketplace:marketplace@cluster0.pnqz7ob.mongodb.net/?retryWrites=true&w=majority');
}

app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);

app.get('/', (req, res) => {
  res.send('hello world', req)
})

app.post('/post-to-do', (req,res) => {

  ItemModel.create({ items: req.body.item }, (error, document) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Document created with ID ${document._id}`);
    }
  })

  res.status(200).send({ok: 'ok'});
})


main().catch(err => console.log(err));
