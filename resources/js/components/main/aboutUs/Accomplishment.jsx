import {useState, useEffect} from 'react'


export default function Accomplishment()
{
    const [fetchedAccomplishment, setfetchedAccomplishment] = useState([]);
     const [fetchedHeaders, setfetchedHeaders] = useState([]);
    
     const getAccomplishment = async () => {
         try {
             await axios.get("api/accomplishement").then((res) => {
                 setfetchedAccomplishment(res.data);
             });
         } catch (err) {}
    };
    
         const getAboutUsHeader = async () => {
             try {
                 await axios.get("api/aboutHeaders").then((res) => {
                     setfetchedHeaders(res.data);
                 });
             } catch (err) {}
         };
     useEffect(() => {
         getAccomplishment();
         getAboutUsHeader();
         return () => {};
     }, []);
    return (
        <>
            <div className="accoWrapper">
                <div
                    className="missionHeader "
                    style={{
                        backgroundImage: 'url("./images/aboutUs/banner1.jpg")',
                    }}
                >
                    <div className="headText">
                        <h2 className="">
                            {fetchedHeaders.map((items) => items.sectionHeader)}
                        </h2>
                        <h5 className="">
                            Home/{" "}
                            {fetchedHeaders.map((items) => items.sectionHeader)}
                        </h5>
                    </div>
                </div>
                <div className="AccoBody">
                    <div className="accoBodyHeader">
                        <h1>
                            {fetchedHeaders.map((items) => items.sectionTitle)}
                        </h1>
                        <div className="divider"></div>
                    </div>
                    {fetchedAccomplishment.map((items,index) =>
                    {
if (index ===0) {
          return (
              <>
                  <div className="accoRow1" key={items.id}>
                      <div className="row ">
                          <div className="col-md-9">
                              <div className="">
                                  <h4>{items.Header}</h4>
                                  <p>{items.Description}</p>
                                  <div className="accoRow1Header">
                                      <strong>
                                          <i
                                              className={`${items.Icon} mx-1`}
                                          ></i>
                                          {items.Date}
                                      </strong>
                                  </div>
                              </div>
                          </div>
                          <div className="col-md-3">
                              <img
                                  src={"./uploadedImages/" + items.ImageName}
                                  alt=""
                                  className="accoImage float-left img-fluid "
                              />
                          </div>
                      </div>
                  </div>
              </>
          );
                        }
else {
     return (
         <>
             <div className="accoRow1" key={items.id}>
                 <div className="row ">
                     <div className="col-md-3">
                         <img
                             src={"./uploadedImages/" + items.ImageName}
                             alt=""
                             className="accoImage float-left img-fluid "
                         />
                     </div>
                     <div className="col-md-9">
                         <div className="">
                             <h4>{items.Header}</h4>
                             <p>{items.Description}</p>
                             <div className="accoRow1Header">
                                 <strong>
                                     <i className={`${items.Icon} mx-1`}></i>
                                     {items.Date}
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
            </div>
        </>
    );
}
