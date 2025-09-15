import { useState, useEffect } from "react";
import AuthForm from "../components/AuthForm/AuthForm";
import useMutation from "../hooks/api/useMutation";
import useAuth from "../hooks/auth/useAuth";
import { useNavigate } from "react-router";

const Login = () => {
  const { mutate, loading, error } = useMutation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const { login } = useAuth();
  const navigate = useNavigate();
  //   const navigate = useNavigate();

  useEffect(() => {
    if (error && error.formData) {
      setFormData((prevData) => ({
        ...prevData,
        ...error.formData,
        password: "",
      }));
    }
  }, [error]);

  const inputs = [
    {
      label: "Email",
      id: "email",
      type: "email",
    },
    {
      label: "Password",
      id: "password",
      type: "password",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await mutate(
        "http://localhost:3000/auth/login",
        formData,
        {
          method: "POST",
        }
      );

      console.log(result);

      setFormData({
        email: error?.formData.email ?? "",
        password: "",
      });

      if (!error) {
        login(result.token, result.user);
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error("A login error occurred:", err);
    }
  };

  return (
    <section>
      <AuthForm
        inputs={inputs}
        title={"Login"}
        type={"login"}
        formData={formData}
        setFormData={setFormData}
        loading={loading}
        error={error}
        handleSubmit={handleSubmit}
      />
    </section>
  );
};

export default Login;
