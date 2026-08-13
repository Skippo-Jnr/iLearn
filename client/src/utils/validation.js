export const validateForm = (formData, isRegister = false) => {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (isRegister) {
    if (!formData.username?.trim()) {
      errors.username = "Username is required";
    } else if (formData.username.trim().length < 3) {
      errors.username = "Username must be at least 3 characters long";
    }
  }

  // Email validation
  if (!formData.email?.trim()) {
    errors.email = "Email address is required";
  } else if (!emailRegex.test(formData.email.trim())) {
    errors.email = "Please enter a valid email address";
  }

  // password validation
  if (!formData.password) {
    errors.password = "Password is required";
  } else if (formData.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};
