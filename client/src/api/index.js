import auth from './auth';
import petOwners from './petOwners';
import leaves from './leaves';
import availability from './availability';
import caretakers from './caretakers';
import reviews from './reviews';

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
  // pets,
};

export default api;
