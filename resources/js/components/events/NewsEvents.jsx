import React,{useState, useEffect} from "react";
import Paginate from "../pagination/paginate";

export default function NewsEvents()
{
    const [FetchedNews, setFetchedNews] = useState([]);

    const getNews = async () => {
        try {
            await axios.get("api/events").then((res) => {
                setFetchedNews(res.data);
            });
        } catch (err) {}
    };
    useEffect(() => {
        getNews();
        return () => {};
    }, []);

    // post per   page
    // this is pagination logic
    // paginate compent is called in the end of this functional component
    const [currrentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(2);

    const indexOfLastPost = currrentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;

    const currentpost = FetchedNews.slice(indexOfFirstPost, indexOfLastPost);

    const Page = (pageNumber) => setCurrentPage(pageNumber);
    // end of pagination logic

    return (
        <>
            <div
                className="missionHeader "
                style={{
                    backgroundImage: 'url("./images/aboutUs/banner1.jpg")',
                }}
            >
                <div className="headText">
                    <h2 className="">News</h2>
                    <h5 className="">Home / News</h5>
                </div>
            </div>
            <div className="newsWrapper">
                <div className="newsHeader">
                    <h1>Stay on the Know</h1>
                    <div className="divider"></div>
                </div>
                <div className="newsBody">
                    <div className="row">
                        <div className="col-md-7 m-4">
                            {currentpost.map((items, index) => {
                                return (
                                    <>
                                        <div
                                            className="newsContainer   "
                                            key={index}
                                        >
                                            <div
                                                className="newsImageWrapper"
                                                style={{
                                                    backgroundImage: `url("./NewsImages/${items.ImageName}")`,
                                                }}
                                            ></div>
                                            <div className="floaterBox">
                                                {items.created_at.substr(0, 10)}
                                            </div>
                                            <div className="newsDesc pl-2 mt-4">
                                                <h3>{items.Title} </h3>
                                                <p className="p-2">
                                                    {items.Body}
                                                </p>
                                                <p className="">
                                                    <strong>
                                                        By:: {items.CreatorName}
                                                    </strong>
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                );
                            })}

                            <Paginate
                                postPerPage={postPerPage}
                                totalPost={FetchedNews.length}
                                Page={Page}
                            />

                            {/*  */}
                        </div>
                        <div className="col-md-4">
                            <div className="rightNewsSection">
                                <div className="rightNewsSectionHeader">
                                    <h2 className="text-center">Latest News</h2>
                                    <hr />
                                </div>

                                {FetchedNews.map((items, index) => {
                                    if (index <= 2) {
                                        return (
                                            <>
                                                <div
                                                    className="rightNewsBody m-3 "
                                                    key={index}
                                                >
                                                    <div className="newsbodyContainer">
                                                        <img
                                                            src={`./NewsImages/${items.ImageName}`}
                                                            className=" newsbodyContainerImage img-fluid mr-3"
                                                        />
                                                        <div className="newsBodyText">
                                                            <p>{items.Title}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        );
                                    } else {
                                        return;
                                    }
                                })}

                                {/*  */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
