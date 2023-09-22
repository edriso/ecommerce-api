const CustomError = require('../errors');

const checkPermissions = ({ requestUser, resourceUserId }) => {
  //   console.log(requestUser); //{ userId: '650dc6002b927ae91fdaa679', name: 'mario', role: 'user' }
  //   console.log(resourceUserId); //new ObjectId("650c7d40d13caee2e9e077bf")
  //   console.log(typeof resourceUserId); //object
  if (requestUser.role === 'admin') return;
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new CustomError.UnauthorizedError(
    'Not authorized to access this route',
  );
};

module.exports = checkPermissions;
