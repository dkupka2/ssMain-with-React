import { getLastElFrom2DArray, applyView } from '../../services';

export const makeBody = body => target => array => view => [
  ...body,
  ...applyView(target)(getLastElFrom2DArray(array))(view)
];
