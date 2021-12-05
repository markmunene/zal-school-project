import React, { useState, useEffect } from "react";

export default function Mission() {
    const [fetchedMission, setfetchedMission] = useState([]);
    const [fetchedaboutHeaders, setFetchedaboutHeaders] = useState([]);

    const getMission = async () => {
        try {
            await axios.get("api/mission").then((res) => {
                setfetchedMission(res.data);
            });
        } catch (err) {}
    };
      const getaboutHeaders = async () => {
          try {
              await axios.get("api/aboutHeaders").then((res) => {
                  setFetchedaboutHeaders(res.data);
              });
          } catch (err) {}
      };
    useEffect(() => {
        getMission();
        getaboutHeaders();
        return () => {};
    }, []);
  
    return (
        <>
            <div className="missionWrapper">
                <div
                    className="missionHeader "
                    style={{
                        backgroundImage: 'url("./images/aboutUs/banner1.jpg")',
                    }}
                >
                    <div className="headText">
                        <h2 className="">
                            {fetchedaboutHeaders
                                .filter(
                                    (item) => item.sectionHeader == "Mission"
                                )
                                .map((item) => item.sectionHeader)}
                        </h2>
                        <h5 className="">
                            Home/
                            {fetchedaboutHeaders
                                .filter(
                                    (item) => item.sectionHeader == "Mission"
                                )
                                .map((item) => item.sectionHeader)}
                        </h5>
                    </div>
                </div>

                <div className="contentWrapper">
                    {fetchedMission
                        .filter((item) => item.SectionName == "imageSection")
                        .map((items, index) => {
                            return (
                                <>
                                    <div className="missionBody " key={index}>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="imageMainWrapper">
                                                    <img
                                                        src={
                                                            "./uploadedImages/" +
                                                            items.ImageName
                                                        }
                                                        alt=""
                                                        className="missionImage img-fluid"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="headers">
                                                    <div className="textContent">
                                                        <h2>{items.Header}</h2>
                                                        <div className="border"></div>
                                                    </div>

                                                    <div className="dates mt-4">
                                                        <h6>From 1989-now</h6>
                                                    </div>
                                                    <div className="rowText">
                                                        {items.Description}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            );
                        })}
                    <div className="valuesSection">
                        <div className="mainHeader">
                            <h1>
                               
                                {fetchedaboutHeaders
                                    .filter(
                                        (item) =>
                                            item.sectionHeader == "Mission"
                                    )
                                    .map((item) => item.sectionTitle)}
                            </h1>
                            <div className="border"></div>
                        </div>
                        <div className="valuesMainBody">
                            <div className="row">
                                {fetchedMission
                                    .filter(
                                        (item) =>
                                            item.SectionName == "valueSection"
                                    )
                                    .map((items, index) => {
                                        return (
                                            <>
                                                <div
                                                    className="col-md-4"
                                                    key={items.id}
                                                >
                                                    <center>
                                                        <i
                                                            className={`${items.SectionIcon}`}
                                                        ></i>

                                                        <h2 className="mt-5 text-center">
                                                            <strong>
                                                                {
                                                                    items.ValuesHeader
                                                                }
                                                            </strong>
                                                        </h2>
                                                        <div className="border"></div>
                                                        <p>
                                                            {items.ValuesDesc}
                                                        </p>
                                                    </center>
                                                </div>
                                            </>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                    {/* values section */}

                    <div className="AboutFooter ">
                        <div className="row ">
                            {fetchedMission
                                .filter(
                                    (item) => item.SectionName == "statSection"
                                )
                                .map((items, index) => {
                                    return (
                                        <>
                                            <div
                                                className="col-md-4"
                                                key={index}
                                            >
                                                <div className="col-content">
                                                    <h2 className="mt-5 text-center">
                                                        <strong>
                                                            {items.StatTotal}
                                                        </strong>
                                                    </h2>
                                                    <div className="border"></div>
                                                    <p>
                                                        <strong>
                                                            {items.StatName}
                                                        </strong>
                                                    </p>
                                                </div>
                                            </div>
                                        </>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
