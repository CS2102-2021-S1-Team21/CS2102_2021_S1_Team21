import auth from './auth';
import petOwners from './petOwners';
import leaves from './leaves';
import availability from './availability';
import caretakers from './caretakers';
import reviews from './reviews';
import bids from './bids';
import pet from './pet';
import petCategory from './petCategory';
import transferType from './transferType';

/* ====================================
 * Index of all API request routes
 * ====================================
 */

const api = {
  auth,
  petOwners,
  leaves,
  availability,
  caretakers,
  reviews,
  bids,
  pet,
  petCategory,
  transferType,
};

export default api;
