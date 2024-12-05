export const removePasword = <T extends { passwordHash: string }>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  passwordHash: _,
  ...rest
}: T): Omit<T, "passwordHash"> => rest;
