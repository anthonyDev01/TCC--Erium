import { useState } from "react";
import { ButtonLoginCadastro } from "./buttonLoginCadastro";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Axios from "axios";

export function CadastroContainer() {
  const [message, setMessage] = useState<string>("");
  const [inputFocused, setInputFocused] = useState<boolean>(false);

  interface FormValues {
    nome: string;
    email: string;
    senha: string;
    confirmarSenha: string;
  }

  const initialValues: FormValues = {
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  };

  const handleClickRegister = (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    Axios.post("https://erium-api.vercel.app/cadastro", {
      name: values.nome,
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
        alert(msg);
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

  const validationRegister = yup.object().shape({
    nome: yup.string().required("Este campo é obrigatório"),
    email: yup
      .string()
      .email("Não é um email válido")
      .required("Este campo é obrigatório"),
    senha: yup
      .string()
      .min(8, "O mínimo de caracteres é 8")
      .max(16)
      .required("Este campo é obrigatório"),
    confirmarSenha: yup
      .string()
      .oneOf([yup.ref("senha")], "As senhas não são iguais")
      .required("Este campo é obrigatório"),
  });

  return (
    <div className="formContainer cadastroContainer">
      <Formik
        initialValues={initialValues}
        onSubmit={handleClickRegister}
        validationSchema={validationRegister}
      >
        <Form>
          <h1>Registre-se aqui</h1>
          <div className="loginFormGroup">
            <Field name="nome" placeholder="Nome:" onFocus={handleInputFocus} />
            <ErrorMessage component="span" name="nome" className="form-error" />
          </div>
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
          <div className="loginFormGroup">
            <Field
              name="confirmarSenha"
              placeholder="Confirmar Senha:"
              maxLength="16"
              onFocus={handleInputFocus}
            />
            <ErrorMessage
              component="span"
              name="confirmarSenha"
              className="form-error"
            />
          </div>

          <ButtonLoginCadastro typeButton="submit" title="Registrar" />

          {/* Exiba apenas as mensagens específicas no <span> vazio quando o input não estiver focado */}
          {!inputFocused && message && <span className="error">{message}</span>}

          <span>Ou use sua conta</span>
        </Form>
      </Formik>
    </div>
  );
}
