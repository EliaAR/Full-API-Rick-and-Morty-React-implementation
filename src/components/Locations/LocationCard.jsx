import "./locationCard.scss";

function LocationCard({ card }) {
  return (
    <section className="locationCard">
      <p className="locationCard__name">{card.name}</p>
      <div className="locationCard__container">
        <p>Tipo: {card.type}</p>
        <p>Dimensión: {card.dimension}</p>
        <p>Núm. residentes: {card.residents}</p>
      </div>
    </section>
  );
}

export { LocationCard };
