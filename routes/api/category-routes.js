const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: {
      model: Product,
      attributes: ["id", "product_name", "price", "category_id"],
    },
  })
    .then((categoryData) => {
      res.json(categoryData);
    })
    .catch((err) => res.json(err));
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Product,
      attributes: ["id", "product_name", "price", "category_id"],
    },
  })
    .then((categoryData) => {
      res.json(categoryData);
    })
    .catch((err) => res.json(err));
});

router.post("/", (req, res) => {
  // create a new category
  Category.findAll({
    // include:{
    //     attributes: ['id', 'product_name', 'price', 'category_id']
    // }
  }).then((categoryData) => {
    // res.json(categoryData);
    console.log(categoryData);
    categoryData.forEach((element) => {
      console.log(element.category_name);
      if (req.body.category_name == element.category_name) {
        res.json("Category already exists");
      }
    });
  });
  Category.create({
    category_name: req.body.category_name,
  })
  .then((categoryData) => {
    res.json(categoryData).catch((err) => res.json(err));
  });
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value

  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedCategory) => {
      res.json(updatedCategory);
    })
    .catch((err) => res.json(err));
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedCategory) => {
      res.json(deletedCategory);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
