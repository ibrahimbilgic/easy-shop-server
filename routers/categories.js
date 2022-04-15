const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();

router.get(`/`, async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(categoryList);
});

//idye göre kategori bulmak
router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res
      .status(500)
      .json({ message: "The category with the given id was not found" });
  }
  res.status(200).send(category);
});

// yeni kategori eklemek için
// req always getting info from the frontend

router.post("/", async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });
  category = await category.save();

  if (!category) {
    return res.status(404).send("The category cannot be created");
  }
  res.send(category);
});

// id'si verilen kategoriyi guncellemek icin
// async ve await kullanarak
router.put("/:id", async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    { new: true }
  );
  if (!category) {
    return res.status(400).send("Error");
  }
  res.send(category);
});

// api/v1/idNum
//  id kullanarak kategori silmek için --> promise kullanarak (then ve catch) diğer yolu await kullanarak
router.delete("/:id", (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then((category) => {
      if (category) {
        return res
          .status(200)
          .json({ success: true, message: "The category is deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }
    })
    .catch((err) => {
      return res.status(404).json({ success: false, error: err });
    });
});

module.exports = router;
