import GameCarousel from "./GameCarousel";

const GameDetailPage = () => {
  return (
    <section className="bg-black text-white font-kdam">
      <div className="flex justify-center">
        <div className="w-6/12">
          <h1>Assassins Creed Shadows</h1>
          <div>
            <GameCarousel />
          </div>
        </div>
        <div>Idhar buy karna</div>
      </div>
    </section>
  );
};

export default GameDetailPage;
