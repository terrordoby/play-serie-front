import React, { useEffect, useState } from "react";
import { SeriesService } from "../../services/SeriesServices";
import { UserService } from "../../services/UserService";
import CardSerie from "./cardSerie";
import netflix from "../../../public/images/netflix.svg";
import hbo from "../../../public/images/hbo.svg";
import prime_video from "../../../public/images/prime_video.svg";
import Image from "next/image";


const Series = (props) => {
  const [seriesFavorites, setSeriesFavorites] = useState([]);
  const [seriesToWatch, setSeriesTpWatch] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function getUserSeries() {
      try {
        const formData = {
          userId: props.userId
        };
        const result = await UserService.getUserSeries(formData, "GOSTEI");
        setSeriesFavorites(result);
      } catch (err) {
        console.log(err.message);
      }
    }
    getUserSeries();
  },[props.userId, refresh]);

  useEffect(() => {
    async function getUserSeries() {
      try {
        const formData = {
          userId: props.userId
        };
        const result = await UserService.getUserSeries(formData, "DESEJO_ASSISTIR");
        setSeriesTpWatch(result);
      } catch (err) {
        console.log(err.message);
      }
    }
    getUserSeries();
  },[props.userId, refresh]);

  function getPlatform(name) {
    const nameFormated = name.toLowerCase();
    switch (nameFormated){
    case "netflix":
      return <Image width={37} height={37} src={netflix} />;
    case "hbo":
      return <Image width={37} height={37} src={hbo} />;
    case "prime":
      return <Image width={37} height={37}  src={prime_video} />;
    }
  }

  async function addStatusToSerie(serieId, status, listSerie) {
    const formData = {
      status,
      userId: props.userId,
      serieId
    };
    if (listSerie) {
      try {
        console.log(formData);
        await SeriesService.deleteSerieList(formData);
      } catch (err) {
        console.log(err.message);
      }
    } else {
      await SeriesService.addStatusToSerie(formData);
    }
    setRefresh((prevRefresh) => !prevRefresh);
  }

  function handleAddSeriesToFavoriteList(id) {
    const hasMatchingSeries = seriesFavorites?.find((serie) => serie.id === id);
    return hasMatchingSeries;
  }

  function handleSeriesToWatch(id) {
    const hasMatchingSeries = seriesToWatch?.find((serie) => serie.id === id);
    return hasMatchingSeries;
  }

  return (
    <div className="flex gap-7 flex-wrap h-screen items-start">
      {props.series?.map((serie) => {
        const isFavorite = handleAddSeriesToFavoriteList(serie.id);
        const watch = handleSeriesToWatch(serie.id);
        return (
          <CardSerie
            key={serie.id}
            serie={serie}
            watch={watch}
            isFavorite={isFavorite}
            onAddStatusToSerie={addStatusToSerie}
            onGetPlatform={getPlatform}
          />
        );
      })}
    </div>
  );
};

export default Series;
