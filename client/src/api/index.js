import auth from './auth';
import petOwners from './petOwners';
import leaves from './leaves';
import availability from './availability';

/* ====================================
 * Index of all API request routes
 * ====================================
 */

const api = {
  auth,
  petOwners,
  leaves,
  availability,
  // pets,
  // caretakers,
};

export default api;
