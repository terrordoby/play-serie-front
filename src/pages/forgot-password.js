import React from "react";
import FormGroup from "../components/formGroup/FormGroup";
import { useState } from "react";
import Button from "../components/button/Button";
import Container from "../components/container/Container";
import Wrapper from "../components/container/Wrapper";
import Link from "next/link";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
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
        <h1 className="font-medium text-2xl">Recuperar Senha</h1>
        <FormGroup className="flex w-full flex-col mb-3">
          <label>E-mail</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu e-mail" className="input" />
        </FormGroup>
        <Button isValid={email}>
          Enviar E-mail
        </Button>
      </Wrapper>
    </Container>
  );
};

export default ForgotPassword;
