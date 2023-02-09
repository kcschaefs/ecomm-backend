const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
    try {
      const categoryData = await Category.findAll();
      const productData = await Product.findAll();
      const returnData= [];
      categoryData.forEach(category => {
        let productsForCatogory = productData.filter(product=>product.category_id==category.id)
        let returnProduct = productsForCatogory.map(product=>product.dataValues.product_name)
        returnData.push({categoryName: category.category_name, products: returnProduct})
      })
      res.status(200).json(returnData);
    } catch (err) {
      res.status(500).json(err);
    }
  });


router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
