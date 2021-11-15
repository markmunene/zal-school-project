import React,{useState, useEffect} from "react";
import { Route, Link, Switch, BrowserRouter as Router } from "react-router-dom";

import "./Carousel.css";
export default function Carousel()
{
    
    const [fetchedImg, setFetchedImg] = useState([]);
    
    const getImages = async () => {
        try {
            await axios.get("api/storeImage").then((res) => {
                setFetchedImg(res.data);
            });
        } catch (err) {}
    };
    useEffect(() => {
        getImages();
        return () => {};
    }, []);
    return (
        <>
            <div id="demo" className="carousel slide" data-ride="carousel">
                <ul className="carousel-indicators">
                    {fetchedImg.map((items, index) => {
                        return (
                            <>
                                <li
                                    data-target="#demo"
                                    className={index == 0 ? "active" : ""}
                                    data-slide-to={index}
                                    key={index}
                                ></li>
                            </>
                        );
                    })}
                </ul>
                <div className="carousel-inner">
                    {fetchedImg.map((items, index) => {
                        return (
                            <>
                                <div
                                    className={
                                        index == 0
                                            ? "carousel-item active"
                                            : "carousel-item "
                                    }
                                    key={index}
                                >
                                    <img
                                        className="caroImage img-flud"
                                        src={"./uploadedImages/" + items.image}
                                        alt=""
                                    />
                                </div>
                            </>
                        );
                    })}
                </div>
                <a
                    className="carousel-control-prev"
                    href="#demo"
                    data-slide="prev"
                >
                    <span className="carousel-control-prev-icon"></span>
                </a>
                <a
                    className="carousel-control-next"
                    href="#demo"
                    data-slide="next"
                >
                    <span className="carousel-control-next-icon"></span>
                </a>
            </div>
        </>
    );
}
