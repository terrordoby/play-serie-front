import { useState } from "react";
import Button from "../components/button/Button";
import FormGroup from "../components/formGroup/FormGroup";
import Link from "next/link";
import { useErrors } from "../hooks/useError";
import isEmailValid from "../utils/isEmailValid";
import Image from "next/image";
import logo from "../../public/images/logo.svg";
import Wrapper from "../components/container/Wrapper";
import { useRouter } from "next/router";
import Container from "../components/container/Container";

export default function Home() {
  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {errors, setError, removeError, getErrorMessageByFieldName} = useErrors();
  const router = useRouter();

  function handleChangeEmail(e) {
    setEmail(e.target.value);

    if (e.target.value && !isEmailValid(e.target.value)) {
      setError({
        field: "E-mail",
        message: "Digite um e-mail válido"
      });
    } else {
      removeError("E-mail");
    }
  }

  function redirectSignUp() {
    router.push("/signUp");
  }

  return (
    <Container className=" bg-[#cc3434] w-screen h-screen flex flex-col items-center justify-center">
      <Wrapper className="bg-[#FDECEC] rounded-lg flex items-center flex-col w-[300px] md:w-[400px] p-7 gap-2">
        <Image src={logo} width={170} height={170} alt="Logo do site" />
        <FormGroup error={getErrorMessageByFieldName("E-mail")} className="flex w-full flex-col mb-3">
          <label className="text-md font-medium mb-1">E-mail</label>
          <input placeholder="Digite seu E-mail" value={email} onChange={handleChangeEmail} className="input" />
        </FormGroup>
        <FormGroup className="flex flex-col w-full mb-5">
          <label className="text-md font-medium mb-1">Senha</label>
          <input type="password" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)} className="input" />
        </FormGroup>
        <FormGroup className="w-full">
          <Link href="/signUp" onClick={redirectSignUp} className="font-bold flex items-center gap-2 mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Registre-se
          </Link>
        </FormGroup>
        <Button>
          Entrar
        </Button>
      </Wrapper>
    </Container>
  );
}
