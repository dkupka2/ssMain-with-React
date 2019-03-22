import { getLastElFrom2DArray, applyFormatting } from '../../services';

export const makeBody = body => target => array => (view = target) => [
  ...body,
  ...applyFormatting(target)(getLastElFrom2DArray(array))(view)
];
