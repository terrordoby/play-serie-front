import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { UserService } from "../services/UserService";
import Navbar from "../components/navbar/Navbar";
import Series from "../components/serie/serie";

const wantToWatch = () => {
  const [series, setSeries] = useState([]);
  const userSession = useSession();
  const userId = userSession?.data?.user.id;

  useEffect(() => {
    async function loadSeries() {
      try {
        const formData = {
          userId
        };
        const result = await UserService.getUserSeries(formData, "DESEJO_ASSISTIR");
        setSeries(result);
      } catch (err) {
        console.log(err.message);
      }
    }
    loadSeries();
  }, [userId]);
  return (
    <div className="flex flex-col gap-3">
      <Navbar />
      <Series series={series} userId={userId} />
    </div>
  );
};

export default wantToWatch;
