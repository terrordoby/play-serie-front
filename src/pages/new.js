import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import FormGroup from "../components/formGroup/FormGroup";
import { useSession } from "next-auth/react";
import { SeriesService } from "../services/SeriesServices";
import { PlatFormService } from "../services/PlatformsServices";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const NewSerie = () => {
  const [serie] = useState();
  const [allPlatforms, allSetPlatforms] = useState([]);
  const [name, setName] = useState(serie?.name);
  const [description, setDescription] = useState(serie?.description);
  const [imagem, setImagem] = useState(serie?.image);
  const [srcImage, setSrcImage] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [idPlatform, setIdPlatform] = useState("");
  const session = useSession();
  const userId = session.data?.user.id;
  const router = useRouter();


  useEffect(() => {

    async function fetchData() {
      try {
        const response = await PlatFormService.getAll();
        allSetPlatforms(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();

  },[]);
  function handleCheckboxChange (platformName, id) {
    if (selectedPlatform === platformName) {
      setSelectedPlatform(null); // Desmarca o checkbox se ele já estiver selecionado
      setIdPlatform(id);
    } else {
      setSelectedPlatform(platformName); // Marca o checkbox selecionado
      setIdPlatform(id);
    }
  }

  async function handleUpdateSerie(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("platform", idPlatform);
    formData.append("image", imagem);
    formData.append("userId", userId);

    try {
      await SeriesService.create(formData);
    } catch (err) {
      console.log(err);
    }
    toast("Série Cadastrada com Sucesso", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    router.push("/home");
  }

  function captureImagem(e) {

    // Verifica se usuaário selecionou alguma imagem
    if ( e.target.files && e.target.files?.length > 0) {
      setImagem(e.target?.files[0]);

      // Permite ler o conteúdo do arquivo do computador do usuário
      const readFile = new FileReader();

      // Função executada se a leitura do arquivo for sucesso
      readFile.onload = function(arquivocCarregado) {
        // Converter imagem para base64
        const baseImagem64 = arquivocCarregado.target.result;
        setSrcImage(baseImagem64);
      };

      // Método responsável por ler o conteúdo
      readFile.readAsDataURL(e.target.files[0]);
    }
  }

  return (
    <form onSubmit={handleUpdateSerie} className=" bg-[#cc3434] w-screen h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="bg-[#FDECEC] rounded-lg flex items-center flex-col w-[300px] md:w-[400px] p-4 gap-2">
        <div className="w-full">
          <Link className="mb-7" href="/home">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_28_1420)">
                <path d="M40 22H15.66L26.84 10.82L24 8L8 24L24 40L26.82 37.18L15.66 26H40V22Z" fill="black"/>
              </g>
              <defs>
                <clipPath id="clip0_28_1420">
                  <rect width="48" height="48" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </Link>
          <h1 className="font-medium text-2xl text-center">Adicionar Série</h1>
        </div>
        <div className="w-full">
          <FormGroup className="flex flex-col gap-2 mb-3">
            <label>Nome</label>
            <input type="text" placeholder="Nome da série" onChange={(e) => setName(e.target.value)} value={name || serie?.name} className="input" />
          </FormGroup>
          <FormGroup className="flex flex-col gap-2 mb-3">
            <label>Descrição</label>
            <textarea placeholder="Descrição da série" onChange={(e) => setDescription(e.target.value)} value={description || serie?.description} className="input h-28 placeholder:text-gray-500" />
          </FormGroup>
          <div className="flex justify-center" onClick={() => document.getElementById("file").click()}>
            {srcImage && <img src={srcImage} width={200} height={200} /> }
            {!srcImage && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-20 h-20">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            }
            <input onChange={captureImagem} id="file" name="file" accept="image/*" type="file"style={{display: "none"}} />
          </div>
          <div className="flex items-center justify-around mb-3">
            {allPlatforms?.map((platform) => (
              <FormGroup key={platform.id} className="flex items-center">
                <input data-id={platform.id} id={platform.id} checked={selectedPlatform === platform.name} onChange={() => handleCheckboxChange(platform.name, platform.id)} type="checkbox" className=" w-5 h-5" />
                <label htmlFor={platform.name} className="cursor-pointer">
                  <img src={`http://localhost:3001/tmp/${platform.image}`} width={52} height={52} />
                </label>
              </FormGroup>
            ))}
          </div>
          <div className="flex gap-3">
            <button type="submit" className="bg-[#CC3434] px-1 py-2
  rounded-md text-white w-full text-center cursor-pointer font-medium text-xl hover:bg-[#c22525] transition active:bg-[#c22525]">Salvar</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default NewSerie;
