
const books_HM = {};
const bookImages = require.context('../pictures/books', false, /\.(png|jpe?g|svg)$/);

bookImages.keys().forEach((key) => {
  const imageName = key.split('/').pop().split('.')[0];
  books_HM[imageName] = bookImages(key);
});

const users_HM = {};
const usersImages = require.context('../pictures/books', false, /\.(png|jpe?g|svg)$/);

usersImages.keys().forEach((key) => {
  const imageName = key.split('/').pop().split('.')[0];
  users_HM[imageName] = usersImages(key);
});



module.exports = { books_HM, users_HM }