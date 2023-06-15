import { ButtonLoginCadastro } from "./buttonLoginCadastro";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Axios from "axios";

export function LoginContainer() {
  interface FormValues {
    email: string;
    senha: string;
  }

  const initialValues: FormValues = {
    email: "",
    senha: "",
  };

  const handleClickLogin = (values: FormValues) => {
    Axios.post("http://localhost:5000/login", {
      email: values.email,
      password: values.senha,
    }).then((response) => {
      console.log(response);
    });
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
            <Field name="email" placeholder="Email:" />
            <ErrorMessage
              component="span"
              name="email"
              className="form-error"
            />
          </div>
          <div className="loginFormGroup">
            <Field name="senha" placeholder="Senha:" maxLength="16" />
            <ErrorMessage
              component="span"
              name="senha"
              className="form-error"
            />
          </div>
          <ButtonLoginCadastro typeButton="submit" title="Logar" />
          <span>Ou use sua conta</span>
        </Form>
      </Formik>
    </div>
  );
}
