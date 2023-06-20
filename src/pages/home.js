import Image from "next/image";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import netflix from "../../public/images/netflix.svg";
import prime_video from "../../public/images/prime_video.svg";
import hbo from "../../public/images/hbo.svg";
import { SeriesService } from "../services/SeriesServices";
import { useRouter } from "next/router";
import Series from "../components/serie/serie";
import Navbar from "../components/navbar/Navbar";
import ManagerModeProvider from "../context/managerModeContext";
import { useMemo } from "react";

const home = () => {
  const userSesion = useSession();
  const [series, setSeries] = useState([]);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await SeriesService.getAll();
        setSeries(response);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

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

  const searchLowerCase = search.toLowerCase();

  const filteredSeries = useMemo(() => (
    series?.filter(serie => serie.name.toLowerCase().includes(searchLowerCase))
  ), [series, search]);

  return (
    <ManagerModeProvider>
      <Navbar search={search} onSearch={setSearch} />
      <main className="p-3 bg-[#D9D9D9] h-full">
        <div className=" bg-[#D9D9D9] mb-3">
          <button className="flex gap-2 items-center px-2 rounded-md font-medium text-lg py-3 bg-black text-white hover:scale-110" onClick={() => router.push("/new")}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          Adicionar Série
          </button>
        </div>
        <Series userId={userSesion.data?.user.id} series={filteredSeries} onGetPlatform={getPlatform} />
      </main>
    </ManagerModeProvider>
  );
};

export default home;
