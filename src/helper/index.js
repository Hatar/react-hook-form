export const formatBody = (string) => {
  return string.length > 25 ? string.substring(0, 40) + "..." : string;
};
