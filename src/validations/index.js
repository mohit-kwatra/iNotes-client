export const validations = {
  note: {
    title: {
      name: "title",
      targetObj: {
        required: "Title is required.",
        minLength: {
          value: 3,
          message: "Title must be atleast 3 characters.",
        },
      },
    },
    description: {
      name: "description",
      targetObj: {
        required: "Description is required.",
        minLength: {
          value: 5,
          message: "Description must be atleast 5 characters.",
        },
      },
    },
  },
  user: {
    email: {
      name: "email",
      targetObj: {
        required: "Email is required",
        maxLength: {
          value: 50,
          message: "Email must not be more than 50 characters.",
        },
        pattern: {
          value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
          message: "Email is not valid.",
        },
      },
    },
    password: {
      name: "password",
      targetObj: {
        forLogin: {
          required: "Password is required.",
        },
        forSignup: {
          required: "Password is required.",
          minLength: {
            value: 8,
            message: "Password must be 8 characters or more.",
          },
        },
      },
    },
    name: {
      name: "name",
      targetObj: {
        required: "Username is required.",
        maxLength: {
          value: 20,
          message: "Username must not be more than 20 characters.",
        },
        minLength: {
          value: 3,
          message: "Username must be 3 characters or more.",
        },
      },
    },
  },
};
