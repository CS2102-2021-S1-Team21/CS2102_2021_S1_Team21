import adminDashboard from './adminDashboard';
import auth from './auth';
import availability from './availability';
import caresFor from './caresFor';
import caretakers from './caretakers';
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
import users from './users';

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
  users,
  userProfiles,
};

export default api;
