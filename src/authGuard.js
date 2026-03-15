export const requireUserLogin = (
  navigate,
  message = "Please login first",
  redirectTo = "/login"
) => {
  const user = localStorage.getItem("snapcharge_user");
  const token = localStorage.getItem("snapcharge_token");

  if (!user || !token) {
    alert(message);

    navigate(redirectTo, {
      replace: true,
      state: { from: window.location.pathname },
    });

    return false;
  }

  return true;
};