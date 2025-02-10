const express = require("express");
const {
  addGame,
  deleteGame,
  approveGame,
  rejectGame,
  allGames,
  gameBannerUpload,
} = require("../controllers/gameController");
const sellerAuth = require("../middlewares/sellerAuth");
const adminAuth = require("../middlewares/adminAuth");
const cloudinary = require("../config/cloudinary");
const upload = require("../middlewares/multerMiddleware");

const router = express.Router();

router.post("/addGame", sellerAuth, addGame);
router.delete("/deleteGame", sellerAuth, deleteGame);
router.patch("/approveGame", sellerAuth, approveGame);
router.patch("/rejectGame", sellerAuth, rejectGame);

router.get("/allGames", adminAuth, allGames);

// router.post("/uploadBanner", multerMiddleware, gameBannerUpload);
// router.post("/uploadBanner", upload.single("image"), gameBannerUpload);
// router.post("/uploadPreviews", uploadPreviews.array(), gameBannerUpload);

router.post("/uploadBanner", upload.single("image"), function (req, res) {
  console.log(req.file);

  cloudinary.uploader.upload(req.file.path, function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error",
      });
    }

    res.status(200).json({
      success: true,
      message: "Uploaded!",
      data: result,
    });
  });
});

module.exports = router;
