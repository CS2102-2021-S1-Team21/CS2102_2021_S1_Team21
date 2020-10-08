const reviews = {};

reviews.queries = {
  index: 'SELECT * FROM Tagged_To_Review',
  view:
    "SELECT ROW_NUMBER() OVER (ORDER BY reviewDateTime) AS id, *, to_char(reviewDateTime, 'DD/MM/YYYY') AS postedOn FROM Bidded_For_Job WHERE caretakerUsername LIKE $1",
};

module.exports = reviews;
