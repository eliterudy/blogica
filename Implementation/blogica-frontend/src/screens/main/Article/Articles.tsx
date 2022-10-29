/* package inports */

import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Dispatch } from "@reduxjs/toolkit";
import { useMediaQuery } from "react-responsive";
import InfiniteScroll from "react-infinite-scroll-component";

/* component/screen inports */

/* helper imports */
import { cssHover } from "../../../components/generic/hoverProps";
import { constants, icons } from "../../../config/configuration";
import Generic from "../../../components/generic/GenericComponents";
import { toggler } from "../../../utils/generic";
import actions from "../../../redux/actionReducers/index";
import { ArticleFilters, Article } from "../../../config/types";
import ArticleListCard from "../../../components/ArticleListCard";
import { Input, Button } from "reactstrap";

const articleDataset: Article[] = [
  {
    _id: 1,
    title: "Biden on ‘60 Minutes’: ‘The pandemic is over’",
    image_url:
      "https://www.politico.com/dims4/default/d864c86/2147483647/strip/true/crop/4798x3199+0+0/resize/1260x840!/quality/90/?url=https%3A%2F%2Fstatic.politico.com%2F5e%2Fc6%2F7684a418451c94c58470bbee15b9%2Fhttps-delivery.gettyimages.com%2Fdownloads%2F1423991273",
    description: `President Joe Biden said “the pandemic is over” in discussing Covid during an interview that aired on Sunday evening on CBS’ “60 Minutes.”

      “The pandemic is over,” the president told Scott Pelley as they talked last week at the Detroit Auto Show. “We still have a problem with Covid. We’re still doing a lot of work on it ... but the pandemic is over. if you notice, no one’s wearing masks. Everybody seems to be in pretty good shape. And so I think it’s changing.”
      
      Despite Biden’s statement, Covid has continued to exact a toll in the United States and around the world. The John Hopkins Coronavirus Resource Center lists more than 2 million Covid cases in the country in the last 28 days, with hundreds dying from the disease every day.
      
      Biden’s insistence on Sunday night that the pandemic is over caught several of his own health officials by surprise. The declaration was not part of his planned remarks ahead of the “60 Minutes” interview, two administration officials familiar with the matter told POLITICO.
      
      Later in the interview, Biden was clear that he didn’t take the overall effects of the pandemic lightly.
      
      “The impact on the psyche of the American people as a consequence of the pandemic is profound,” he said. “Think of how that has changed everything. You know, people’s attitudes about themselves, their families, about the state of the nation, about the state of their communities. And so there’s a lot of uncertainty out there, a great deal of uncertainty. And we lost a million people.”
      
      Biden’s statement was the most definite one he has made about the pandemic since assuming the presidency in January 2021. He was less definitive when asked whether he planned to seek reelection.
      
      “Is it a firm decision that I run again? That remains to be seen,” Biden said, saying he would make his decision after the November midterms.
      
      He did qualify his remarks by saying it had always been his “intention” to seek another term and explained that “election laws” would come into play if he were to announce his candidacy at this juncture.
      
      In the interview, parts of which were recorded at the White House before Biden flew to Britain to attend the funeral of Queen Elizabeth II, the president also said he was startled to see the photograph of top-secret documents on the floor of the residence at former President Donald Trump’s Mar-a-Lago estate in Florida, calling Trump “totally irresponsible.”
      
      The president said his first thought was to ponder “how that could possibly happen.” He added: “I thought: What data was in there that may compromise sources and methods?”
      
      Biden said he has steered clear of trying to determine the specifics of what was in the documents that Trump possessed, leaving it to the Justice Department to sort out the matter. Biden has said that he didn’t have a heads-up that the FBI planned to search Mar-a-Lago to find classified documents, a search that has led to an ongoing legal battle between Trump and the Justice Department.
      
      “I have not asked for the specifics of those documents,” Biden told Pelley, “because I don’t want to get myself in the middle of whether or not the Justice Department should move or not move on certain actions they could take.”
      
      The interview was Biden’s first as president on “60 Minutes,” which launched its 55th season on Sunday night. Biden also addressed a range of other topics, including inflation (“I’m telling the American people that we’re going to get control of inflation”), his mental acuity, his approval ratings and international hot spots, including Ukraine and Taiwan.
      
      Biden asserted that U.S. forces would defend Taiwan if China were to launch an invasion. American policy toward Taiwan has been much less than definite on that point since the 1970s, when the U.S. recognized China, which claims Taiwan as part of its territory.
      
      “Would U.S. forces defend the island?” Pelley asked.
      
      “Yes, if, in fact, there was an unprecedented attack,” Biden said.
      
      Biden has in the past made similar comments about Taiwan, which have upset the Chinese leadership in Beijing. The latest were his least ambiguous yet. They follow a visit by House Speaker Nancy Pelosi to Taiwan last month that led China to suspend several dialogues with the U.S. and carry out military exercises around the island.
      
      The White House has often walked back such Biden comments, saying American policy has not changed.
      
      Nahal Toosi contributed to this report.`,
    createdAt: "",
    author: {
      username: "gavin10",
      createdAt: "",
      bio: "",
      _id: 21,
      firstname: "Gavin",
      lastname: "D'mello",

      image_url:
        "https://phantom-marca.unidadeditorial.es/9adb565dcfc4dc3e9b1948c7cf5b8f01/resize/1320/f/jpg/assets/multimedia/imagenes/2022/02/21/16454391499069.jpg",
    },
  },
  {
    _id: 2,
    title: "Is 18 and 34 too much of an age gap??",
    image_url: "https://picsum.photos/400/400/?random=1",
    description: `Especially remember Rule 1: Be polite and civil.

      Be polite and courteous to each other. Do not be mean, insulting or disrespectful to any other user on this subreddit.
      Do not harass or annoy others in any way.
      Do not catfish. Catfishing is the luring of somebody into an online friendship through a fake online persona. This includes any lying or deceit.
      You will be banned if you are homophobic, transphobic, racist, sexist or bigoted in any way.
      
      I am a bot, and this action was performed automatically. Please contact the moderators of this subreddit if you have any questions or concerns.`,
    createdAt: "",
    author: {
      username: "gavin10",
      createdAt: "",
      bio: "",
      _id: 21,
      firstname: "Gavin",
      lastname: "D'mello",
      image_url:
        "https://phantom-marca.unidadeditorial.es/9adb565dcfc4dc3e9b1948c7cf5b8f01/resize/1320/f/jpg/assets/multimedia/imagenes/2022/02/21/16454391499069.jpg",
    },
  },
  {
    _id: 3,
    title: "NFL news roundup: Latest league updates from Monday, Sept. 19",
    image_url: "https://picsum.photos/400/400/?random=2",
    description: `Sleep literally "cleans" your brain (at least, that is the commonly accepted understanding). https://www.health.harvard.edu/mind-and-mood/are-toxins-flushed-out-of-the-brain-during-sleep

    It's not too many days without sleep, and a person can start to have mental illness concerns. https://www.bbc.com/future/article/20150220-how-long-can-we-stay-awake`,
    createdAt: "",
    author: {
      username: "gavin10",
      createdAt: "",
      bio: "",
      _id: 21,
      firstname: "Gavin",
      lastname: "D'mello",
      image_url:
        "https://phantom-marca.unidadeditorial.es/9adb565dcfc4dc3e9b1948c7cf5b8f01/resize/1320/f/jpg/assets/multimedia/imagenes/2022/02/21/16454391499069.jpg",
    },
  },
  {
    _id: 4,
    title:
      "Fantasy football news and notes - Trey Lance out, James Robinson steps up    ",
    image_url: "https://picsum.photos/400/400/?random=3",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    createdAt: "",
    author: {
      username: "gavin10",
      createdAt: "",
      bio: "",
      _id: 21,
      firstname: "Gavin",
      lastname: "D'mello",
      image_url:
        "https://phantom-marca.unidadeditorial.es/9adb565dcfc4dc3e9b1948c7cf5b8f01/resize/1320/f/jpg/assets/multimedia/imagenes/2022/02/21/16454391499069.jpg",
    },
  },
  {
    _id: 5,
    title:
      "Britain's state funeral, Hurricane Fiona, Biden's comments on Taiwan",
    image_url: "https://picsum.photos/400/400/?random=4",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    createdAt: "",
    author: {
      username: "gavin10",
      createdAt: "",
      bio: "",
      _id: 21,
      firstname: "Gavin",
      lastname: "D'mello",
      image_url:
        "https://phantom-marca.unidadeditorial.es/9adb565dcfc4dc3e9b1948c7cf5b8f01/resize/1320/f/jpg/assets/multimedia/imagenes/2022/02/21/16454391499069.jpg",
    },
  },
  {
    _id: 6,
    title: "Teen killed; Queen Elizabeth; Tax rebates",
    image_url: "https://picsum.photos/400/400/?random=5",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    createdAt: "",
    author: {
      username: "gavin10",
      createdAt: "",
      bio: "",
      _id: 21,
      firstname: "Gavin",
      lastname: "D'mello",
      image_url:
        "https://phantom-marca.unidadeditorial.es/9adb565dcfc4dc3e9b1948c7cf5b8f01/resize/1320/f/jpg/assets/multimedia/imagenes/2022/02/21/16454391499069.jpg",
    },
  },
  {
    _id: 7,
    title:
      "UAMS Ramping Up ‘Resource Optimization’ Efforts for Fiscal Year 2023",
    image_url: "https://picsum.photos/400/400/?random=6",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    createdAt: "",
    author: {
      username: "gavin10",
      createdAt: "",
      bio: "",
      _id: 21,
      firstname: "Gavin",
      lastname: "D'mello",
      image_url:
        "https://phantom-marca.unidadeditorial.es/9adb565dcfc4dc3e9b1948c7cf5b8f01/resize/1320/f/jpg/assets/multimedia/imagenes/2022/02/21/16454391499069.jpg",
    },
  },
  {
    _id: 8,
    title: "Annual MED Week Slated for October 5",
    image_url: "https://picsum.photos/400/400/?random=7",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    createdAt: "",
    author: {
      username: "gavin10",
      createdAt: "",
      bio: "",
      _id: 21,
      firstname: "Gavin",
      lastname: "D'mello",
      image_url:
        "https://phantom-marca.unidadeditorial.es/9adb565dcfc4dc3e9b1948c7cf5b8f01/resize/1320/f/jpg/assets/multimedia/imagenes/2022/02/21/16454391499069.jpg",
    },
  },
  {
    _id: 9,
    title: "Climate law spurs CCS at new West Virginia gas plant",
    image_url: "https://picsum.photos/400/400/?random=8",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    createdAt: "",
    author: {
      username: "gavin10",
      createdAt: "",
      bio: "",
      _id: 21,
      firstname: "Gavin",
      lastname: "D'mello",
      image_url:
        "https://phantom-marca.unidadeditorial.es/9adb565dcfc4dc3e9b1948c7cf5b8f01/resize/1320/f/jpg/assets/multimedia/imagenes/2022/02/21/16454391499069.jpg",
    },
  },
  {
    _id: 10,
    title: "Iconic Russian singer asks to be named ‘foreign agent’",
    image_url: "https://picsum.photos/400/400/?random=9",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    createdAt: "",
    author: {
      username: "gavin10",
      createdAt: "",
      bio: "",
      _id: 21,
      firstname: "Gavin",
      lastname: "D'mello",
      image_url:
        "https://phantom-marca.unidadeditorial.es/9adb565dcfc4dc3e9b1948c7cf5b8f01/resize/1320/f/jpg/assets/multimedia/imagenes/2022/02/21/16454391499069.jpg",
    },
  },
  {
    _id: 11,
    title: "Fiona slams Dominican Republic after pounding Puerto Rico",
    image_url: "https://picsum.photos/400/400/?random=9",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    createdAt: "",
    author: {
      username: "gavin10",
      createdAt: "",
      bio: "",
      _id: 21,
      firstname: "Gavin",
      lastname: "D'mello",
      image_url:
        "https://phantom-marca.unidadeditorial.es/9adb565dcfc4dc3e9b1948c7cf5b8f01/resize/1320/f/jpg/assets/multimedia/imagenes/2022/02/21/16454391499069.jpg",
    },
  },
];

const Articles = (props: any) => {
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const locationParams = useLocation();
  // state hooks
  const [search, updateSearch] = useState("");
  const [offset, updateOffset] = useState(0);
  const [articles, updateArticles] = useState<null | Article[]>(articleDataset);
  const [loading, updateLoading] = useState(false);
  const [error, updateError] = useState(null);
  const [articleCount, updateArticleCount] = useState(0);
  const [callerCounter, updateCallerCounter] = useState(0);
  const [selectFilter, updateSelectFilter] = useState("top");

  // redux state
  const state = useSelector((state: any) => {
    // eslint-disable-next-line no-labels, no-label-var
    return { userState: state.userActionReducer };
  });
  const { user } = state.userState;

  // useEffects
  useEffect(() => {}, []);

  // functions/callbacks
  const searchUpdateCallback = async (value: string) => {
    // updateOffset(0);
    // updateArticle(null);
    // updateArticleLoading(true);
    await updateSearch(value);
    // await updateCallerCounter(callerCounter + 1);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateSelectFilter(e.target.value);
  };

  const getArticlesFromApi = () => {};

  // component conditional render

  const loadArticles = (articles: Article[]) => {
    var response;
    if (articles.length > 0) {
      response = (
        <div className="noselect  col-12  d-flex flex-row flex-wrap pt-4">
          {articles.map((article: Article, index: number) => (
            <div key={index} className={`col-12 mb-5 px-4 `}>
              <ArticleListCard article={article} index={index} />
            </div>
          ))}
        </div>
      );
    } else {
      response = (
        <div
          className="noselect  col-12  d-flex flex-row flex-wrap pt-5 pe-3"
          style={{ marginBottom: isTabletOrMobile ? 500 : 600 }}
        >
          <span className="col-12 text-center">{`The author has not written any articles yet`}</span>
        </div>
      );
    }

    return response;
  };

  // main render
  var localArticles = articles;

  return (
    <div className="col-12 d-flex flex-column  flex-grow-1">
      {/* <div className="bg-dark py-3 px-2 ">
        <h1 className="text-white px-5 text-center" style={{ fontSize: 80 }}>
          <span> Articles</span>
        </h1>
      </div> */}
      {/* Searchbar */}
      <div className="d-flex col-12 flex-row justify-content-center container mt-4 p-xl-0">
        <div className="col-12 col-md-10  p-4 " style={{}}>
          <Generic.SearchBar
            searchFor="articles"
            apiCallback={(val: any) => searchUpdateCallback(val)}
          />
        </div>
      </div>

      <div className=" row col-12 py-2 m-0 px-md-5 flex-grow-1">
        {/* Left section */}
        <div className=" col-12 col-md-3 px-4 pb-2 d-none d-md-block  ">
          <div className="col col-12 sticky-md-top mt-5">
            <h6 style={{ fontWeight: "bold" }}>FILTER ARTICLES</h6>
            <Input
              type="select"
              name="select"
              className="col-12"
              style={{ padding: 10 }}
              onChange={(e) => onChange(e)}
              value={selectFilter}
            >
              <option>Top</option>
              <option>New</option>
            </Input>
            <p className="subMessages my-2">
              {constants.FILTER_ARTICLE_NOTES}{" "}
            </p>
            <Button size="md" className="w-100 bg-black" onClick={() => {}}>
              Filter
            </Button>
          </div>
        </div>

        {/* Right section */}
        <div className="col col-12 col-md-9 p-0  border-start d-flex flex-column flex-grow-1">
          {loading && <Generic.Loader message="Loading Articles" />}
          {!loading && articles && (
            <div className="col-12">
              <div className="d-flex flex-column align-items-end py-3">
                <em
                  className="px-2 pt-1 me-4"
                  style={{
                    border: "0.5px solid #ddd",
                    backgroundColor: "#eee",
                    borderRadius: 3,
                  }}
                >
                  Showing: {articles.length} of {articleCount} articles
                </em>
              </div>

              <div className="col-12  ">
                {localArticles && (
                  <InfiniteScroll
                    className="pt-4 "
                    dataLength={articles ? articles.length : 0} //This is important field to render the next data
                    next={() => {
                      //  getContributorsFromApi();
                    }}
                    hasMore={articleCount > articles.length}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}
                    loader={<h4 className="col-12 text-center">Loading...</h4>}
                    endMessage={
                      <p className="col-12" style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                      </p>
                    }
                  >
                    {loadArticles(localArticles)}
                  </InfiniteScroll>
                )}
              </div>
            </div>
          )}
          {!loading && error && <Generic.ListError error={error} />}
        </div>
      </div>
    </div>
  );
};

export default Articles;
