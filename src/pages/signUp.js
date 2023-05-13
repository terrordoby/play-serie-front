import React from "react";
import Container from "../components/container/Container";
import Wrapper from "../components/container/Wrapper";
import FormGroup from "../components/formGroup/FormGroup";
import Button from "../components/button/Button";
import { useErrors } from "../hooks/useError";
import isEmailValid from "../utils/isEmailValid";
import { useState } from "react";
import Link from "next/link";


const signUp = () => {
  const {errors, setError, removeError, getErrorMessageByFieldName} = useErrors();
  const [email,setEmail] = useState("");

  function handleChangeEmail(e) {
    console.log("aqui");
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

  return (
    <Container>
      <Wrapper>
        <Link className="self-start mb-7" href="/">
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
        <h1 className="font-medium text-2xl">Cadastro</h1>
        <FormGroup error={getErrorMessageByFieldName("E-mail")} className="flex w-full flex-col mb-3">
          <label>E-mail</label>
          <input type="text" value={email} onChange={handleChangeEmail} placeholder="Digite seu e-mail" className="input" />
        </FormGroup>
        <FormGroup className="flex w-full flex-col mb-3">
          <label>Nome</label>
          <input type="text" placeholder="Digite seu primeiro nome" className="input" />
        </FormGroup>
        <FormGroup className="flex w-full flex-col mb-3">
          <label>Último Nome</label>
          <input type="text" placeholder="Digite seu Último nome" className="input" />
        </FormGroup>
        <FormGroup className="flex w-full flex-col mb-3">
          <label>Senha</label>
          <input type="password" placeholder="Digite sua senha" className="input" />
        </FormGroup>
        <Button>
          Cadastrar
        </Button>
      </Wrapper>
    </Container>
  );
};

export default signUp;
