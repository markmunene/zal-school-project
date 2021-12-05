import React,{useState,useEffect} from 'react'

import './department.css'
export default function ict()
{
    
    const [fetchedDepartment, setfetchedDepartment] = useState([]);
    const getDepartments = async () => {
        try {
            await axios.get("api/ictDepartment").then((res) => {
                setfetchedDepartment(res.data);
            });
        } catch (err) {}
    };
    useEffect(() => {
        getDepartments();
        return () => {};
    }, []);
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
                            <div className="departmentBody">
                                <div className="depHeadeer">
                                    <h1>{items.Header}</h1>
                                    <div className="divider"></div>
                                </div>
                                <div className="depRow1">
                                    <div className="row ">
                                        <div className="col-md-5">
                                            <div className="depImagewrapper">
                                                <img
                                                    src={
                                                        "./uploadedImages/" +
                                                        items.ImageName
                                                    }
                                                    alt=""
                                                    className="depImage img-fluid w-100"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-7">
                                            <div className="mt-3">
                                                <h4 className="pb-3">
                                                    {items.SubHeader}
                                                </h4>
                                                <p>{items.Description}</p>
                                                <div className="accoRow1Header">
                                                    <strong>
                                                        {items.HeadedBy}
                                                    </strong>
                                                    <p>
                                                        {items.EduCationLevel}
                                                    </p>
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
