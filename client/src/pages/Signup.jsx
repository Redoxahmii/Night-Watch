import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardHeader, Input, Link } from "@nextui-org/react";
import { Check, Eye, EyeOff, UserPlus, XCircle } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [input, setInput] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/user/signup`,
        {
          ...input,
        },
        {
          withCredentials: true,
        }
      );
      const { success, message } = data;
      if (success) {
        setSuccess(message);
      } else {
        setError(message);
      }
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };
  return (
    <div className="w-screen items-center justify-center h-screen flex">
      <Card className="flex items-center justify-center mt-10 py-10  px-20">
        <CardHeader className="justify-center mb-4 items-center">
          <h1 className="text-3xl font-semibold">Signup</h1>
        </CardHeader>
        <form
          className="flex gap-4 flex-col"
          action="submit"
          onSubmit={handleSubmit}
        >
          <Input
            type="text"
            label="Username"
            description="Enter your username"
            size="sm"
            isClearable
            autoComplete="off"
            isRequired
            name="username"
            onChange={handleChange}
          />
          <Input
            type="email"
            label="Email"
            isClearable
            description="We'll never share your email with anyone else."
            size="sm"
            autoComplete="off"
            isRequired
            name="email"
            onChange={handleChange}
          />
          <Input
            label="Password"
            autoComplete="off"
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
            Already have an account?{" "}
            <Link as={RouterLink} to="/login" size="sm">
              Login
            </Link>
          </p>
          <Button
            isDisabled={Loading}
            isLoading={Loading}
            color="secondary"
            variant="shadow"
            type="submit"
            className="mb-8"
            startContent={Loading ? "" : <UserPlus size={18} />}
          >
            {Loading ? "Signing up..." : "Signup"}
          </Button>
        </form>
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

export default Signup;
