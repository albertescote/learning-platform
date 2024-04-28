const checkStrVar = (variable: string | undefined, name: string): string => {
  if (!variable) throw new Error(`undefined variable: ${name}`);
  return variable;
};

const ZOOM_LEAVE_URL = checkStrVar(
  process.env.ZOOM_LEAVE_URL,
  'ZOOM_LEAVE_URL',
);
const ZOOM_SDK_KEY = checkStrVar(process.env.ZOOM_SDK_KEY, 'ZOOM_SDK_KEY');
const BACKEND_URL = checkStrVar(process.env.BACKEND_URL, 'BACKEND_URL');

export { ZOOM_LEAVE_URL, ZOOM_SDK_KEY, BACKEND_URL };
