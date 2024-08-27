const { Router } = require("express");
const productsController = require("../controllers/productsController");
const requireAuth = require("../middlewares/requireAuth.js");
const upload = require("../middlewares/upload");
const checkUser = require("../middlewares/checkUser");

const router = Router();

router.get("*", checkUser);
router.get("/", productsController.main_get);
router.get("/food", productsController.food_get);
router.get("/drinks", productsController.drinks_get);
router.get("/product/:id", productsController.about_get);
router.get("/product", productsController.product_get);
// auth required routes
router.get("/add", requireAuth, productsController.add_get);
router.post("/add", requireAuth, upload.single("image"), productsController.add_post);
router.get("/edit/:id", requireAuth, productsController.editId_get);
router.get("/edit-product", requireAuth, productsController.edit_get);
router.post("/edit-product", requireAuth, productsController.edit_post);

module.exports = router;
