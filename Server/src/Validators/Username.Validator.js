export const validateUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9_]{6,}$/;
  return usernameRegex.test(username);
};
