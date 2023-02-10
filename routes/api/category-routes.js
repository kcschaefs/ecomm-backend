const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll();
    const productData = await Product.findAll();
    const returnData = [];
    categoryData.forEach(category => {
      let productsForCatogory = productData.filter(product => product.category_id == category.id)
      let returnProduct = productsForCatogory.map(product => product.dataValues.product_name)
      returnData.push({ categoryName: category.category_name, products: returnProduct })
    })
    res.status(200).json(returnData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id);
    const productData = await Product.findAll({
      where: { category_id: req.params.id }
    });
    const returnData = { category: categoryData.dataValues.category_name, products: productData.map(product => product.dataValues.product_name) };

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    } res.status(200).json(returnData);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.post('/', (req, res) => {
  // create a new category
  /* req.body should look like this...
    {
      category_name: "Shirts"
    }
  */
    Category.create(req.body)
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  /* req.body should look like this...
    {
      category_name: "Shirts"
    }
  */
    Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where:{
      id: req.params.id
    }
  }).then(response=>res.status(200).json(response));
});

module.exports = router;
