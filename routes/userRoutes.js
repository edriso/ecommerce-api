const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require('../controllers/userController');
const {
  authorizePermissions,
  authenticateUser,
} = require('../middleware/authentication');

/**
 * authenticateUser middleware is used in all routes, so we could do it like this in app.js:
 * app.use('/api/v1/users', authenticateUser, userRouter);
 * but I liked this setup as I can clearly see what middlewares I'm using, and to be aware of which is following which
 * eg. authorizePermissions should be following authenticateUser
 */

router
  .route('/')
  .get([authenticateUser, authorizePermissions('admin')], getAllUsers);
router.route('/showMe').get(authenticateUser, showCurrentUser);
router.route('/updateUser').patch(authenticateUser, updateUser);
router.route('/updateUserPassword').patch(authenticateUser, updateUserPassword);
router.route('/:id').get(authenticateUser, getSingleUser);

module.exports = router;
