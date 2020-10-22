import auth from './auth';
import availability from './availability';
import caretakers from './caretakers';
import caresFor from './caresFor';
import leaves from './leaves';
import petCategories from './petCategories';
import petOwners from './petOwners';
import pets from './pets';
import profileSettings from './profileSettings';
import reviews from './reviews';
import userProfiles from './userProfiles';

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
  pets,
  petCategories,
  caresFor,
  userProfiles,
};

export default api;
