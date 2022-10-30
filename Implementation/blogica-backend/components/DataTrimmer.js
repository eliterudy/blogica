const trimBadge = (badge) => {
  const { title, image_url, description } = badge;
  return { title, image_url, description };
};
const trimAuthor = (author) => {
  const { _id, username, image_url, firstname, lastname, bio, createdAt } =
    author;
  return { _id, username, image_url, firstname, lastname, bio, createdAt };
};
const trimArticleWithAuthorPopulated = (article) => {
  const { _id, title, description, image_url, author, createdAt, updatedAt } =
    article;
  return {
    _id,
    title,
    description,
    image_url,
    author: trimAuthor(author),
    createdAt,
    updatedAt,
  };
};
const trimArticleWithoutAuthorPopulated = (article) => {
  const { _id, title, description, image_url, author, createdAt, updatedAt } =
    article;
  return {
    _id,
    title,
    description,
    image_url,
    author,
    createdAt,
    updatedAt,
  };
};

const trimArticleList = (articles, isAuthorPopulated) => {
  return articles.map((article) => {
    return isAuthorPopulated
      ? trimArticleWithAuthorPopulated(article)
      : trimArticleWithoutAuthorPopulated(article);
  });
};

const trimBadgeList = (badges) => {
  const filteredBadgesData = badges.map((badgeData) => {
    return { ...trimBadge(badgeData.badge), count: badgeData.count };
  });
  return filteredBadgesData;
};

module.exports = {
  trimBadgeList,
  trimArticleList,
  trimArticleWithoutAuthorPopulated,
  trimArticleWithAuthorPopulated,
  trimAuthor,
  trimBadge,
};
