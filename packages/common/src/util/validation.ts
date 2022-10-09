export type ValidationResult = {
  status: boolean;
  reason?: string;
};

const validateEmail = (email: string): ValidationResult => {
  if (
    !String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    return {
      status: false,
      reason: 'Your email is invalid',
    };
  }
  return {
    status: true,
  };
};
