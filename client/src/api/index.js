import auth from './auth';
import availability from './availability';
import caretakers from './caretakers';
import leaves from './leaves';
import petCategories from './petCategories';
import petOwners from './petOwners';
import pets from './pets';
import reviews from './reviews';
import bids from './bids';
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
  pets,
  petCategories,
  transferType,
}


export default api;
