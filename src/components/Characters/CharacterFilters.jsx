import { Filter } from "../Common/Filter";
import { Submit } from "../Common/Submit";
import { Reset } from "../Common/Reset";
import "../Common/filter.scss";

const allSpecies = [
  "Alien",
  "Animal",
  "Cronenberg",
  "Disease",
  "Human",
  "Humanoid",
  "Mythological Creature",
  "Planet",
  "Poopybutthole",
  "Robot",
  "Unknown",
];

const allStatus = ["Alive", "Dead", "Unknown"];

function CharacterFilters({
  searchValueName,
  onChangeSearchValueName,
  selectSpecies,
  onChangeSelectSpecies,
  selectStatus,
  onChangeSelectStatus,
  onSubmitButton,
  onClickReset,
}) {
  return (
    <form className="form" onSubmit={onSubmitButton}>
      <Filter
        typeOfInput="input"
        id="name"
        textLabel="Escribe aquí el nombre del personaje"
        placeholder=" Ej: Mr. Meeseeks"
        value={searchValueName}
        onChangeInput={onChangeSearchValueName}
      />
      <Filter
        typeOfInput="select"
        id="species"
        textLabel="Escoge aquí la especie a filtrar"
        value={selectSpecies}
        onChangeSelect={onChangeSelectSpecies}
        textOption="Todas las especies"
        options={allSpecies}
      />
      <Filter
        typeOfInput="select"
        id="status"
        textLabel="Escoge aquí el estado a filtrar"
        value={selectStatus}
        onChangeSelect={onChangeSelectStatus}
        textOption="Todos los estados"
        options={allStatus}
      />
      <div>
        <Submit />
        <Reset onClickReset={onClickReset} />
      </div>
    </form>
  );
}

export { CharacterFilters };
