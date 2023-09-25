const getAllReviews = async (req, res) => {
  res.send('getAllReviews');
};

const createReview = async (req, res) => {
  res.status(201).send('createReview');
};

const getSingleReview = async (req, res) => {
  res.send('getSingleReview');
};

const updateReview = async (req, res) => {
  res.send('updateReview');
};

const deleteReview = async (req, res) => {
  res.status(204).send('deleteReview');
};

module.exports = {
  getAllReviews,
  createReview,
  getSingleReview,
  updateReview,
  deleteReview,
};
