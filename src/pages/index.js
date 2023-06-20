import { useState } from "react";
import Button from "../components/button/Button";
import FormGroup from "../components/formGroup/FormGroup";
import Link from "next/link";
import { signIn, useSession} from "next-auth/react";
import { useErrors } from "../hooks/useError";
import isEmailValid from "../utils/isEmailValid";
import Image from "next/image";
import logo from "../../public/images/logo.svg";
import Wrapper from "../components/container/Wrapper";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const session = useSession();
  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkboxRegister, setCheckboxRegister] = useState(false);
  const [checkboxRecoverPassword, setCheckboxRecoverPassword] = useState(false);
  const {setError, removeError, getErrorMessageByFieldName} = useErrors();
  const router = useRouter();
  const formIsValid = email && password.length > 0;

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

  useEffect(() => {
    if (session.status === "authenticated") {
      router.replace("/home");
    }
  },[]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });
      if (!res.error) {
        window.location.href = "/home";
      }

      if (res.error) {
        setError({
          field: "E-mail",
          message: "E-mail/Senha estão incorretas"
        });
        setError({
          field: "Password",
          message: "E-mail/Senha estão incorretas"
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit} className=" bg-[#cc3434] w-screen h-screen flex flex-col items-center justify-center">
      <Wrapper className="bg-[#FDECEC] rounded-lg flex items-center flex-col w-[300px] md:w-[400px] p-7 gap-2">
        <Image src={logo} width={170} height={170} alt="Logo do site" />
        <FormGroup error={getErrorMessageByFieldName("E-mail")} className="flex w-full flex-col mb-3">
          <label className="text-md font-medium mb-1">E-mail</label>
          <input placeholder="Digite seu E-mail" value={email} onChange={handleChangeEmail} className="input" />
        </FormGroup>
        <FormGroup error={getErrorMessageByFieldName("Password")} className="flex flex-col w-full mb-5">
          <label className="text-md font-medium mb-1">Senha</label>
          <input type="password" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)} className="input" />
        </FormGroup>
        <FormGroup className="w-full">
          <div className="flex gap-3 items-center">
            <input type="checkbox" value={checkboxRegister} onChange={(e) => setCheckboxRegister(e.target.checked)} className="w-5 h-5" />
            <Link href="/signUp" onClick={redirectSignUp} className={`font-bold flex items-center gap-2 mb-1 ${checkboxRegister ? " cursor-pointer font-medium" : "pointer-events-none font-normal opacity-90"}`}>
            Registre-se
            </Link>
          </div>
          <div className="flex gap-3 items-center">
            <input type="checkbox" value={checkboxRecoverPassword} onChange={(e) => setCheckboxRecoverPassword(e.target.checked)} className="w-5 h-5" />
            <Link href="/forgot-password" onClick={redirectSignUp} className={`font-bold flex items-center gap-2 mb-1 ${checkboxRecoverPassword ? " cursor-pointer font-medium" : "pointer-events-none font-normal opacity-90"}`}>
            Esqueci minha senha
            </Link>
          </div>
        </FormGroup>
        <Button isValid={formIsValid} type="submit">
          Entrar
        </Button>
      </Wrapper>
    </form>
  );
}
