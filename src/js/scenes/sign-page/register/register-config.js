const REGISTER_CONFIG = [
  {
    dispVal: "First Name",
    key: "firstName",
    type: "text",
  },
  {
    dispVal: "Last Name",
    key: "lastname",
    type: "text",
  },
  {
    dispVal: "Password",
    key: "firstpassword",
    type: "password",
  },
  {
    dispVal: "Confirm Password",
    key: "confirmpassword",
    type: "password",
  },
  {
    dispVal: "Gender",
    key: "gender",
    type: "radio",
    values: [
      { name: "gender", type: "Male" },
      { name: "gender", type: "Female" },
    ],
  },
  {
    dispVal: "Email",
    key: "email",
    type: "email",
  },
];
export default REGISTER_CONFIG;
