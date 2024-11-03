import React, { useState, useEffect } from "react";
import { Input, Button, Spinner, Tooltip } from "@nextui-org/react";
import { EyeSlashFilledIcon } from "@/svg/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/svg/EyeFilledIcon";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { fetchToken } from "@/services/api";
import { setToken } from "@/redux/apiToken/apiToken";
// import { Link } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux' 
import { RootState } from "@/redux/store";
import { toast } from "react-toastify";

interface APITokenProps {
  onSubmit: () => void;
  onRevoke: () => void;
  createloader: boolean;
  setCreateLoader: (loader: boolean) => void;
  revokeLoader: boolean;
  setRevokeLoader: (loader: boolean) => void;
  //   setActiveTab: (tabKey: string) => void; // Add setActiveTab prop
}

const RegisterForm: React.FC<APITokenProps> = ({
  onSubmit,
  onRevoke,
  createloader,
  setCreateLoader,
  revokeLoader,
  setRevokeLoader
  // setActiveTab, // Destructure setActiveTab
}) => {
  const tokenCookie = JSON.parse(localStorage.getItem("user") ?? "").token || "" ;
  const apiToken = useSelector((state: RootState) => state.apiToken.token)?.split("-")[1] ?? "";
  // const [password, setPassword] = useState<string | null>(apiToken); // Provide a default value for password
  const [visibleLoader, setVisibleLoader] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    toast(`Password visibility toggled: ${visibleLoader}`);
  }

  const dispatch = useDispatch();

  const handleCopy = () => {
    if (apiToken) {
      navigator.clipboard.writeText(`Shly-${apiToken}`).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    // Handle form submit logic here
    e.preventDefault();
    setCreateLoader(true);
    onSubmit();
    toast.success("API Token generated successfully.")
  };

  const handleRevoke = (e: React.FormEvent) => {
    e.preventDefault();
    setRevokeLoader(true);
    onRevoke();
    toast.warning("API Token revoked & created new one successfully.")
  }

  const fetchTokenRes = async (token: string): Promise<{ token: any }> => {
    try {
      const tokenRes = await fetchToken(token);
      
      // setPassword(part);
      dispatch(setToken(tokenRes))
      return tokenRes;
    } catch (error) {
      console.error("Error fetching token:", error);
      toast.error("Error in fetchin token")// Log any errors
      throw error; // Rethrow the error to handle it later
    }
  };


  useEffect(() => {
    const getToken = async () => {
      setVisibleLoader(true);
      try {
        // console.log(tokenCookie);
        await fetchTokenRes(tokenCookie);
      } catch (error) {
        console.error("Error fetching token:", error);
        // You can also set an error state here if you want to display it to the user
      } finally {
        setVisibleLoader(false);
      }
    };
  
    if (tokenCookie) {
      getToken();
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <span className="w-full flex justify-center items-center mt-3 jost-boldest">
        Generate API_TOKEN :
      </span>
      <Input
        className="my-2 text-lg"
        disabled
        placeholder="Generate a new X-API-TOKEN"
        startContent={
          apiToken && <div className="pointer-events-none flex items-center">
            <span className="text-default-400 jost-boldest text-lg">Shly-</span>
          </div>
        }
        endContent={
          apiToken && <div className="flex items-center space-x-2 justify-center ">
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
            <Tooltip content={copied ? "Copied!" : "Copy"} placement="top">
              <button
                type="button"
                className="focus:outline-none"
                onClick={handleCopy}
                aria-label="copy password"
              >
                <ContentCopyIcon fontSize="small" className="text-2xl text-default-400" />
              </button>
            </Tooltip>
          </div>
        }
        type={isVisible ? "text" : "password"}
        value={apiToken ?? ""}
        required
      />
      {!apiToken && <Button
        className="w-full my-2 jost-bold text-medium"
        type="submit"
        color="success"
        onClick={handleSubmit}
      >
        {createloader ? <Spinner size="sm" /> : "Create API Token"}
      </Button>}
      {apiToken && <Button
        className="w-full my-2 jost-bold lg:text-large text-small"
        color="danger"
        onClick={handleRevoke}
      >
        {revokeLoader ? <Spinner size="sm" /> : "Revoke existing and create new"}
      </Button>}
      {/* <p className="jost-extramediumlight w-full flex justify-center items-center">
          Already have an account?&nbsp;
          <Link
            to="/"
            onClick={() => setActiveTab("login")} // Switch to Login tab
          >
            <span className="text-blue-400 underline">Login Here</span>
          </Link>
        </p> */}
    </form>
  );
};

export default RegisterForm;
