import axios from 'axios';
import React,{useState, useEffect,useRef} from 'react'

import './contact.css'

export default function Contact()
{
    const [fecthedheaders, setFetchedHeaders] = useState([]);
  
    const [fetchedContactInfo, setfetchedContactInfo] = useState([]);

    const getContactHeaders = () =>
    {
        axios.get('/api/contact').then(res =>
        {
           
        setFetchedHeaders(res.data);
    })
    }
    const getContactDetails = () =>
    {
        axios.get("/api/contactInfo").then((res) => {
            setfetchedContactInfo(res.data);
        });
    }
    useEffect(() => {
        getContactHeaders()
        getContactDetails();
        return () => {
           
        }

    }, [])
   
    const [name, setName] = useState('');
    const [Email, setEmail] = useState("");
    const [subject, setsubject] = useState("");
    const [message, setmessage] = useState("");
    const [errors, seterrors] = useState([]);

  const renderErrorFor = (field) => {
      if (hasErrorFor(field)) {
          return (
              <span className="invalid-feedback">
                  <strong>{errors[field][0]}</strong>
              </span>
          );
      }
  };

  const hasErrorFor = (field) => {
      return !!errors[field];
  };
    const handleSubmit = (event) =>
    {
        event.preventDefault();

        const fd = new FormData();

        fd.append('name', name);
        fd.append("Email", Email);
        fd.append("subject", subject);
        fd.append("message", message);

        axios
            .post("/api/userMessage/store", fd)
            .then((res) =>
            {
                setName("")
                setEmail('')
                setsubject('')
                setmessage('')
                seterrors([])
            })
            .catch((err) => {
                // setErrors(err.response.data.errors);
                seterrors(err.response.data.errors);

                // console.log(err.response.errors);
            });

    }
return (
    <>
        <div className="contactWrapper">
            <div
                className="missionHeader"
                style={{
                    backgroundImage: ' url("./images/aboutUs/banner1.jpg")',
                }}
            >
                <div className="headText ">
                    <h2 className="">
                        {fecthedheaders.map((items) => {
                            return <span>{items.sectionHeader}</span>;
                        })}
                    </h2>
                    <h5 className="">Contact us </h5>
                </div>
            </div>
            {/*  */}
            <div className="contactUsBody">
                <div className="contactBodyHeader">
                    <h1>
                        {fecthedheaders.map((items) => {
                            return <span>{items.sectionTitle}</span>;
                        })}
                    </h1>
                    <div className="divider"></div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <div className="contactForms w-100 ">
                            <form onSubmit={handleSubmit}>
                                <div className="firtRow d-flex">
                                    <div className="input-group m-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fa fa-user"></i>
                                            </span>
                                        </div>
                                        <input
                                            className={`form-control ${
                                                hasErrorFor("name")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            type="text"
                                            name="names"
                                            placeholder="names"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            required
                                        />
                                        {renderErrorFor("name")}
                                    </div>

                                    <div className="input-group m-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fas fa-envelope"></i>
                                            </span>
                                        </div>
                                        <input
                                            className={`form-control ${
                                                hasErrorFor("Email")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            type="Email"
                                            name="Email"
                                            placeholder="Email"
                                            value={Email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            required
                                        />
                                        {renderErrorFor("Email")}
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="input-group m-3 ">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fas fa-pencil-alt"></i>
                                            </span>
                                        </div>
                                        <input
                                            className={`form-control ${
                                                hasErrorFor("subject")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            type="text"
                                            name="subject"
                                            placeholder="subject"
                                            value={subject}
                                            onChange={(e) =>
                                                setsubject(e.target.value)
                                            }
                                            required
                                        />
                                        {renderErrorFor("subject")}
                                    </div>
                                </div>
                                <div className="d-flex ">
                                    <div className="input-group m-3 ">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fas fa-pen-square"></i>
                                            </span>
                                        </div>
                                        <textarea
                                            className={`form-control messageinput ${
                                                hasErrorFor("message")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            type=""
                                            name="message"
                                            placeholder="message"
                                            value={message}
                                            onChange={(e) =>
                                                setmessage(e.target.value)
                                            }
                                            required
                                        />
                                        {renderErrorFor("message")}
                                    </div>
                                </div>
                                <div className="d-flex m-2 text-center">
                                    <button
                                        type="submit"
                                        className="contactSubmit p-1"
                                    >
                                        <i className="icofont-paper-plane m-2"></i>
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="contactDetails w-100">
                            <h2 className="pl-2 m-3">
                                {fecthedheaders.map((items) => {
                                    return (
                                        <span>{items.sectionSubHeader}</span>
                                    );
                                })}
                            </h2>

                            {/* 
                            fa fa-home fa-2x
                            Rosslyn, Lavington
                            Address 232211
                            */}
                            <hr />
                            {fetchedContactInfo.map((items,index) => {
                                return (
                                    <>
                                        <div className="leftContent ">
                                            <div className="iconSection">
                                                {index == 1 ? (
                                                    <i
                                                        className={`${items.contactIcon} mr-3 `}
                                                    ></i>
                                                ) : (
                                                    <i
                                                        className={`${items.contactIcon} `}
                                                    ></i>
                                                )}
                                            </div>
                                            <div className="descriptionSection">
                                                <div>{items.description1} </div>
                                                <div>{items.description2}</div>
                                            </div>
                                        </div>
                                    </>
                                );
                            })}

                      
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
);
}
