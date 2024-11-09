import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import { EyeSlashFilledIcon } from "@/svg/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/svg/EyeFilledIcon";
import { Link } from "react-router-dom";

interface RegisterFormProps {
  onSubmit: (username: string, email: string, password: string) => void;
  loader: boolean;
  setLoader: (loader: boolean) => void;
  setActiveTab: (tabKey: string) => void; // Add setActiveTab prop
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  loader,
  setLoader,
  setActiveTab, // Destructure setActiveTab
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = (e: React.FormEvent) => {
    // Handle form submit logic here
    e.preventDefault();
    if (username.trim() && email.trim() && password.trim()) {
      onSubmit(username.trim(), email.trim(), password.trim());
      setLoader(true);
      setUsername("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        className="my-2"
        type="username"
        label="Enter Username"
        placeholder="e.g. johndoe_2001"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <Input
        className="my-2"
        type="email"
        label="Enter Email"
        placeholder="e.g. johndoe@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        className="my-2"
        placeholder="Enter Password"
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
            aria-label="toggle password visibility"
          >
            {isVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button className="w-full my-2 jost-bold text-medium" type="submit" color="success" onClick={handleSubmit}>
        {loader ? <Spinner size="sm" /> : "Register"}
      </Button>
      <p className="jost-extramediumlight w-full flex flex-wrap justify-center items-center">
        Already have an account?&nbsp;
        <Link
          to="/"
          onClick={() => setActiveTab("login")} // Switch to Login tab
        >
          <span className="text-blue-400 underline">Login Here</span>
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
