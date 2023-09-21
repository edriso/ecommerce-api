const createTokenUser = (user) => {
  return { name: user.name, userId: user.id, role: user.role };
};

module.exports = createTokenUser;
