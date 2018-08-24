import { getLastArray, applyView } from "../../services";

export const makeBody = body => target => array => view => [
  ...body,
  ...applyView(target)(getLastArray(array))(view)
];
