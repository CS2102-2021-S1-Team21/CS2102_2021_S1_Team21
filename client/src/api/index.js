import auth from './auth';
import availability from './availability';
import adminDashboard from './adminDashboard';
import caretakers from './caretakers';
import caresFor from './caresFor';
import leaves from './leaves';
import petCategories from './petCategories';
import petOwners from './petOwners';
import pets from './pets';
import profileSettings from './profileSettings';
import reviews from './reviews';
import bids from './bids';
import transferType from './transferType';
import paymentMethod from './paymentMethod';
import userProfiles from './userProfiles';

/* ====================================
 * Index of all API request routes
 * ====================================
 */

const api = {
  auth,
  adminDashboard,
  petOwners,
  leaves,
  availability,
  caretakers,
  reviews,
  bids,
  pets,
  petCategories,
  transferType,
  paymentMethod,
  profileSettings,
  caresFor,
  userProfiles,
};

export default api;
