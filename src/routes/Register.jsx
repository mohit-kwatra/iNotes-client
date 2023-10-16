import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { reducerCases } from "../contexts/AuthReducer";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { validations } from "../validations";
import { AnimatePresence } from "framer-motion";
import InputError from "../components/InputError";
import AnimationWrapper from "../components/AnimationWrapper";
import AnimatedPage from "../components/AnimatedPage";

const Register = () => {
  const [{ token }, dispatch] = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const animateRef = useRef();
  const captchaRef = useRef();

  const formBg = useColorModeValue("whiteAlpha.800", "gray.800");

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
    // eslint-disable-next-line
  }, []);

  const onSubmit = (token) => {
    setIsLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_SERVER_DOMAIN}/api/auth/signup`,
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
          const authToken = res.data.authToken;
          dispatch({ type: reducerCases.setToken, payload: authToken });
          localStorage.setItem("Token", authToken);

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
    captchaRef.current.reset();
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

  return (
    <AnimatedPage>
      <AnimationWrapper animateRef={animateRef} text="Registration Successful!">
        <FormControl w="100%" bg={formBg} p="2rem" rounded="lg" shadow="lg">
          <Heading size="md" textAlign="center">
            Create an account
          </Heading>
          <Box my={4}>
            <FormLabel htmlFor="user-name">Username</FormLabel>
            <Input
              id="user-name"
              type="text"
              variant="filled"
              placeholder="Full Name"
              {...register(
                validations.user.name.name,
                validations.user.name.targetObj
              )}
            />
            <AnimatePresence mode="wait" initial={false}>
              {errors.name && <InputError message={errors.name.message} />}
            </AnimatePresence>
            <FormLabel htmlFor="user-email" mt={2}>
              Email
            </FormLabel>
            <Input
              id="user-email"
              type="email"
              variant="filled"
              placeholder="example@gmail.com"
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
            <Input
              id="user-password"
              type="password"
              variant="filled"
              placeholder="Password"
              {...register(
                validations.user.password.name,
                validations.user.password.targetObj.forSignup
              )}
            />
            <AnimatePresence mode="wait" initial={false}>
              {errors.password && (
                <InputError message={errors.password.message} />
              )}
            </AnimatePresence>
            <FormLabel htmlFor="user-confirm-password" mt={2}>
              Confirm Password
            </FormLabel>
            <Input
              id="user-confirm-password"
              type="password"
              variant="filled"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                validate: (v) =>
                  v === getValues("password") || "Password does not match.",
              })}
            />
            <AnimatePresence mode="wait" initial={false}>
              {errors.confirmPassword && (
                <InputError message={errors.confirmPassword.message} />
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
            Sign Up
          </Button>
        </FormControl>
      </AnimationWrapper>
    </AnimatedPage>
  );
};

export default Register;
