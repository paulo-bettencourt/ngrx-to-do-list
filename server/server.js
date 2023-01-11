const express = require('express')
const app = express()
const mongoose = require('mongoose');
app.use(express.json())

// Variables
var items = [];


// Methods

async function main() {
  await mongoose.connect('mongodb+srv://marketplace:marketplace@cluster0.pnqz7ob.mongodb.net/?retryWrites=true&w=majority');
}

app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world', req)
})

app.post('/post-to-do', (req,res) => {

  items.push(req.body.item)
  console.log("item: ", req.body.item)
  res.status(200).send({'items added: ': items});
})

mongoose.set('strictQuery', false);
main().catch(err => console.log(err));
