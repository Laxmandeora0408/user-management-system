export const isValidEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const isValidFullName = (value: string) => {
  const fullNameRegex = /^(?!\s)([a-zA-Z]{2,})+(?:\s([a-zA-Z]{2,})+)+$/;
  return fullNameRegex.test(value);
};

export const isValidAll = (value: string, type: string) => {
  let result = false;
  switch (type) {
    case 'Email':
      result = isValidEmail(value);
      break;
    case 'Name':
      result = isValidFullName(value);
      break;
    default:
      result = false;
      break;
  }
  return result;
};
