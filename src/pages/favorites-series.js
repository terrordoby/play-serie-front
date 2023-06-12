import React from "react";
import Navbar from "../components/navbar/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import {UserService} from "../services/UserService";
import { useSession } from "next-auth/react";
import Series from "../components/serie/serie";

const favoriteSeries = () => {
  const [series, setSeries] = useState([]);
  const userSession = useSession();
  const userId = userSession?.data?.user.id;
  console.log(series);

  useEffect(() => {
    async function loadSeries() {
      try {
        const formData = {
          userId
        };
        const result = await UserService.getUserSeries(formData, "GOSTEI");
        setSeries(result);
      } catch (err) {
        console.log(err.message);
      }
    }
    loadSeries();
  }, [userId]);
  return (
    <div>
      <Navbar />
      <Series series={series} userId={userId} />
    </div>
  );
};

export default favoriteSeries;
