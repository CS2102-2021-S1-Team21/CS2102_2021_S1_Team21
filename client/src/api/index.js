import auth from './auth';
import petOwners from './petOwners';
import leaves from './leaves';
import availability from './availability';
import caretakers from './caretakers';
import reviews from './reviews';
import profileSettings from './profileSettings';

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
  profileSettings,
  // pets,
};

export default api;
