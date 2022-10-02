/* package inports */

import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Button } from "reactstrap";
import { Dispatch } from "@reduxjs/toolkit";
import { useMediaQuery } from "react-responsive";
import ReactQuill from "react-quill";

/* component/screen inports */

/* helper imports */
import { cssHover } from "../../../components/generic/hoverProps";

import { icons } from "../../../config/configuration";
import Generic from "../../../components/generic/GenericComponents";
import { toggler } from "../../../utils/generic";
import actions from "../../../redux/actionReducers/index";
import moment from "moment";
import ArticleHead from "./ArticleHead";
import ArticleBody from "./ArticleBody";

const ArticleDetail = (props: any) => {
  const navigate = useNavigate();
  const state = useSelector((state: any) => {
    return { userState: state.userActionReducer };
  });
  const { user } = state.userState;

  const [loading, isLoading] = useState(false);
  const [article, updateArticleDetails] = useState({
    _id: 1,
    title: "Biden on ‘60 Minutes’: ‘The pandemic is over’",
    image_url:
      "https://www.politico.com/dims4/default/d864c86/2147483647/strip/true/crop/4798x3199+0+0/resize/1260x840!/quality/90/?url=https%3A%2F%2Fstatic.politico.com%2F5e%2Fc6%2F7684a418451c94c58470bbee15b9%2Fhttps-delivery.gettyimages.com%2Fdownloads%2F1423991273",
    description: `<p>President Joe Biden said “the pandemic is over” in discussing Covid during an interview that aired on Sunday evening on CBS’ “60 Minutes.”</p><p><br></p><blockquote>“The pandemic is over,” the president told Scott Pelley as they talked last week at the Detroit Auto Show. “We still have a problem with Covid. We’re still doing a lot of work on it ... but the pandemic is over. if you notice, no one’s wearing masks. Everybody seems to be in pretty good shape. And so I think it’s changing.”</blockquote><p>      </p><p>Despite Biden’s statement, Covid has continued to exact a toll on the United States and around the world. The John Hopkins Coronavirus Resource Center lists more than 2 million Covid cases in the country in the last 28 days, with hundreds dying from the disease every day.</p><p>      </p><p>Biden’s insistence on Sunday night that the pandemic is over caught several of his own health officials by surprise. The declaration was not part of his planned remarks ahead of the “60 Minutes” interview, two administration officials familiar with the matter told POLITICO.</p><p>      </p><p>Later in the interview, Biden was clear that he didn’t take the overall effects of the pandemic lightly.</p><p>      </p><blockquote>“The impact on the psyche of the American people as a consequence of the pandemic is profound,” he said. “Think of how that has changed everything. You know, people’s attitudes about themselves, their families, about the state of the nation, about the state of their communities. And so there’s a lot of uncertainty out there, a great deal of uncertainty. And we lost a million people.”</blockquote><p>      </p><p>Biden’s statement was the most definite one he has made about the pandemic since assuming the presidency in January 2021. He was less definitive when asked whether he planned to seek reelection.</p><p>      </p><p>“Is it a firm decision that I run again? That remains to be seen,” Biden said, saying he would make his decision after the November midterms.</p><p>      </p><p>He did qualify his remarks by saying it had always been his “intention” to seek another term and explained that “election laws” would come into play if he were to announce his candidacy at this juncture.</p><p>      </p><p>In the interview, parts of which were recorded at the White House before Biden flew to Britain to attend the funeral of Queen Elizabeth II, the president also said he was startled to see the photograph of top-secret documents on the floor of the residence at former President Donald Trump’s Mar-a-Lago estate in Florida, calling Trump “totally irresponsible.”</p><p>      </p><p>The president said his first thought was to ponder “how that could possibly happen.” He added: “I thought: What data was in there that may compromise sources and methods?”</p><p>      </p><pre class="ql-syntax" spellcheck="false">Biden said he has steered clear of trying to determine the specifics of what was in the documents that Trump possessed, leaving it to the Justice Department to sort out the matter. Biden has said that he didn’t have a heads-up that the FBI planned to search Mar-a-Lago to find classified documents, a search that has led to an ongoing legal battle between Trump and the Justice Department.
</pre><p>      </p><blockquote>“I have not asked for the specifics of those documents,” Biden told Pelley, “because I don’t want to get myself in the middle of whether or not the Justice Department should move or not move on certain actions they could take.”</blockquote><p>      </p><p>The interview was Biden’s first as president on “60 Minutes,” which launched its 55th season on Sunday night. Biden also addressed a range of other topics, including inflation (“I’m telling the American people that we’re going to get control of inflation”), his mental acuity, his approval ratings and international hot spots, including Ukraine and Taiwan.</p><p>      </p><p>Biden asserted that U.S. forces would defend Taiwan if China were to launch an invasion. American policy toward Taiwan has been much less than definite on that point since the 1970s, when the U.S. recognized China, which claims Taiwan as part of its territory.</p><p>      </p><p>“Would U.S. forces defend the island?” Pelley asked.</p><p>      </p><p>“Yes, if, in fact, there was an unprecedented attack,” Biden said.</p><p>      </p><p>Biden has in the past made similar comments about Taiwan, which have upset the Chinese leadership in Beijing. The latest were his least ambiguous yet. They follow a visit by House Speaker Nancy Pelosi to Taiwan last month that led China to suspend several dialogues with the U.S. and carry out military exercises around the island.</p><p><br></p><p>The White House has often walked back such Biden comments, saying American policy has not changed.</p><p>      </p><p>Nahal Toosi contributed to this report.</p>`,
    author: {
      _id: 21,
      firstname: "Gavin",
      lastname: "D'mello",
      fullname: "Gavin D'mello",
      username: "gavin1040",
      bio:
        "Gavin D'mello is a content creator currently building an app called Blogica for his Masters degree",
      image_url:
        "https://phantom-marca.unidadeditorial.es/9adb565dcfc4dc3e9b1948c7cf5b8f01/resize/1320/f/jpg/assets/multimedia/imagenes/2022/02/21/16454391499069.jpg",
      created: "2022-09-16T12:59-0500",
    },
    created: "2022-09-16T12:59-0500",
  });

  useEffect(() => {}, []);

  return (
    <div className="col-12 d-flex flex-column  flex-grow-1 ">
      {loading && <Generic.Loader message="Loading" />}
      {!loading && article && (
        <div className="col-12">
          <div className="col-12 d-flex flex-column align-items-center ">
            <div className="col-12 col-md-8 px-4 px-md-0 py-5 ">
              <ArticleHead article={article} />
              <ArticleBody article={article} />
            </div>
          </div>
          <div
            className="col-12 d-flex flex-column align-items-center "
            style={{ backgroundColor: "#eee" }}
          >
            <Col className=" col-12 col-md-8 px-4 px-md-0 py-5  ">
              <p className="h4 col-12">About the author</p>
              <p className="col-12">{article.author.bio}</p>
              <em className=" col-12 h6 text-secondary">
                Liked the read and want to read more by this author? Check out{" "}
                <a href={`/main/author/id/${article.author._id}`}>
                  author's profile page
                </a>
              </em>
            </Col>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleDetail;
