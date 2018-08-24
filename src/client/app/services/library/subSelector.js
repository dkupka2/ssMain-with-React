export const subSelector = (selector, element) =>
  selector === "hidden" ? "hidden" : `${selector}_${element}`;
