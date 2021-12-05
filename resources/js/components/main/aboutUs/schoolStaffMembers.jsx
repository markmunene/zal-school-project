import React,{useState, useEffect} from "react";

export default function schoolStaffMembers()
{
    const [fetchedStaff, setFetchedStaff] = useState([]);
    const [fetchedOtherStaff, setfetchedOtherStaff] = useState([]);

    const getStaff = async () => {
        try {
            await axios.get("api/staffD").then((res) => {
                setFetchedStaff(res.data);
            });
        } catch (err) {}
    };
    useEffect(() => {
        getStaff();
        getOtherStaff();
        return () => {};
    }, []);  
       const getOtherStaff = async () => {
           try {
               await axios.get("api/OtherStaff").then((res) => {
                   setfetchedOtherStaff(res.data);
               });
           } catch (err) {}
       };
    return (
        <>
            <div className="staffWrapper">
                <div
                    className="missionHeader"
                    style={{
                        backgroundImage: ' url("./images/aboutUs/banner1.jpg")',
                    }}
                >
                    <div className="headText">
                        <h2 className="">Staff</h2>
                        <h5 className="">Home/Staff Members</h5>
                    </div>
                </div>

                <div className="staffMain">
                    {fetchedStaff.map((items, index) => {
                        if (index == 0) {
                            return (
                                <>
                                    <div className="founder" key={index}>
                                        <div className="row ">
                                            <div className="col-md-4">
                                                <img
                                                    src={
                                                        "./uploadedImages/" +
                                                        items.ImageName
                                                    }
                                                    alt=""
                                                    className="headStaffImage"
                                                />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="founderText">
                                                    <h4>{items.Header}</h4>
                                                    <p>{items.Description}</p>
                                                    <div className="founedrTextFoot">
                                                        <strong>
                                                            {items.HeadedBy}
                                                            <br />
                                                            {
                                                                items.EduCationLevel
                                                            }
                                                        </strong>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            );
                        } else {
                        }
                    })}

                    <div className="otherStaff ">
                        <div className="row">
                            {fetchedStaff.map((items, index) => {
                             if (index != 0) {
                                    return (
                                        <>
                                            <div
                                                className="col-md-6 "
                                                key={index}
                                            >
                                                <div className=" d-flex">
                                                    <div className=" ">
                                                        <img
                                                            src={
                                                                "./uploadedImages/" +
                                                                items.ImageName
                                                            }
                                                            alt=""
                                                            className="headStaffImage"
                                                        />
                                                    </div>
                                                    <div className="">
                                                        <div className="textStaff ml-4">
                                                            <h4>
                                                                {items.Header}
                                                            </h4>
                                                            <p>
                                                                {
                                                                    items.Description
                                                                }
                                                            </p>
                                                            <div className="founedrTextFoot">
                                                                <strong>
                                                                    {
                                                                        items.HeadedBy
                                                                    }
                                                                    <br />
                                                                    {
                                                                        items.EduCationLevel
                                                                    }
                                                                </strong>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    );
                             }
                            })}
                        </div>
                        <div className="row">
                            {/*  */}
                            {fetchedOtherStaff.map((items, index) => {
                                return (
                                    <>
                                        <div className="col-md-6" key={index}>
                                            <div className="otherStaffText">
                                                <div className="">
                                                    <h6>
                                                        <strong>
                                                            {items.Header}
                                                        </strong>
                                                    </h6>
                                                </div>
                                                <div className="textStaff ml-4">
                                                    <strong>
                                                        <h4>
                                                            {items.SubHeader}
                                                        </h4>
                                                    </strong>
                                                    <p>{items.Description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                );
                            })}
                        </div>

                        {/*  */}
                    </div>
                </div>
            </div>
        </>
    );
}
