const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      //include its associated Products
      include: [{ model: Product}]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
  
  
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      //include its associated Products
      include: [{ model: Product}]
  });

  if (!categoryData) {
    res.status(404).json({ message: "No category found with this id!"})
    return
  }
  res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
   const newCategory = await Category.create({
      category_name: req.body.category_name
    });
    res.status(200).json(newCategory)
  } catch (err) {
    res.status(500).json(err)
  }

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const update = await Category.update(
      {
        category_name: req.body.category_name
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
  // delete a category by its `id` value
  try {
    const deleteCat = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(deleteCat)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
