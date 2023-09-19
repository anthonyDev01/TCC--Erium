import { useState } from "react";
import { ButtonLoginCadastro } from "./buttonLoginCadastro";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Axios from "axios";

export function LoginContainer() {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>("");
  const [inputFocused, setInputFocused] = useState<boolean>(false);

  interface FormValues {
    email: string;
    senha: string;
  }

  const initialValues: FormValues = {
    email: "",
    senha: "",
  };

  const handleClickLogin = (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    Axios.post("http://localhost:5000/login", {
      email: values.email,
      password: values.senha,
    }).then((response) => {
      const msg = response.data.msg;
      if (
        msg === "Email já cadastrado" ||
        msg === "Senha incorreta" ||
        msg === "Email ou senha incorretos"
      ) {
        setMessage(msg); // Atualize o estado com a mensagem do back-end
      }
      if (
        msg == "Cadastrado(a) com sucesso" ||
        msg === "Usuário logado com sucesso"
      ) {
        const token = response.data.token;
        localStorage.setItem("token", token); // Armazene o token no localStorage

        navigate("/", { replace: true }); // Redireciona para a página inicial
        resetForm();
      } else {
        resetForm(); // Limpe os campos do formulário
      }
    });
  };

  const handleInputFocus = () => {
    setMessage("");
    setInputFocused(!inputFocused);
  };

  const validationLogin = yup.object().shape({
    email: yup
      .string()
      .email("Não é um Email")
      .required("Este campo é obrigatorio"),
    senha: yup
      .string()
      .min(8, "O minimo de caracteres é 8")
      .required("Este campo é obrigatorio"),
  });

  return (
    <div className="formContainer loginContainer">
      <Formik
        initialValues={initialValues}
        onSubmit={handleClickLogin}
        validationSchema={validationLogin}
      >
        <Form>
          <h1>Faça Login aqui</h1>
          <div className="loginFormGroup">
            <Field
              name="email"
              placeholder="Email:"
              onFocus={handleInputFocus}
            />
            <ErrorMessage
              component="span"
              name="email"
              className="form-error"
            />
          </div>
          <div className="loginFormGroup">
            <Field
              type="password"
              name="senha"
              placeholder="Senha:"
              maxLength="16"
              onFocus={handleInputFocus}
            />
            <ErrorMessage
              component="span"
              name="senha"
              className="form-error"
            />
          </div>
          <ButtonLoginCadastro typeButton="submit" title="Logar" />

          {/* Exiba apenas as mensagens específicas no <span> vazio quando o input não estiver focado */}
          {!inputFocused && message && <span className="error">{message}</span>}

          <span>Ou use sua conta</span>
        </Form>
      </Formik>
    </div>
  );
}
