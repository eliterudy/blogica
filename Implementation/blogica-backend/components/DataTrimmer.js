const trimBadge = (badge) => {
  const { title, image_url, description } = badge;
  return { title, image_url, description };
};
const trimAuthor = (author) => {
  const { _id, username, image_url, firstname, lastname, bio, createdAt } =
    author;
  return {
    _id,
    username,
    image_url,
    firstname,
    lastname,
    bio,
    createdAt,
  };
};
const trimArticleWithAuthorPopulated = (article, isForDetailedView) => {
  const {
    _id,
    title,
    description,
    image_url,
    author,
    createdAt,
    is_published,
    number_of_likes,
    number_of_views,
  } = article;

  var response = {
    _id,
    title,
    description,
    image_url,
    author: trimAuthor(author),
    is_published,
    createdAt,
  };
  return isForDetailedView
    ? { ...response, number_of_likes, number_of_views }
    : { ...response };
};
const trimArticleWithoutAuthorPopulated = (article, isForDetailedView) => {
  const {
    _id,
    title,
    description,
    image_url,
    author,
    createdAt,
    is_published,
    number_of_likes,
    number_of_views,
  } = article;
  var response = {
    _id,
    title,
    description,
    image_url,
    author,
    is_published,
    createdAt,
  };
  return isForDetailedView
    ? { ...response, number_of_likes, number_of_views }
    : { ...response };
};

const trimAuthorList = (authors) => {
  return authors.map((author) => {
    return trimAuthor(author);
  });
};

const trimArticleList = (articles, isAuthorPopulated, isForDetailedView) => {
  return articles.map((article) => {
    return isAuthorPopulated
      ? trimArticleWithAuthorPopulated(article, isForDetailedView)
      : trimArticleWithoutAuthorPopulated(article, isForDetailedView);
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
