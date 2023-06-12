import React, { useEffect, useState } from "react";
import { SeriesService } from "../../services/SeriesServices";
import { UserService } from "../../services/UserService";
import CardSerie from "./cardSerie";


const Series = (props) => {
  const [seriesFavorites, setSeriesFavorites] = useState([]);
  const [seriesToWatch, setSeriesTpWatch] = useState([]);

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
  },[props.userId]);

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
  },[props.userId]);

  async function addStatusToSerie(serieId, status) {
    try {
      const formData = {
        status,
        userId: props.userId,
        serieId
      };
      await SeriesService.addStatusToSerie(formData);
    } catch (err) {
      console.log(err.message);
    }
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
    <div className="flex gap-7">
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
            onGetPlatform={props.onGetPlatform}
          />
        );
      })}
    </div>
  );
};

export default Series;
