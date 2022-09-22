/* package inports */

import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  NavLink,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { Dispatch } from "@reduxjs/toolkit";
import { useMediaQuery } from "react-responsive";

/* component/screen inports */

/* helper imports */
import { cssHover } from "../../../components/generic/hoverProps";

import { icons, images } from "../../../config/configuration";
import Generic from "../../../components/generic/GenericComponents";
import { toggler } from "../../../utils/generic";
import actions from "../../../redux/actionReducers/index";
import LargeArticleCard from "./LargeArticleCard";
import WideArticleCard from "./WideArticleCard";
import { constants } from "../../../config/configuration";
import { ArticleListElement } from "../../../config/types";
import LargeShimmerCard from "./LargeShimmerCard";
import WideShimmerCard from "./WideShimmerCard";
import RankArticleCard from "./RankArticleCard";
import RankShimmerCard from "./RankShimmerCard";
import AboutProjectCard from "../../../components/AboutProject";

const articleDataset: ArticleListElement[] = [
  {
    _id: 1,
    title: "Biden on ‘60 Minutes’: ‘The pandemic is over’",
    imageUrl:
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
    author: {
      _id: 21,
      firstname: "Gavin",
      lastname: "D'mello",
      fullname: "Gavin D'mello",
      username: "gavin1040",
      bio:
        "Gavin D'mello is a content creator currently building an app called Blogica for his Masters degree",
      bookmarks: { articles: [] },
      published: { articles: [] },
      isAdmin: false,
      imageUrl:
        "https://phantom-marca.unidadeditorial.es/9adb565dcfc4dc3e9b1948c7cf5b8f01/resize/1320/f/jpg/assets/multimedia/imagenes/2022/02/21/16454391499069.jpg",
      email: "gavin@gmail.ccom",
      created: "2022-09-16T12:59-0500",
      updated: "2022-09-16T12:59-0500",
    },
    created: "2022-09-16T12:59-0500",
    updated: "2022-09-16T12:59-0500",
  },
  {
    _id: 2,
    title: "Is 18 and 34 too much of an age gap??",
    imageUrl: "https://picsum.photos/400/400/?random=1",
    description: `Especially remember Rule 1: Be polite and civil.

      Be polite and courteous to each other. Do not be mean, insulting or disrespectful to any other user on this subreddit.
      Do not harass or annoy others in any way.
      Do not catfish. Catfishing is the luring of somebody into an online friendship through a fake online persona. This includes any lying or deceit.
      You will be banned if you are homophobic, transphobic, racist, sexist or bigoted in any way.
      
      I am a bot, and this action was performed automatically. Please contact the moderators of this subreddit if you have any questions or concerns.`,
    author: {
      _id: 21,
      firstname: "Gavin",
      lastname: "D'mello",
      fullname: "Gavin D'mello",
      username: "gavin1040",
      bio: "",
      bookmarks: { articles: [] },
      published: { articles: [] },
      isAdmin: false,
      imageUrl:
        "https://phantom-marca.unidadeditorial.es/9adb565dcfc4dc3e9b1948c7cf5b8f01/resize/1320/f/jpg/assets/multimedia/imagenes/2022/02/21/16454391499069.jpg",
      email: "gavin@gmail.ccom",
      created: "2022-09-16T12:59-0500",
      updated: "2022-09-16T12:59-0500",
    },
    created: "2022-09-16T12:59-0500",
    updated: "2022-09-16T12:59-0500",
  },
  {
    _id: 3,
    title: "NFL news roundup: Latest league updates from Monday, Sept. 19",
    imageUrl: "https://picsum.photos/400/400/?random=2",
    description: `Sleep literally "cleans" your brain (at least, that is the commonly accepted understanding). https://www.health.harvard.edu/mind-and-mood/are-toxins-flushed-out-of-the-brain-during-sleep

    It's not too many days without sleep, and a person can start to have mental illness concerns. https://www.bbc.com/future/article/20150220-how-long-can-we-stay-awake`,
    author: {
      _id: 21,
      firstname: "Gavin",
      lastname: "D'mello",
      fullname: "Gavin D'mello",
      username: "gavin1040",
      bio: "",
      bookmarks: { articles: [] },
      published: { articles: [] },
      isAdmin: false,
      imageUrl:
        "https://phantom-marca.unidadeditorial.es/9adb565dcfc4dc3e9b1948c7cf5b8f01/resize/1320/f/jpg/assets/multimedia/imagenes/2022/02/21/16454391499069.jpg",
      email: "gavin@gmail.ccom",
      created: "2022-09-16T12:59-0500",
      updated: "2022-09-16T12:59-0500",
    },
    created: "2022-09-16T12:59-0500",
    updated: "2022-09-16T12:59-0500",
  },
  {
    _id: 4,
    title:
      "Fantasy football news and notes - Trey Lance out, James Robinson steps up    ",
    imageUrl: "https://picsum.photos/400/400/?random=3",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    author: {
      _id: 21,
      firstname: "Gavin",
      lastname: "D'mello",
      fullname: "Gavin D'mello",
      username: "gavin1040",
      bio: "",
      bookmarks: { articles: [] },
      published: { articles: [] },
      isAdmin: false,
      imageUrl:
        "https://phantom-marca.unidadeditorial.es/9adb565dcfc4dc3e9b1948c7cf5b8f01/resize/1320/f/jpg/assets/multimedia/imagenes/2022/02/21/16454391499069.jpg",
      email: "gavin@gmail.ccom",
      created: "2022-09-16T12:59-0500",
      updated: "2022-09-16T12:59-0500",
    },
    created: "2022-09-16T12:59-0500",
    updated: "2022-09-16T12:59-0500",
  },
  {
    _id: 5,
    title:
      "Britain's state funeral, Hurricane Fiona, Biden's comments on Taiwan",
    imageUrl: "https://picsum.photos/400/400/?random=4",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    author: {
      _id: 21,
      firstname: "Gavin",
      lastname: "D'mello",
      fullname: "Gavin D'mello",
      username: "gavin1040",
      bio: "",
      bookmarks: { articles: [] },
      published: { articles: [] },
      isAdmin: false,
      imageUrl:
        "https://phantom-marca.unidadeditorial.es/9adb565dcfc4dc3e9b1948c7cf5b8f01/resize/1320/f/jpg/assets/multimedia/imagenes/2022/02/21/16454391499069.jpg",
      email: "gavin@gmail.ccom",
      created: "2022-09-16T12:59-0500",
      updated: "2022-09-16T12:59-0500",
    },
    created: "2022-09-16T12:59-0500",
    updated: "2022-09-16T12:59-0500",
  },
  {
    _id: 6,
    title: "Teen killed; Queen Elizabeth; Tax rebates",
    imageUrl: "https://picsum.photos/400/400/?random=5",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    author: {
      _id: 21,
      firstname: "Gavin",
      lastname: "D'mello",
      fullname: "Gavin D'mello",
      username: "gavin1040",
      bio: "",
      bookmarks: { articles: [] },
      published: { articles: [] },
      isAdmin: false,
      imageUrl:
        "https://phantom-marca.unidadeditorial.es/9adb565dcfc4dc3e9b1948c7cf5b8f01/resize/1320/f/jpg/assets/multimedia/imagenes/2022/02/21/16454391499069.jpg",
      email: "gavin@gmail.ccom",
      created: "2022-09-16T12:59-0500",
      updated: "2022-09-16T12:59-0500",
    },
    created: "2022-09-16T12:59-0500",
    updated: "2022-09-16T12:59-0500",
  },
  {
    _id: 7,
    title:
      "UAMS Ramping Up ‘Resource Optimization’ Efforts for Fiscal Year 2023",
    imageUrl: "https://picsum.photos/400/400/?random=6",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    author: {
      _id: 21,
      firstname: "Gavin",
      lastname: "D'mello",
      fullname: "Gavin D'mello",
      username: "gavin1040",
      bio: "",
      bookmarks: { articles: [] },
      published: { articles: [] },
      isAdmin: false,
      imageUrl:
        "https://phantom-marca.unidadeditorial.es/9adb565dcfc4dc3e9b1948c7cf5b8f01/resize/1320/f/jpg/assets/multimedia/imagenes/2022/02/21/16454391499069.jpg",
      email: "gavin@gmail.ccom",
      created: "2022-09-16T12:59-0500",
      updated: "2022-09-16T12:59-0500",
    },
    created: "2022-09-16T12:59-0500",
    updated: "2022-09-16T12:59-0500",
  },
  {
    _id: 8,
    title: "Annual MED Week Slated for October 5",
    imageUrl: "https://picsum.photos/400/400/?random=7",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    author: {
      _id: 21,
      firstname: "Gavin",
      lastname: "D'mello",
      fullname: "Gavin D'mello",
      username: "gavin1040",
      bio: "",
      bookmarks: { articles: [] },
      published: { articles: [] },
      isAdmin: false,
      imageUrl:
        "https://phantom-marca.unidadeditorial.es/9adb565dcfc4dc3e9b1948c7cf5b8f01/resize/1320/f/jpg/assets/multimedia/imagenes/2022/02/21/16454391499069.jpg",
      email: "gavin@gmail.ccom",
      created: "2022-09-16T12:59-0500",
      updated: "2022-09-16T12:59-0500",
    },
    created: "2022-09-16T12:59-0500",
    updated: "2022-09-16T12:59-0500",
  },
  {
    _id: 9,
    title: "Climate law spurs CCS at new West Virginia gas plant",
    imageUrl: "https://picsum.photos/400/400/?random=8",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    author: {
      _id: 21,
      firstname: "Gavin",
      lastname: "D'mello",
      fullname: "Gavin D'mello",
      username: "gavin1040",
      bio: "",
      bookmarks: { articles: [] },
      published: { articles: [] },
      isAdmin: false,
      imageUrl:
        "https://phantom-marca.unidadeditorial.es/9adb565dcfc4dc3e9b1948c7cf5b8f01/resize/1320/f/jpg/assets/multimedia/imagenes/2022/02/21/16454391499069.jpg",
      email: "gavin@gmail.ccom",
      created: "2022-09-16T12:59-0500",
      updated: "2022-09-16T12:59-0500",
    },
    created: "2022-09-16T12:59-0500",
    updated: "2022-09-16T12:59-0500",
  },
  {
    _id: 10,
    title: "Iconic Russian singer asks to be named ‘foreign agent’",
    imageUrl: "https://picsum.photos/400/400/?random=9",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    author: {
      _id: 21,
      firstname: "Gavin",
      lastname: "D'mello",
      fullname: "Gavin D'mello",
      username: "gavin1040",
      bio: "",
      bookmarks: { articles: [] },
      published: { articles: [] },
      isAdmin: false,
      imageUrl:
        "https://phantom-marca.unidadeditorial.es/9adb565dcfc4dc3e9b1948c7cf5b8f01/resize/1320/f/jpg/assets/multimedia/imagenes/2022/02/21/16454391499069.jpg",
      email: "gavin@gmail.ccom",
      created: "2022-09-16T12:59-0500",
      updated: "2022-09-16T12:59-0500",
    },
    created: "2022-09-16T12:59-0500",
    updated: "2022-09-16T12:59-0500",
  },
  {
    _id: 11,
    title: "Fiona slams Dominican Republic after pounding Puerto Rico",
    imageUrl: "https://picsum.photos/400/400/?random=9",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    author: {
      _id: 21,
      firstname: "Gavin",
      lastname: "D'mello",
      fullname: "Gavin D'mello",
      username: "gavin1040",
      bio: "",
      bookmarks: { articles: [] },
      published: { articles: [] },
      isAdmin: false,
      imageUrl:
        "https://phantom-marca.unidadeditorial.es/9adb565dcfc4dc3e9b1948c7cf5b8f01/resize/1320/f/jpg/assets/multimedia/imagenes/2022/02/21/16454391499069.jpg",
      email: "gavin@gmail.ccom",
      created: "2022-09-16T12:59-0500",
      updated: "2022-09-16T12:59-0500",
    },
    created: "2022-09-16T12:59-0500",
    updated: "2022-09-16T12:59-0500",
  },
];

const Home = (props: any) => {
  const navigate = useNavigate();
  const [loading, isLoading] = useState(false);
  const [articles, updateArticles] = useState<null | ArticleListElement[]>(
    articleDataset
  );
  const [selectFilter, updateSelectFilter] = useState("top");
  const refToSpecialsUsingSmoothScroll = useRef() as React.MutableRefObject<
    HTMLInputElement
  >;
  const state = useSelector((state: any) => {
    return { user: true };
  });
  const { user } = state;
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateSelectFilter(e.target.value);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const fetchArticles = async () => {
    await updateArticles(null);
    await isLoading(true);
    setTimeout(async () => {
      await updateArticles(articleDataset);
      isLoading(false);
    }, 1200);
  };
  const scrollTo = (ref: any) => {
    if (ref && ref.current /* + other conditions */) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    // if (user) navigate("/main/feeds");
    // isLoading(false);
  }, []);

  return (
    <div className=" col-12">
      <div
        id="intro"
        style={{
          backgroundImage: `url(${images.blog_background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className=" bg-image shadow-5-strong vh-100 col-12"
      >
        <div
          className=" mask vh-100 col-12"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}
        >
          <div className=" container d-flex align-items-center justify-content-center text-center h-100">
            <div className=" text-white">
              <h1
                className=" mb-3"
                style={{
                  fontFamily: "Kaushan Script",
                  fontWeight: 400,
                  fontSize: "100px",
                }}
              >
                {constants.INTRO_BANNER_TITLE}
              </h1>
              <h5 className=" mb-4"> {constants.INTRO_BANNER_MESSAGE}</h5>

              <div
                className=" btn btn-outline-light btn-lg m-2"
                onClick={() => navigate("/main/articles")}
              >
                Start Reading
              </div>
              <div
                className=" btn btn-outline-light btn-lg m-2"
                onClick={() => scrollTo(refToSpecialsUsingSmoothScroll)}
              >
                Trending Articles
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 px-2 px-md-5">
        <h1
          className=" text-center pt-5 pb-2"
          style={{ fontWeight: "bold" }}
          ref={refToSpecialsUsingSmoothScroll}
        >
          TRENDING ARTICLES
        </h1>
        <div className=" row col-12 py-2 m-0 ">
          {/* {loading && <Generic.Loader message="Loading" />} */}

          <div className="col col-12  col-lg-9 p-0  ">
            <div className="row col-12  m-0">
              <div className="col-12 col-md-6 p-4 p-md-3 ">
                {articles && articles.length > 0 && !loading ? (
                  <LargeArticleCard
                    article={articles && articles[0]}
                    index={0}
                    redirect={`/main/recipeId/${articles[0]._id}`}
                  />
                ) : (
                  <LargeShimmerCard />
                )}
              </div>
              <div className="col-12 col-md-6 p-4 p-md-3 ">
                {articles && !loading
                  ? articles
                      .slice(1, 5)
                      .map((article: ArticleListElement, index: number) => (
                        <div className="p-2">
                          <WideArticleCard
                            key={index}
                            article={article}
                            index={index + 1}
                            redirect={`/main/recipeId/${article._id}`}
                          />
                        </div>
                      ))
                  : new Array(4).fill(0).map((shimmer, index) => (
                      <div className="pb-3">
                        <WideShimmerCard />
                      </div>
                    ))}
              </div>
            </div>
          </div>
          <div className=" col-12 col-md-3 px-4 py-2 d-none d-lg-flex border-start">
            <div className="col col-12">
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
              <Button
                size="md"
                className="w-100 bg-black"
                onClick={() => fetchArticles()}
              >
                Filter
              </Button>
            </div>
          </div>
        </div>
        <div className=" col col-12 border-top pt-4">
          <div className="d-flex flex-row ms-3">
            <i className="fa fa-cubes fa-lg me-2"></i>
            <h6 style={{ fontWeight: "bold" }}>MORE TRENDING ARTICLES</h6>
          </div>
          <div className="row col-12 m-0 p-4 p-md-3">
            {articles && !loading
              ? articles
                  .slice(5, 13)
                  .map((article: ArticleListElement, index: number) => (
                    <div className=" d-flex  col-12 col-md-4">
                      <RankArticleCard
                        key={index}
                        article={article}
                        index={index}
                        redirect={`/main/recipeId/${article._id}`}
                      />
                    </div>
                  ))
              : new Array(6).fill(0).map((shimmer, index) => (
                  <div className=" d-flex  col-12 col-md-4">
                    <RankShimmerCard index={index} />
                  </div>
                ))}
          </div>
          {/* For future versions */}
        </div>
      </div>
      <div
        className=" px-4 "
        style={{ backgroundColor: "#ECDBBA", borderRadius: 5 }}
      >
        <AboutProjectCard />
      </div>
    </div>
  );
};

export default Home;
