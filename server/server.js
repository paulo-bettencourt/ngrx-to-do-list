// Server setup and imports
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
var cors = require('cors');
app.use(cors())
app.use(express.json());
app.listen(3000, () =>
  console.log('Server started listening on port 3000!')
);

// Mongoose Schema && Model
const ItemsList = new mongoose.Schema({items: String});
const ItemModel = mongoose.model('ItemsList', ItemsList);

// Express
async function main() { await mongoose.connect('mongodb+srv://marketplace:marketplace@cluster0.pnqz7ob.mongodb.net/?retryWrites=true&w=majority') }
main().catch(err => console.log(err));

// CRUD
app.get('/items', async (req, res) => {
  var list = await ItemModel.find({});
  res.status(200).send(list)
})

app.post('/item', (req,res) => {
  ItemModel.create({ items: req.body.item }, (error, document) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Document CREATED with ID ${document._id}`);
      res.status(200);
    }
  })
})

app.delete('/item/:id', (req,res)=> {
  console.log("ID PARA DELETAR", req.params.id),
  ItemModel.deleteOne({_id: req.params.id}, (error, document) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Document DELETED`);
      res.send(200);
    }
  })
})


