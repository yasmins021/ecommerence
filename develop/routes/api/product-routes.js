const router = require('express').Router();
const sequelize = require('sequelize');
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll(
      {include: [{ model: Category }]}
    );
    res.status(200).json(productData);
  }catch (err) {
    res.status(500).json(err);
  }
  // find all products
  // be sure to include its associated Category and Tag data
});

// get one product
router.get('/:id', async (req, res) => {
  try {
    const productByID = await Product.findByPk(req.params.id, {
   /*   include: 
      [
         { model: Category}
      ],
      attributes: {
        include: [
          [
            sequelize.literal(
              `(SELECT * FROM Category where Category.id = Product.category_id)`
            ),
            'CategoryID',
          ],
        ],
      },*/
    });
    if (!productByID) {
      res.status(404).json({message: 'Error: No Product with that ID!'});
      return;
    }

    res.status(200).json(productByID);
  } catch (err) {
    res.status(500).json(err);
  }
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
});

// create new product
router.post('/', async (req, res) => {
  try {
    const newProduct = await Product.create({
      id: req.body.id,
      product_name: req.body.product_name,
      price: req.body.price,
      stock: req.body.stock,
      category_id: req.body.category_id
    });
    if (!newProduct) { res.status(404).json({ message: 'No data in post request!'})};
    res.status(200).json(newProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
 /* Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});*/

// update product
router.put('/:id', async (req, res) => {
  // update product data
  try {
  const newProduct = await Product.update(req.body, {
    where: {
      id: req.params.id,
    }
      
    });
    res.status(200).json(newProduct);
    } catch(err) {
      res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
  try {
    const PRO_ID = await Product.destroy({
      where: {
      id: req.params.id,
     /* product_name: req.body.product_name,
      price: req.body.price,
      stock: req.body.stock*/
      },
    });
    res.status(200).json(`Product has been deleted: ${PRO_ID}`);
  } catch (err) {
    res.status(400).json(err);
  }
  // delete a category by its `id` value
});
module.exports = router;
