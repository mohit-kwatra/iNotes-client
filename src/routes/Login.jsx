import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { AnimatePresence } from "framer-motion";
import { AuthContext } from "../contexts/AuthContext";
import { reducerCases } from "../contexts/AuthReducer";
import { validations } from "../validations";
import InputError from "../components/InputError";
import AnimationWrapper from "../components/AnimationWrapper";
import AnimatedPage from "../components/AnimatedPage";

const Login = () => {
  const [{ token }, dispatch] = useContext(AuthContext);
  const toast = useToast();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const [show, setShow] = useState(false);
  const toggleShowHide = () => setShow(!show);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const animateRef = useRef();
  const captchaRef = useRef();

  const formBg = useColorModeValue("whiteAlpha.800", "gray.800");

  const onSubmit = (token) => {
    setIsLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_SERVER_DOMAIN}/api/auth/login`,
        {
          ...getValues(),
          g_token: token,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setIsLoading(false);
        if (res.data.statusText === "SUCCESS") {
          localStorage.setItem("Token", res.data.authToken);
          dispatch({
            type: reducerCases.setToken,
            payload: res.data.authToken,
          });

          animateRef.current.classList.add("animate");
          setTimeout(() => {
            navigate("/");
          }, 3000);
        }
      })
      .catch((axiosError) => {
        setIsLoading(false);
        if (axiosError.response) {
          toast({
            title: "Something Went Wrong.",
            description: axiosError.response.data.statusText + ".",
            status: "error",
            variant: "top-accent",
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: "You seem disconnected.",
            description: "Please check your internet connection.",
            status: "error",
            variant: "top-accent",
            duration: 5000,
            isClosable: true,
          });
        }
      });
  };

  const handleReCAPTCHAChange = (token) => {
    onSubmit(token);
  };

  const invokeReCaptcha = () => {
    captchaRef.current.execute();
  };

  const handleReCAPTCHAError = () => {
    toast({
      title: "You seem disconnected.",
      description: "Please check your internet connection.",
      status: "error",
      variant: "top-accent",
      duration: 5000,
      isClosable: true,
    });
  };

  const didMount = useRef(false);
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;

      if (token) {
        return navigate("/");
      }

      const tokenAsWell = localStorage.getItem("Token");
      if (tokenAsWell && tokenAsWell.trim()) {
        axios
          .post(
            `${process.env.REACT_APP_SERVER_DOMAIN}/api/auth/verify-token`,
            {},
            {
              headers: {
                "Auth-Token": tokenAsWell,
              },
            }
          )
          .then((res) => {
            if (res.data.statusText === "Valid Token") {
              dispatch({ type: reducerCases.setToken, payload: tokenAsWell });
              navigate("/");
            } else {
              localStorage.removeItem("Token");
            }
          });
      }
    }
    //eslint-disable-next-line
  }, []);

  return (
    <AnimatedPage>
      <AnimationWrapper animateRef={animateRef} text="Login Successful!">
        <FormControl
          w="100%"
          bg={formBg}
          p="2rem"
          rounded="lg"
          shadow="lg"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Heading size="md" textAlign="center">
            Login
          </Heading>
          <Box my={4}>
            <FormLabel htmlFor="user-email">Email</FormLabel>
            <Input
              id="user-email"
              type="email"
              variant="filled"
              placeholder="example@gmail.com"
              errorBorderColor="red.400"
              {...register(
                validations.user.email.name,
                validations.user.email.targetObj
              )}
            />
            <AnimatePresence mode="wait" initial={false}>
              {errors.email && <InputError message={errors.email.message} />}
            </AnimatePresence>
            <FormLabel htmlFor="user-password" mt={2}>
              Password
            </FormLabel>
            <InputGroup>
              <Input
                id="user-password"
                type={show ? "text" : "password"}
                variant="filled"
                placeholder="Password"
                pr="4.5rem"
                errorBorderColor="red.400"
                {...register(
                  validations.user.password.name,
                  validations.user.password.targetObj.forLogin
                )}
              />
              <InputRightElement width="4.5rem">
                <Button size="sm" height="60%" onClick={toggleShowHide}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <AnimatePresence mode="wait" initial={false}>
              {errors.password && (
                <InputError message={errors.password.message} />
              )}
            </AnimatePresence>
            <Flex mt={3}>
              <ReCAPTCHA
                ref={captchaRef}
                sitekey={process.env.REACT_APP_SITE_KEY}
                size="invisible"
                onChange={handleReCAPTCHAChange}
                onErrored={handleReCAPTCHAError}
              />
            </Flex>
          </Box>
          <Button
            isLoading={isLoading}
            size={["sm", "md"]}
            colorScheme="blue"
            onClick={handleSubmit(invokeReCaptcha)}
          >
            Log In
          </Button>
        </FormControl>
      </AnimationWrapper>
    </AnimatedPage>
  );
};

export default Login;
