export const setCookies = async (resData, cookie) => {
  console.log("resdata, cookie");
  console.log(resData);
  console.log(cookie);

  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + 24 * 60 * 60 * 1000); // 24 hours in milliseconds

  // Store in the cookie
  let id = resData.id;

  let name =
    resData.data.accountFirstName.toString() +
    " ".toString() +
    resData.data.accountLastName.toString();
  let email = resData.data.accountEmail.toString();
  let role = resData.data.role;
  cookie.set("_id", id, { expires: expirationDate });
  cookie.set("name", name, { expires: expirationDate });
  cookie.set("email", email, { expires: expirationDate });
  cookie.set("role", role, { expires: expirationDate });
};
