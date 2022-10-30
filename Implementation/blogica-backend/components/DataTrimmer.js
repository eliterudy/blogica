const trimBadge = (badge) => {
  const { title, image_url, description } = badge;
  return { title, image_url, description };
};
const trimAuthor = (author) => {
  const {
    _id,
    username,
    image_url,
    firstname,
    lastname,
    bio,
    createdAt,
    updatedAt,
  } = author;
  return {
    _id,
    username,
    image_url,
    firstname,
    lastname,
    bio,
    createdAt,
    updatedAt,
  };
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

const trimAuthorList = (authors) => {
  return authors.map((author) => {
    return trimAuthor(author);
  });
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
  trimAuthorList,
  trimArticleWithoutAuthorPopulated,
  trimArticleWithAuthorPopulated,
  trimAuthor,
  trimBadge,
};
