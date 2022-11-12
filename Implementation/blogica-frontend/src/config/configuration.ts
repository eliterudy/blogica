const icons: any = {
  bookmark_selected: require("../assets/icons/app_logo.png"),
  bookmark_hover: require("../assets/icons/bookmark_hover.png"),
  bookmark_unselected: require("../assets/icons/bookmark_unselected.png"),
  search_black: require("../assets/icons/search_black.png"),
  search_white: require("../assets/icons/search_white.png"),
  app_logo: require("../assets/icons/app_logo.png"),
  app_icon: require("../assets/icons/app_icon.png"),
  account_points: require("../assets/icons/account_points.png"),
  like_selected: require("../assets/icons/like_selected.png"),
  like_unselected: require("../assets/icons/like_unselected.png"),
};

const images: any = {
  route_not_found: require("../assets/images/404-error.png"),
  server_down: require("../assets/images/server-down.jpg"),
  no_internet: require("../assets/images/no_internet.png"),
  blog_background: require("../assets/images/blog_background.jpeg"),
};

const gifs: any = {
  loader: require("../assets/gifs/loader.gif"),
  like: require("../assets/gifs/like.gif"),
};

const constants: any = {
  APP_NAME: "Blogica",
  USER_NOT_FOUND: "User not found",
  ARTICLE_NOT_FOUND: "Article not found",
  INCORRECT_USERNAME_PASSWORD: "Incorrect username or password",
  TEXT_SHIMMER_FILLER: "text shimmer",
  SORT_ARTICLE_NOTES: "View articles based on the selected sorting categories.",
  NEW_ARTICLE_NOTES:
    "What's the first thought that pops in your head. Is it informative and interesting. If so, why wait? Write it down and share it with everyone!",
  INTRO_BANNER_TITLE: "Stay Curious & Get a Read",
  INTRO_BANNER_MESSAGE:
    "Discover stories, thinking, and expertise from writers on any topic.",
  TAB_MESSAGE_PUBLISHED_ARTICLES:
    "This tab displays the amazing articles you have written so far.",
  TAB_MESSAGE_ARTICLES_DRAFTS:
    "This tab displays the amazing articles are currently working on.",
  TAB_MESSAGE_RECENTLY_VIEWED_ARTICLES:
    "This tab displays the most recently viewed articles by you.",
  TAB_MESSAGE_SAVED_ARTICLES: "This tab displays the articles that you saved.",
  UPLOAD_ARTICLE_POSTER_WARNING:
    "Please note: Once you save this article as a draft or publish it, you wont be able to update the article poster.",
  NO_INTERNET_ALERT_MESSAGE:
    "This action cannot be performed at the moment because of no internet connection. Please connect to an internet connection and try again",
  HAVE_NOT_SIGNED_UP_INVITE_MESSAGE:
    "If you haven't signed up with us yet and wish to access premium features, sign up today",
  NO_SEARCH_RESULT_MATCH: "No match found! Please try a different search",
  SEEN_ALL: "Yay! You have seen it all",
  NO_CONTRIBUTORS: "There are no contributors to our website yet.",
  NO_PUBLISHED_ARTICLES:
    "No articles have been published yet! Hopefully someone will be writing something soon.",
  NO_ARTICLES_UNDER_TAB:
    "There are no articles under this category/tab at the moment",
  OOPS_MESSAGE: "Oops! something went wrong",
  REACT_APP_APP_URL: process.env.REACT_APP_APP_URL || "www.google.com",
};

const svgs: any = {};

const colorCodes: Object = {};

const themes: any = {};

const colors = [
  "#2C3639",
  "#395B64",
  "#774360",
  "#B25068",
  "#51557E",
  "#A27B5C",
  "#E7AB79",
  "#A91079",
  "#816797",
  "#C74B50",
  "#570530",
  "#04293A",
  "#064663",
  "#A13333",
  "#864879",
  "#1E5128",
  "#3D2C8D",
  "#B42B51",
  "#334756",
  "#C40042",
];

export { colorCodes, constants, icons, images, gifs, svgs, themes, colors };
