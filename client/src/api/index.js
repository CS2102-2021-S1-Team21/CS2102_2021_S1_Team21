import auth from './auth';
import petOwners from './petOwners';
import leaves from './leaves';
import availability from './availability';
import caretakers from './caretakers';
import reviews from './reviews';
import bids from './bids';
import pet from './pet';
import pet_category from './pet_category';
import transfer_type from './transfer_type';




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
  pet_category,
  transfer_type
};

export default api;
