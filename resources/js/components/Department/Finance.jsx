import React,{useState,useEffect} from "react";

import "./department.css";
export default function Finance()
{
    const [fetchedDepartment,setfetchedDepartment] =useState([])
       const getDepartments = async () => {
           try {
               await axios.get("api/finance").then((res) => {
                   setfetchedDepartment(res.data);
               });
           } catch (err) {}
       };
       useEffect(() => {
           getDepartments();
           return () => {};
       }, []);
    // protected $fillable = ['SectionTitle', 'ImageName','Header', 'SubHeader','Description','HeadedBy', 'EduCationLevel'];
    
    return (
        <>
            <div className="ictWrapper">
                {fetchedDepartment.map((items) => (
                    <>
                        <div
                            className="missionHeader "
                            style={{
                                backgroundImage:
                                    'url("./images/aboutUs/banner1.jpg")',
                            }}
                        >
                            <div className="headText">
                                <h2 className="">{items.SectionTitle}</h2>
                                <h5 className="">Home/{items.SectionTitle}</h5>
                            </div>
                        </div>
                        <div>
                            <div
                                className="departmentBody"
                                style={{ padding: "70px !importmant" }}
                            >
                                <div className="depHeadeer mb-5">
                                    <h1>{items.Header }</h1>
                                    <div className="divider"></div>
                                </div>
                                <div className="depRow1">
                                    <div className="row ">
                                        <div className="col-md-5">
                                            <div
                                                className="depImagewrapper"
                                                style={{
                                                    height: "400px",
                                                    width: "100%",
                                                }}
                                            >
                                                <img
                                                    src={
                                                        "./uploadedImages/" +
                                                        items.ImageName
                                                    }
                                                    alt=""
                                                    className="depImage img-fluid"
                                                    height="400px"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-7">
                                            <div className="mt-3 ">
                                                <h4 className="pb-3">
                                                    {items.SubHeader}
                                                </h4>
                                                <p>{items.Description}</p>
                                                <div className="accoRow1Header">
                                                    <strong>
                                                        {items.HeadedBy}
                                                        <p>
                                                            {
                                                                items.EduCationLevel
                                                            }
                                                        </p>
                                                    </strong>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </>
    );
}
