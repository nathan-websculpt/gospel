export const isValidNumber = (val: number | string): boolean => {
  try {
    if (!isNaN(val)) return true;
    else return false;
  } catch (e) {
    return false;
  }
};
