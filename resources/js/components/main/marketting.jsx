import React,{useState, useEffect} from 'react'
import './marketing.css'

export default function marketting()

{
    const [fetchedMRowSection, setFetchedMRowSection] = useState([]);

    const [FetchedMMSection, setFetchedMMSection] = useState([]);
     const getMMsection = async () => {
         try {
             await axios.get("api/MMsection").then((res) => {
                 setFetchedMMSection(res.data);
             });
         } catch (err) {}
     };
     useEffect(() => {
         getMMsection();
  getMRowSection();
     
         return () => {};
     }, []);
        const getMRowSection = async () => {
            try {
                await axios.get("api/MRowSection").then((res) => {
                    setFetchedMRowSection(res.data);
                });
            } catch (err) {}
        };

    //   fd.append("MMainBody", MMainBody);
    //     fd.append("MMainHeader", MMainHeader);
        console.log(FetchedMMSection);
    return (
        <>
            {FetchedMMSection.map((items) => {
                return (
                    <>
                        <div className="offer text-center" key={items.id}>
                            <div className="display-4 mx-auto mt-5">
                                <span>{items.MMainHeader}</span>
                            </div>
                            <center>
                                <div className="border mb-4"></div>
                                <p className="text-desc  mt-3 ">
                                    { items.MMainBody}
                                </p>
                            </center>
                        </div>
                       
                    </>
                );
            })}
            <div className=" markettingCol">
                <div className="row mt-5">
            
                    {fetchedMRowSection.map((items, index) =>
                    {
                        return (
                            <>
                                <div className="col-md-4" key={index}>
                                    <center>
                                        <i
                                            className={`${items.sectionIcon}`}
                                        ></i>
                                        <h2 className="mt-5">
                                            <strong>{items.MRowHeader}</strong>
                                        </h2>
                                        <div className="border"></div>
                                        <p>{items.MRowBody}</p>
                                    </center>
                                </div>
                            </>
                        );
                })}
               
                </div>
            </div>
        </>
    );
}
