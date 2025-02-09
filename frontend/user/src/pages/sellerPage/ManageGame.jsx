/* eslint-disable react/prop-types */

const ManageGame = ({ games, setGames }) => {
  const handleDelete = (index) => {
    setGames(games.filter((_, i) => i !== index));
  };

  return (
    <section>
      <h2 className="text-2xl font-bold text-purple-400 mb-4">Manage Games</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-gray-800 rounded-lg shadow-lg border border-gray-700">
          <thead>
            <tr className="border-b border-gray-700 text-purple-400">
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Genre</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game, index) => (
              <tr
                key={index}
                className="border-b border-gray-700 hover:bg-gray-700 transition"
              >
                <td className="p-3">{game.title}</td>
                <td className="p-3">{game.genre}</td>
                <td className="p-3">{game.price}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded text-sm font-bold ${
                      game.status === "approved"
                        ? "bg-green-600 text-black"
                        : "bg-yellow-500 text-black"
                    }`}
                  >
                    {game.status}
                  </span>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 px-4 py-2 rounded-lg text-black font-bold hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
export default ManageGame;
