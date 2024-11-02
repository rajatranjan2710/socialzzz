export const validateSignUp = (data) => {
  if (!data.username || !data.email || !data.password || !data.fullname) {
    return false;
  }
  if (data.password.length < 6) {
    return false;
  }
  return true;
};

export const loginValidate = (data) => {
  if (!data.username || !data.password) {
    return false;
  }
  return true;
};

export const validatePost = (data) => {
  if (!data.caption) {
    return false;
  }
  return true;
};

export const validateVlog = (data) => {
  if (!data.title || !data.description || !data.media) {
    return false;
  }
  return true;
};
