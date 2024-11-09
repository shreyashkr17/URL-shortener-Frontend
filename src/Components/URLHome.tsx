import React, { useEffect, useState } from "react";
import UrlForm from "../Components/UrlForm";
import UrlResult from "../Components/UrlResult";
import RegisterPanel from "./RegisterPanel";
import LoginPanel from "./LoginPanel";
import APITokenPanel from "./APITokenPanel";
import CodeSnippetPanel from "./CodeSnippetPanel";
import {
  shortenUrl,
  registerUser,
  loginUser,
  generateToken,
  revokeandCreateToken,
  logoutUser,
} from "@/services/api";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { setToken } from "@/redux/apiToken/apiToken";
import QRCodeGenerator from "./QRCodeGeneratorPanel";
import { RootState } from "@/redux/store";
import { login, logout } from "@/redux/user/userSlice";
// import { User } from "@/redux/user/userTypes";
import { useDispatch, useSelector } from "react-redux";
import {
  // Badge,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  // Button,
} from "@nextui-org/react";
import { toast } from "react-toastify";
import ExcelHome from "./ExcelHome";
import Banner from "./Banner";
import Banner2 from './Banner2';
import {Button} from '@nextui-org/react';
// import Banner3 from './Banner3';

const URLHome: React.FC = () => {
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [registerEr, setRegisterError] = useState<string | null>(null);
  const [loginEr, setLoginError] = useState<string | null>(null);
  const [tokenCreateEr, setTokenCreateEr] = useState<string | null>(null);
  const [tokenCreateLoader, setTokenCreateLoader] = useState<boolean>(false);
  const [tokenRevokeEr, setTokenRevokeEr] = useState<string | null>(null);
  const [tokenRevokeLoader, setTokenRevokeLoader] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [registerLoader, setRegisterLoader] = useState<boolean>(false);
  const [loginLoader, setLoginLoader] = useState<boolean>(false);
  const [windowsize, SetWindowSize] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>("login");

  const dispatch = useDispatch();
  const userData = localStorage.getItem("user") ?? "";

  // Ensure that the item exists and is valid JSON before parsing
  let token = null;
  let parsedUser = null;
  if (userData) {
    try {
      parsedUser = JSON.parse(userData);
      token = parsedUser?.token ?? null; // Assign token only if it exists in parsed JSON
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
    }
  }
  const username = parsedUser ? parsedUser.username : "";
  const userEmail = parsedUser ? parsedUser.email : "";
  const apiTokenId = useSelector((state: RootState) => state.apiToken.id) ?? "";
  const apiToken = useSelector((state: RootState) => state.apiToken.token) ?? "";

  const handleSubmit = async (url: string) => {
    try {
      setError(null);
      const result = await shortenUrl(url, apiToken);
      setShortUrl(result.shortUrl);
      setLoader(false);
    } catch (error) {
      console.error("Error shortening URL:", error);
      setLoader(false);
      setError("Failed to shorten URL. Please try again.");
    }
  };

  const registerSubmit = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      setRegisterError(null);
      const res = await registerUser(username, email, password);
      dispatch(login(res));
      localStorage.setItem("user", JSON.stringify(res));
      localStorage.setItem("inTime", JSON.stringify(new Date().getTime()));
      setRegisterLoader(false);
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error(`Error in registering user: ${registerEr}`)
      setRegisterLoader(false);
      setRegisterError("Failed to register user. Please try again.");
    }
  };

  const loginSubmit = async (email: string, password: string) => {
    try {
      setLoginError(null);
      const res = await loginUser(email, password);
      dispatch(login(res));
      localStorage.setItem("user", JSON.stringify(res));
      localStorage.setItem("inTime", JSON.stringify(new Date().getTime()));
      setLoginLoader(false);
    } catch (error) {
      console.error("Error registering user:", error);
      setRegisterLoader(false);
      toast.error(`Error in login user: ${loginEr}`)
      setLoginError("Failed to register user. Please try again.");
    }
  };

  const logoutUserHandler = async () => {
    try {
      setError(null);
      const res = await logoutUser(token);
      console.log(res);
      localStorage.removeItem('user');
      localStorage.removeItem('inTime');
      dispatch(logout());
      window.location.reload();
    } catch (error) {
      console.error("Error logging out user:", error);
      setError("Failed to logout user. Please try again.");
    }
  };

  const generateTokenRes = async () => {
    try {
      setTokenCreateEr(null);
      const res = await generateToken(token);
      dispatch(setToken(res));
      setTokenCreateLoader(false);
    } catch (error) {
      console.error("Error logging out user:", error);
      toast.error(`API Token generation error: ${tokenCreateEr}`)
      setTokenCreateEr("Failed to generate token. Please try again.");
    }
  };

  const revokeTokenRes = async () => {
    try {
      setTokenRevokeEr(null);
      const res = await revokeandCreateToken(token, apiTokenId);
      dispatch(setToken(res));
      setTokenRevokeLoader(false);
    } catch (error) {
      console.error("Error logging out user:", error);
      toast.error(`API Token revoke & creation error: ${tokenRevokeEr}`)
      setTokenRevokeEr("Failed to revoke token. Please try again.");
    }
  };

  const clearShortURL = () => {
    setShortUrl(null);
  }

  //set windowSize using useEffect
  
  useEffect(() => {
    SetWindowSize(window.innerWidth);
    window.addEventListener("resize", () => {
      SetWindowSize(window.innerWidth);
    });
  },[]);

  return (
    <div className="h-full w-full ">
      <div className="z-40 relative top-2 w-full h-16 flex justify-between items-center p-8">
        <h1 className="righteous-regular text-white text-lg cursor-none">ShortlyCut.xyz</h1>
        {userData && <div className="flex gap-4 items-center">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                src={`https://avatar.iran.liara.run/username?username=${username}`}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{userEmail}</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              {/* <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem> */}
              <DropdownItem key="logout" color="danger" onClick={logoutUserHandler}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>}
      </div>
      {/* <div className="bg-black w-lvw h-lvh text-white flex justify-center items-center text-12xl">
        <h1 className="righteous-regular ">ShortlyCut.xyz</h1>
      </div> */}
      <div className="absolute h-full w-full  top-0"></div>
      <Banner/>
      <div id="url" className="relative inset-0 lg:h-full flex flex-col-reverse py-14 px-5 lg:flex-row justify-start lg:justify-center lg:items-center full">
        <div className="lg:w-1/2 w-full mb-4 h-full flex justify-center items-center sm:p-8">
          <div className="bg-white bg-opacity-50 backdrop-blur-sm sm:p-8 p-2 rounded-xl shadow-lg max-w-lg w-full">
            <UrlForm
              shortenUrl={shortUrl}
              onSubmit={handleSubmit}
              loader={loader}
              setLoader={setLoader}
            />
            {error && (
              <p className="mt-4 jost-boldest text-red-800 w-full flex justify-center items-center">
                {error}
              </p>
            )}
            {shortUrl && <QRCodeGenerator url={shortUrl} />}
            {shortUrl && (
              <div className="mt-6 text-black">
                <UrlResult shortUrl={shortUrl} />
              </div>
            )}
            {userData && shortUrl && <Button className="text-white text-medium jost-bold w-full mt-4" color="danger" onClick={clearShortURL}>Create new ShortenURL</Button>}
          </div>
        </div>
        {!userData && (
          <div className="lg:w-1/2 w-full mb-7 h-full flex justify-center items-center">
            <div className="bg-white bg-opacity-50 backdrop-blur-sm sm:p-8 p-2 rounded-xl shadow-lg max-w-lg w-full">
              <div className="flex justify-center items-center w-full flex-col">
                <Tabs
                  aria-label="Disabled Options"
                  selectedKey={activeTab} // Set active tab
                  onSelectionChange={(key) => setActiveTab(key as string)} // Handle tab switch
                >
                  <Tab
                    key="register"
                    title="Register"
                    className="w-full jost-bold"
                  >
                    <Card>
                      <CardBody>
                        <RegisterPanel
                          onSubmit={registerSubmit}
                          loader={registerLoader}
                          setLoader={setRegisterLoader}
                          setActiveTab={setActiveTab} // Pass setActiveTab function
                        />
                      </CardBody>
                    </Card>
                  </Tab>
                  <Tab key="login" title="Login" className="w-full jost-bold">
                    <Card>
                      <CardBody>
                        <LoginPanel
                          onSubmit={loginSubmit}
                          loader={loginLoader}
                          setLoader={setLoginLoader}
                          setActiveTab={setActiveTab} // Pass setActiveTab function
                        />
                      </CardBody>
                    </Card>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        )}
        {userData && (
          <div className="lg:w-1/2 w-full h-full flex justify-center items-center p-8">
            <div className="bg-white bg-opacity-50 backdrop-blur-sm p-8 rounded-xl shadow-lg w-full">
              <CodeSnippetPanel />
              <APITokenPanel
                onSubmit={generateTokenRes}
                onRevoke={revokeTokenRes}
                createloader={tokenCreateLoader}
                setCreateLoader={setTokenCreateLoader}
                revokeLoader={tokenRevokeLoader}
                setRevokeLoader={setTokenRevokeLoader}
              />
            </div>
          </div>
        )}
      </div>
      <Banner2/>
      {windowsize>=600 ? <ExcelHome user={userData}/> : <h1 className="jost-bold my-8 p-5 w-full flex justify-center items-center lg:text-5xl sm:text-4xl xs:text-3xl flex-wrap text-white text-center">Try In Larger Screen</h1>}
      {/* <Banner3/> */}
    </div>
  );
};

export default URLHome;
