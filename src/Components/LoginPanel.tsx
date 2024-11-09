import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import { EyeSlashFilledIcon } from "@/svg/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/svg/EyeFilledIcon";
import { Link } from "react-router-dom";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  loader: boolean;
  setLoader: (loader: boolean) => void;
  setActiveTab: (tabKey: string) => void; // Add setActiveTab prop
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  loader,
  setLoader,
  setActiveTab, // Destructure setActiveTab
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = (e: React.FormEvent) => {
    // Handle form submit logic here
    e.preventDefault();
    if (email.trim() && password.trim()) {
      onSubmit(email.trim(), password.trim());
      setLoader(true);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        {loader ? <Spinner size="sm" /> : "Login"}
      </Button>
      <p className="jost-extramediumlight w-full flex flex-wrap justify-center items-center">
        Don&apos;t have an account?&nbsp;
        <Link
          to="/"
          onClick={() => setActiveTab("register")} // Switch to Register tab
        >
          <span className="text-blue-400 underline">Register Here</span>
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
