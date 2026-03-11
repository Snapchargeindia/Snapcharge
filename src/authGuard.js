export const requireUserLogin = (
  navigate,
  message = "Please login first",
  redirectTo = "/login"
) => {
  const user = localStorage.getItem("snapcharge_user");

  if (!user) {
    alert(message);
    navigate(redirectTo, { replace: true });
    return false;
  }

  return true;
};