import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { SeriesService } from "../../services/SeriesServices";
import StarRating from "../../components/star/StartRating";
import Navbar from "../../components/navbar/Navbar";


const EditSerie = () => {
  const [serie, setSerie] = useState();
  const router = useRouter();
  const {id} = router.query;

  useEffect(() => {

    if (!id) {
      return;
    }

    async function fetchData() {
      try {
        const response = await SeriesService.getSerieByIdView(id);
        setSerie(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();

  },[id]);

  return (
    <>
      <Navbar />
      <div className="flex gap-4 p-4 items-center">
        <div className="bg-[#D9D9D9] rounded-md shadow-lg relative self-start">
          <img className=" w-76 h-56" src={`http://localhost:3001/tmp/${serie?.image}`} />
          <div className="px-2">
            <h1 className="text-xl font-bold">{serie?.name}</h1>
            <div className="flex justify-between">
              <div>
                <StarRating />
              </div>
              <div className="flex">
                <button>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <button>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#D9D9D9] rounded-md shadow-lg flex-1 p-4">
          <h1 className=" text-2xl font-bold mb-4">{serie?.name}</h1>
          <p className="mb-4">{serie?.description}</p>
          <span className="text-2xl font-medium  text-gray-800 text-center block">Assistir Agora</span>
          <img className="flex justify-center h-44 w-44 mx-auto" src={`http://localhost:3001/tmp/${serie?.platforms[0].image}`} />
        </div>
      </div>
    </>
  );
};
export default EditSerie;
