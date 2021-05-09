const PAGE_METADATA = {
  SIDE_NAV_METADATA: [
    { display: "Preview", id: "Preview", tooltip: false, onClickFunc: null },
    { display: "Share", id: "Share", tooltip: false, onClickFunc: null },
    {
      display: "Login",
      id: "Login",
      tooltip: false,
      onClickFunc: ({
        each,
        setNavigationRouteAction,
        dispatch,
        history,
        setShowDrpdwnOpt,
        goToPagesAction,
      }) => {
        setNavigationRouteAction(
          dispatch,
          `${history.location.pathname}${history.location.search}`
        );
        history.push(`/${each.id.toLowerCase()}`);
        setShowDrpdwnOpt(false);
        goToPagesAction(dispatch, `${each.display}Page`);
      },
    },
    {
      display: "LogOut!",
      id: "Logout",
      tooltip: false,
      onClickFunc: ({ history, setShowDrpdwnOpt }) => {
        history.push(`/home`);
        setShowDrpdwnOpt(false);
      },
    },
    {
      display: "Sign Up",
      id: "SignUp",
      tooltip: false,
      onClickFunc: ({
        each,
        setNavigationRouteAction,
        dispatch,
        history,
        setShowDrpdwnOpt,
        goToPagesAction,
      }) => {
        setNavigationRouteAction(
          dispatch,
          `${history.location.pathname}${history.location.search}`
        );
        history.push(`/${each.id.toLowerCase()}`);
        setShowDrpdwnOpt(false);
        goToPagesAction(dispatch, `${each.display}Page`);
      },
    },
    {
      display: "About Us",
      id: "AboutUs",
      tooltip: false,
      onClickFunc: null,
    },
    {
      display: "Contact Us",
      id: "ContactUs",
      tooltip: false,
      onClickFunc: ({ history, setShowDrpdwnOpt }) => {
        history.push(`/support`);
        setShowDrpdwnOpt(false);
      },
    },
  ],
  APP_TABS_METADATA: [
    { display: "Home", id: "Home", tooltip: false, onClickFunc: null },
    {
      display: "Tools",
      id: "Tools",
      tooltip: false,
      onClickFunc: null,
      child: [
        {
          display: "Settings",
          id: "Settings",
          tooltip: false,
          onClickFunc: null,
        },
      ],
    },
    {
      display: "Services",
      id: "Services",
      tooltip: false,
      onClickFunc: null,
    },
  ],
};

export default PAGE_METADATA;
