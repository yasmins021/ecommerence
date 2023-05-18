const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const getTags = await Tag.findAll(
      {
        include: [
          {
            model: Product
          }
        ]
      }
    );
    res.status(200).json(getTags);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
try {
  const TagbyID = await Tag.findByPk(req.params.id, {
    include: [
      {
        model: Product
      }
    ]
  }); 
  res.status(200).json(TagbyID);
  } catch (err) {
  res.status(500).json(err);
}
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create({
      id: req.body.id,
      tag_name: req.body.tag_name
    });
    res.status(200).json(newTag);
  } catch(err){
    res.status(500).json(err);
  }
  // create a new tag
});

router.put('/:id', async (req, res) => {
  try {
  const tagUpdate = await Tag.update(req.body, {
    where: {
      id: req.params.id,
    }
  });
  res.status(200).json(tagUpdate);
} catch(err) {
  res.status(500).json(err);
}

  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
  const TAG_byID = await Tag.destroy( {
    where: {
      id: req.params.id,
    }
  });
  res.status(200).json(`Product has been deleted: ${TAG_byID}`);
} catch (err) {
  res.status(500).json(err);
}

});

module.exports = router;
