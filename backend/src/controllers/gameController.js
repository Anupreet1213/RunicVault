const Game = require("../models/game");
const Seller = require("../models/seller");
const cloudinary = require("../config/cloudinary");
const upload = require("../middlewares/multerMiddleware");

// {
//     "title": "Cyber Quest",
//     "description": "An immersive open-world RPG set in a futuristic cyber city.",
//     "author": "65bfa7c8f1d2a9e3d4b5a678",
//     "banner_img": "https://example.com/banner.jpg",
//     "preview_img": [
//       "https://example.com/preview1.jpg",
//       "https://example.com/preview2.jpg",
//       "https://example.com/preview3.jpg"
//     ],
//     "sys_req": {
//       "os": ["Windows 10", "Linux"],
//       "gpu": "NVIDIA GTX 1660",
//       "memory": "16GB RAM",
//       "storage": "50GB available space"
//     },
//     "online": true,
//     "price": "49.99",
//     "multiplayer": true,
//     "tier": "AAA",
//     "genre": "RPG"
//   }

const addGame = async (req, res) => {
  try {
    const {
      title,
      description,
      author,
      banner_img,
      preview_img,
      sys_req,
      online,
      price,
      multiplayer,
      tier,
      genre,
      iarc,
      trailer_url,
    } = req.body;

    const { sellerId } = req;

    const game = new Game({
      title,
      description,
      author,
      banner_img,
      preview_img,
      sys_req,
      online,
      price,
      multiplayer,
      tier,
      genre,
      iarc,
      trailer_url,
    });

    await game.save();

    await Seller.findByIdAndUpdate(sellerId, {
      $push: { games: game._id },
    });

    res.json({ message: "Game Added!!" });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

const deleteGame = async (req, res) => {
  try {
    const { _id } = req.body;
    const { sellerId } = req;

    await Game.findByIdAndDelete(_id);

    await Seller.findByIdAndUpdate(sellerId, {
      $pull: { games: _id },
    });

    res.json({ message: "Deleted Successfully!!" });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

const approveGame = async (req, res) => {
  try {
    const { _id } = req.body;

    await Game.findByIdAndUpdate(_id, { status: "approved" });

    res.json({ message: "Game Approved!!" });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

const rejectGame = async (req, res) => {
  try {
    const { _id } = req.body;

    await Game.findByIdAndUpdate(_id, { status: "rejected" });

    res.json({ message: "Game Rejected!!" });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

const allGames = async (req, res) => {
  try {
    const games = await Game.find({});

    res.json({ data: games });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

const landingPageGames = async (req, res) => {
  try {
    const games = await Game.find({ status: "approved" }).select(
      "_id title banner_img price multiplayer sold_copies genre"
    );

    res.json({ data: games });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

const getSingleGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);

    res.json({ data: game });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
};

const gameBannerUpload = async (req, res) => {
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
};

const sellerGames = async (req, res) => {
  try {
    const gamesArr = req.body;

    const games = await Game.find({ _id: { $in: gamesArr } });
    res.json({ games });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch games" });
  }
};

module.exports = {
  addGame,
  deleteGame,
  approveGame,
  rejectGame,
  allGames,
  landingPageGames,
  getSingleGame,
  gameBannerUpload,
  sellerGames,
};
