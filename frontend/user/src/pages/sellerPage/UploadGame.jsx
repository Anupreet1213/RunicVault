/* eslint-disable react/prop-types */
import { useState } from "react";

const UploadGame = ({ setGames }) => {
  const [gameDetails, setGameDetails] = useState({
    title: "",
    description: "",
    author: "", // Assuming this is selected or autofilled (e.g., logged-in seller ID)
    bannerImg: "",
    trailerUrl: "",
    previewImgs: [],
    sysReq: {
      os: [],
      gpu: "",
      memory: "",
      storage: "",
    },
    online: false,
    price: "",
    multiplayer: false,
    tier: "Basic", // Default to Basic, could be a dropdown
    genre: "Action", // Default genre, could be a dropdown
    iarc: "3", // Default IARC rating
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGameDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleUpload = () => {
    if (gameDetails.title) {
      setGames((prevGames) => [...prevGames, gameDetails]);
      setGameDetails({
        title: "",
        description: "",
        author: "",
        bannerImg: "",
        trailerUrl: "",
        previewImgs: [],
        sysReq: { os: [], gpu: "", memory: "", storage: "" },
        online: false,
        price: "",
        multiplayer: false,
        tier: "Basic",
        genre: "Action",
        iarc: "3",
      });
    }
  };

  const handlePreviewRemove = (index) => {
    setGameDetails((prevDetails) => ({
      ...prevDetails,
      previewImgs: prevDetails.previewImgs.filter((_, i) => i !== index),
    }));
  };

  return (
    <section className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700">
      <h2 className="text-2xl font-bold text-purple-400 mb-6">
        Upload a New Game
      </h2>

      {/* Game Title Section */}
      <div className="mb-4">
        <label className="text-gray-300 font-semibold">Game Title</label>
        <input
          type="text"
          name="title"
          placeholder="Enter Game Title"
          value={gameDetails.title}
          onChange={handleChange}
          className="w-full p-3 mt-2 bg-gray-800 rounded-lg text-white"
        />
      </div>

      {/* Description Section */}
      <div className="mb-4">
        <label className="text-gray-300 font-semibold">Game Description</label>
        <textarea
          name="description"
          placeholder="Enter Game Description"
          value={gameDetails.description}
          onChange={handleChange}
          className="w-full p-3 mt-2 bg-gray-800 rounded-lg text-white"
          rows="4"
        />
      </div>

      {/* Banner Image Section */}
      <div className="mb-4">
        <label className="text-gray-300 font-semibold">Banner Image URL</label>
        <input
          type="text"
          name="bannerImg"
          placeholder="Enter Banner Image URL"
          value={gameDetails.bannerImg}
          onChange={handleChange}
          className="w-full p-3 mt-2 bg-gray-800 rounded-lg text-white"
        />
      </div>

      {/* Trailer URL Section */}
      <div className="mb-4">
        <label className="text-gray-300 font-semibold">Trailer URL</label>
        <input
          type="text"
          name="trailerUrl"
          placeholder="Enter Trailer URL"
          value={gameDetails.trailerUrl}
          onChange={handleChange}
          className="w-full p-3 mt-2 bg-gray-800 rounded-lg text-white"
        />
      </div>

      {/* Preview Images Upload Section */}
      <div className="mb-4">
        <label className="text-gray-300 font-semibold">Preview Images</label>
        <input
          type="file"
          name="previewImgs"
          accept="image/*"
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files).map((file) =>
              URL.createObjectURL(file)
            );
            setGameDetails((prevDetails) => ({
              ...prevDetails,
              previewImgs: [...prevDetails.previewImgs, ...files],
            }));
          }}
          className="w-full mt-2"
        />
        {/* Display Preview Images */}
        <div className="mt-4 flex gap-4">
          {gameDetails.previewImgs.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={img}
                alt={`Preview ${index + 1}`}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <button
                onClick={() => handlePreviewRemove(index)}
                className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* System Requirements Section */}
      <div className="border-t border-gray-700 pt-6 mb-4">
        <h3 className="text-xl text-gray-300 font-semibold">
          System Requirements
        </h3>
        <div className="mb-4">
          <label className="text-gray-300 font-semibold">
            Operating Systems
          </label>
          <input
            type="text"
            name="sysReq.os"
            placeholder="Enter OS (comma separated)"
            value={gameDetails.sysReq.os.join(", ")}
            onChange={(e) => {
              const osArray = e.target.value.split(",").map((os) => os.trim());
              setGameDetails((prevDetails) => ({
                ...prevDetails,
                sysReq: { ...prevDetails.sysReq, os: osArray },
              }));
            }}
            className="w-full p-3 mt-2 bg-gray-800 rounded-lg text-white"
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-300 font-semibold">GPU</label>
          <input
            type="text"
            name="sysReq.gpu"
            placeholder="Enter GPU"
            value={gameDetails.sysReq.gpu}
            onChange={handleChange}
            className="w-full p-3 mt-2 bg-gray-800 rounded-lg text-white"
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-300 font-semibold">Memory</label>
          <input
            type="text"
            name="sysReq.memory"
            placeholder="Enter Memory"
            value={gameDetails.sysReq.memory}
            onChange={handleChange}
            className="w-full p-3 mt-2 bg-gray-800 rounded-lg text-white"
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-300 font-semibold">Storage</label>
          <input
            type="text"
            name="sysReq.storage"
            placeholder="Enter Storage"
            value={gameDetails.sysReq.storage}
            onChange={handleChange}
            className="w-full p-3 mt-2 bg-gray-800 rounded-lg text-white"
          />
        </div>
      </div>

      {/* Price Section */}
      <div className="mb-4">
        <label className="text-gray-300 font-semibold">Price</label>
        <input
          type="text"
          name="price"
          placeholder="Enter Game Price"
          value={gameDetails.price}
          onChange={handleChange}
          className="w-full p-3 mt-2 bg-gray-800 rounded-lg text-white"
        />
      </div>

      {/* Multiplayer and Online Section */}
      <div className="mb-4 flex gap-6">
        <div>
          <label className="text-gray-300 font-semibold">Multiplayer</label>
          <input
            type="checkbox"
            name="multiplayer"
            checked={gameDetails.multiplayer}
            onChange={(e) =>
              setGameDetails((prevDetails) => ({
                ...prevDetails,
                multiplayer: e.target.checked,
              }))
            }
            className="ml-2"
          />
        </div>
        <div>
          <label className="text-gray-300 font-semibold">Online</label>
          <input
            type="checkbox"
            name="online"
            checked={gameDetails.online}
            onChange={(e) =>
              setGameDetails((prevDetails) => ({
                ...prevDetails,
                online: e.target.checked,
              }))
            }
            className="ml-2"
          />
        </div>
      </div>

      {/* Tier Section */}
      <div className="mb-4">
        <label className="text-gray-300 font-semibold">Tier</label>
        <select
          name="tier"
          value={gameDetails.tier}
          onChange={handleChange}
          className="w-full p-3 mt-2 bg-gray-800 rounded-lg text-white"
        >
          <option value="Basic">Basic</option>
          <option value="AA">AA</option>
          <option value="AAA">AAA</option>
        </select>
      </div>

      {/* Genre Section */}
      <div className="mb-4">
        <label className="text-gray-300 font-semibold">Genre</label>
        <select
          name="genre"
          value={gameDetails.genre}
          onChange={handleChange}
          className="w-full p-3 mt-2 bg-gray-800 rounded-lg text-white"
        >
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="Open-world">Open-world</option>
          <option value="Horror">Horror</option>
          <option value="Simulation">Simulation</option>
          <option value="RPG">RPG</option>
        </select>
      </div>

      {/* IARC Rating Section */}
      <div className="mb-4">
        <label className="text-gray-300 font-semibold">IARC Rating</label>
        <select
          name="iarc"
          value={gameDetails.iarc}
          onChange={handleChange}
          className="w-full p-3 mt-2 bg-gray-800 rounded-lg text-white"
        >
          <option value="3">3</option>
          <option value="7">7</option>
          <option value="12">12</option>
          <option value="18">18</option>
        </select>
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        className="w-full bg-purple-500 mt-6 p-3 rounded-lg hover:bg-purple-600"
      >
        Upload Game
      </button>
    </section>
  );
};

export default UploadGame;
