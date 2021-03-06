import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { DataEpisodeAPI } from "../../Service/DataAPI";
import { SetLocalStorage, GetLocalStorage } from "../../Service/LocalStorage";
import { Header } from "../Common/Header";
import { Title } from "../Common/Title";
import { EpisodeFilter } from "./EpisodeFilter";
import { Sumary } from "../Common/Sumary";
import { EpisodeList } from "./EpisodeList";
import { Footer } from "../Common/Footer";
import "./episodePage.scss";

function EpisodePage() {
  const [dataEpisode, setDataEpisode] = useState(
    GetLocalStorage("episodeArray", [])
  );
  const [searchValueEpisode, setSearchValueEpisode] = useState(
    GetLocalStorage("searchValueEpisode", "")
  );
  const [selectEpisode, setSelectEpisode] = useState(
    GetLocalStorage("selectEpisode", "")
  );
  const [pagesEpisode, setPagesEpisode] = useState(
    GetLocalStorage("pagesEpisode", 1)
  );
  const [currentPageEpisode, setCurrentPageEpisode] = useState(
    GetLocalStorage("currentPageEpisode", 1)
  );
  const [error, setError] = useState(false);
  const [callAPI, setCallAPI] = useState(true);

  useEffect(() => {
    if (callAPI) {
      setError(false);
      setCallAPI(false);
      DataEpisodeAPI({
        name: searchValueEpisode,
        episode: selectEpisode,
        page: currentPageEpisode,
      })
        .then(({ episodeArray, totalPages }) => {
          setDataEpisode(episodeArray);
          setPagesEpisode(totalPages);
          SetLocalStorage("episodeArray", episodeArray);
          SetLocalStorage("pagesEpisode", totalPages);
        })
        .catch(() => setError(true));
    }
  }, [searchValueEpisode, selectEpisode, currentPageEpisode, callAPI]);

  return (
    <>
      <Header />
      <main className="mainEpisode">
        <Link to="/" className="mainEpisode__link">
          <i className="fas fa-angle-double-left"></i>
          Volver a la página principal
        </Link>
        <Title textTitle="Búsqueda de episodios" />
        <EpisodeFilter
          searchValueEpisode={searchValueEpisode}
          onChangeSearchValueEpisode={(evt) => {
            setSearchValueEpisode(evt.currentTarget.value);
            SetLocalStorage("setSearchValueEpisode", evt.currentTarget.value);
            setCurrentPageEpisode(1);
          }}
          selectEpisode={selectEpisode}
          onChangeSelectEpisode={(evt) => {
            setSelectEpisode(evt.currentTarget.value);
            SetLocalStorage("selectEpisode", evt.currentTarget.value);
            setCurrentPageEpisode(1);
          }}
          onSubmitButton={(evt) => {
            setCallAPI(true);
            evt.preventDefault();
          }}
          onClickReset={() => {
            setSearchValueEpisode("");
            SetLocalStorage("setSearchValueEpisode", "");
            setSelectEpisode("");
            SetLocalStorage("selectEpisode", "");
            setCurrentPageEpisode(1);
            SetLocalStorage("pagesEpisode", 1);
            setCallAPI(true);
          }}
        />
        {!error ? (
          <Sumary
            currentPage={currentPageEpisode}
            pages={pagesEpisode}
            onClickBefore={() => {
              if (currentPageEpisode >= 2) {
                setCurrentPageEpisode(currentPageEpisode - 1);
                setCallAPI(true);
              }
            }}
            onClickAfter={() => {
              if (currentPageEpisode < pagesEpisode) {
                setCurrentPageEpisode(currentPageEpisode + 1);
                setCallAPI(true);
              }
            }}
          />
        ) : null}
        <EpisodeList
          error={error}
          searchValueEpisode={searchValueEpisode}
          selectEpisode={selectEpisode}
          dataEpisode={dataEpisode}
        />
      </main>
      <Footer />
    </>
  );
}

export { EpisodePage };
