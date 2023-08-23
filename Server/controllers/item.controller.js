const db = require("../models");
const Item = db.item;

// Retrieve all Items from the database.
exports.findAllItems = (req, res) => {
  Item.find()
  .then(items => {
    res.send(items);
    console.log("Getting all Items from database:", items);
  })
  .catch(err => {
    console.log(err);
  })

//   .sort([["createdAt", "descending"]]);
};

// Create and Save a new Item
exports.addItem = (req, res) => {
    console.log("Adding an item from controller:", req.body);
  
  const item = new Item({
    title: req.body.title,
    url: req.body.url,
    description: req.body.description
  });

  item.save(item)
  .then(data => {
    console.log("Adding item to database: ", data.title);
    res.send(data)
    // this.findAllItems();
  })
  .catch(err => {
    console.log("err:", err);
    // res.status(500).send({ message: err})
  })
};



// Find a single Item with an id
exports.findOne = (req, res) => {
  Item.findOne({ _id: req.params.id })
  .then((item) => {
    res.send({ item });
  })
  .catch(err => {
    res.status(500).send({ message: err });
    return;
  })
};

// Update a Item by the id in the request
exports.update = (req, res) => {
  console.log("updating:", req.params);
  console.log("body:", req.body);
  let updateData = {
    title: req.body.title,
    url: req.body.url,
    description: req.body.description
  };

  Item.findByIdAndUpdate({ _id: req.params.id }, updateData)
  .then(item => {
    console.log("item found:", item);
    res.status(200).send({ item });
  })
  .catch(err => {
    res.status(500).send({ message: err });
  })
};

// Delete a Item with the specified id in the request
exports.delete = (req, res) => {
  Item.deleteOne({ _id: req.params.id })
  .then(() => {
    res.status(200).send({ message: "Item deleted"});
  })
  .catch(err => {
    res.status(500).send({ message: err });
    return;
  })
};

// Delete all Items from the database.
exports.deleteAll = (req, res) => {
  
};