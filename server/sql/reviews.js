const reviews = {};

reviews.queries = {
  index: 'SELECT * FROM Tagged_To_Review',
  view:
    "SELECT ROW_NUMBER() OVER (ORDER BY createdAt ASC) AS id, *, to_char(createdAt, 'DD/MM/YYYY') AS postedOn FROM Tagged_To_Review WHERE caretakerUsername LIKE $1",
};

module.exports = reviews;
