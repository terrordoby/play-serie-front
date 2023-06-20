import React from "react";
import edit from "../../../public/images/edit.svg";
import StarRating from "../star/StartRating";
import Link from "next/link";
import Image from "next/image";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useContext } from "react";
import { ManagerContext } from "../../context/managerModeContext";

const CardSerie = (props) => {
  const {managerMode} = useContext(ManagerContext);
  return (
    <div className="bg-[#D9D9D9] rounded-md shadow-lg relative" key={props.serie.id}>
      <div className="rounded-md shadow-lg h-full ">
        <Link key={props.serie.id} href={`/serie/${props.serie.id}`}>
          <div key={props.serie.id}>
            <img  width={240} height={200} src={`http://localhost:3001/tmp/${props.serie.image}`} />
          </div>
        </Link>
        <div className="px-2">
          <h1 className="text-xl font-bold">{props.serie.name}</h1>
          <div className="flex justify-between">
            <div>
              <StarRating />
            </div>
            <div className="flex gap-1">
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <button className=" hover:scale-110 cursor-pointer" onClick={() => props.onAddStatusToSerie(props.serie.id, "DESEJO_ASSISTIR", props.watch)} >
                      <svg xmlns="http://www.w3.org/2000/svg" fill={props.watch ? "green" : "none"} viewBox="0 0 24 24" strokeWidth="1.5" stroke={props.watch ? "white" : "currentColor"} className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content className="TooltipContent" sideOffset={5}>
                        Desejo Assistir
                      <Tooltip.Arrow className="TooltipArrow" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <button className=" hover:scale-110 cursor-pointer" onClick={() => props.onAddStatusToSerie(props.serie.id, "GOSTEI", props.isFavorite)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill={props.isFavorite ? "red" : "none"} viewBox="0 0 24 24" strokeWidth="1.5" stroke={props.isFavorite ? "red" : "currentColor"} className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                      </svg>
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content className="TooltipContent2" sideOffset={5}>
                        Adicionar aos favoritos
                      <Tooltip.Arrow className="TooltipArrow" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>

            </div>
          </div>
          <div>
            {props.onGetPlatform(props.serie.platforms[0]?.name)}
          </div>
        </div>
      </div>
      {managerMode && (
        <Link href={`/serie/edit/${props.serie.id}`} className="absolute top-16 right-24 bg-neutral-700 rounded-full hover:scale-125">
          <Image src={edit} width={50} height={50} />
        </Link>
      )}
    </div>);
};

export default CardSerie;
