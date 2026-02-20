export const PASSWORD_MIN_LENGTH = 12;
export const PASSWORD_MAX_LENGTH = 16;

export const PASSWORD_REGEX =
  new RegExp(
    `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z0-9$@$!%*?&]{${PASSWORD_MIN_LENGTH},${PASSWORD_MAX_LENGTH}}$`
  );

