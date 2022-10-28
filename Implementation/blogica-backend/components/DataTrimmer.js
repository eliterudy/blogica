const trimBadge = (badge) => {
  const { title, image_url } = badge;
  return { title, image_url };
};
const trimAuthor = (author) => {
  const { _id, title, image_url, firstname, lastname, bio } = author;
  return { _id, title, image_url, firstname, lastname, bio };
};
const trimArticleWithAuthorPopulated = (article) => {
  const { _id, title, description, image_url, author } = article;
  return {
    _id,
    title,
    description,
    image_url,
    author: trimAuthor(author),
  };
};
const trimArticleWithoutAuthorPopulated = (article) => {
  const { _id, title, description, image_url, author } = article;
  return {
    _id,
    title,
    description,
    image_url,
    author,
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
