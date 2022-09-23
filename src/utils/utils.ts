export const IsURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};

export const IsEmptyString = (str: unknown): boolean =>
  typeof str !== "string" || str.trim().length <= 0;
