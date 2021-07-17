const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      //include its associated Products
      include: [{ model: Product}]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }
  
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
   try {
    const tagData = await Tag.findByPk(req.params.id, {
      //include its associated Products
      include: [{ model: Product}]
  });

  if (!tagData) {
    res.status(404).json({ message: "No Tag found with this id!"})
    return
  }
  res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
       tag_name: req.body.tag_name
     });
     res.status(200).json(newTag)
   } catch (err) {
     res.status(500).json(err)
   }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const update = await Tag.update(
      {
        tag_name: req.body.tag_name
      },
      {
        where:{
          id: req.params.id
        },
      });
      console.log(req.params.id)
      res.status(200).json(update)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(deleteTag)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
