const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }], // to join Product to Category
    })
    res.status(200).json(categoryData); 
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }], // to join Product to Category
    })
    res.status(200).json(categoryData); 
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  /* req.body structure
    {
	"category_name": "something"
     }
  */
  try {
    const someData = await Category.create(req.body);
    res.status(200).json(someData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    },
    )
    res.status(200).json(categoryData); 
  } catch (err) {
    res.status(404).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteData) {
      res.status(404).json({ message: "404 error "});
      return;
    }

    res.status(200).json(deleteData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
