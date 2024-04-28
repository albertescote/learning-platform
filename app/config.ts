const checkStrVar = (variable: string | undefined, name: string): string => {
  if (!variable) throw new Error(`undefined variable: ${name}`);
  return variable;
};

const AUTH_URL = checkStrVar(process.env.AUTH_URL, 'AUTH_URL');

const AUTH_SECRET = checkStrVar(process.env.AUTH_SECRET, 'AUTH_SECRET');

export { AUTH_URL, AUTH_SECRET };
