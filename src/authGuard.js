export const requireUserLogin = (navigate, message = "Please login first") => {
  const user = localStorage.getItem("snapcharge_user");

  if (!user) {
    alert(message);
    navigate("/login");
    return false;
  }

  return true;
};