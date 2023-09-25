import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PageContext } from "../utils/PageContext";
import {
  Button,
  Card,
  Link,
  CardBody,
  CardHeader,
  Input,
} from "@nextui-org/react";
import { Check, Eye, EyeOff, LogIn, XCircle } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

const Login = () => {
  const { setCookie } = useContext(PageContext);
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/user/login`,
        {
          ...input,
        },
        {
          withCredentials: true,
        }
      );
      const { success, message } = data;
      setCookie("token", data.cookie);
      if (success) {
        setSuccess(message);
      } else {
        setError(message);
      }
      setTimeout(() => {
        navigate("/");
      }, 2000);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
    setInput({
      email: "",
      password: "",
    });
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card className="flex items-center justify-center p-10">
        <CardHeader className=" justify-center items-center">
          <h1 className="text-3xl font-semibold">Login</h1>
        </CardHeader>
        <CardBody>
          <form
            action="submit"
            className="flex gap-4 flex-col"
            onSubmit={handleSubmit}
          >
            <Input
              isRequired
              label="Email"
              type="email"
              isClearable
              description="We'll never share your email with anyone else."
              size="sm"
              name="email"
              onChange={handleChange}
            />

            <Input
              label="Password"
              size="sm"
              isRequired
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <Eye size={18} className=" text-default-400" />
                  ) : (
                    <EyeOff size={18} className=" text-default-400" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              name="password"
              onChange={handleChange}
            />
            <p className="text-center text-small">
              Need to create an account?{" "}
              <Link as={RouterLink} to="/signup" size="sm">
                Sign up
              </Link>
            </p>
            <Button
              isDisabled={Loading}
              isLoading={Loading}
              color="secondary"
              variant="shadow"
              startContent={Loading ? "" : <LogIn size={18} />}
              type="submit"
            >
              {Loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardBody>
        {success && (
          <div className="animate-fade rounded-xl bg-success/70 p-4 items-center justify-center flex gap-1">
            <Check size={18} />
            <span className="text-sm">{success}</span>
          </div>
        )}
        {error && (
          <div className="animate-fade rounded-xl bg-danger p-4 items-center justify-center flex gap-1">
            <XCircle size={18} />
            <span className="text-sm">{error}</span>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Login;
