const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryRoutes = await Category.findAll(
      {include: [{ model: Product}] }
     );
    res.status(200).json(categoryRoutes);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    const specCategory = await Category.findByPk(req.params.id, {
    /*  include: [{ model: Product }],
      attributes: {
        include: [
          [
            sequelize.literal(
              '(SELECT * FROM Product WHERE Product.category_id = Category.id)'

            ),
            'Product_cat_id',
          ],
        ],
      },*/
    });
    if (!specCategory) {
      res.status(404).json({ message: 'No Category found with that ID value.'});
      return;
    }

    res.status(200).json(specCategory);
  }
  catch (err) {
    res.status(500).json(err);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  try {
    const CAT_ID = await Category.create({
      id: req.body.id,
      category_name: req.body.category_name,
    });
    res.status(200).json(CAT_ID);
  } catch (err) {
    res.status(400).json(err);
  }
  // create a new category
});

router.put('/:id', async (req, res) => {
  try {
    const CAT_ID = await Category.update(req.body, {
      where: {
      id: req.params.id,
      }
    });
    res.status(200).json(CAT_ID);
  } catch (err) {
    res.status(400).json(err);
  }
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const CAT_ID = await Category.destroy({
      where: {
      id: req.params.id,
      },
    });
    res.status(200).json(CAT_ID);
  } catch (err) {
    res.status(400).json(err);
  }
  // delete a category by its `id` value
});

module.exports = router;
