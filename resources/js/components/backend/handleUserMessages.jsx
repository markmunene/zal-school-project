import axios from "axios";
// import { Modal } from "bootstrap";
import React, { useState, useEffect, useRef } from "react";

import Paginate from "../pagination/paginate";
import ReactHTMLTableToExcel from "react-html-table-to-excel";


export default function handleUserMessages() {
    
    const [feedback, setFeedback] = useState(false);
    
    const [fetchedMessages, setfetchedMessages] = useState([]);
    const [succ, setSucc] = useState("");
    
    const [imageDeleteId, setDeleteId] = useState(0);
    const [searchState, setSearch] = useState("");

    // post per   page
    // this is pagination logic
    // paginate compent is called in the end of this functional component
    const [currrentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(2);

    const indexOfLastPost = currrentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;

    const currentpost = fetchedMessages.slice(indexOfFirstPost, indexOfLastPost);

    const Page = (pageNumber) => setCurrentPage(pageNumber);
    
    const modalDelete = useRef({});

    const getUserMessages = async () => {
        try {
            await axios.get("api/userMessage").then((res) => {
                setfetchedMessages(res.data);
            });
        } catch (err) {}
    };
    useEffect(() => {
        getUserMessages();
        return () => {};
    }, []);
    // delete a post
    const removeTour = (id) => {
        const newImg = fetchedMessages.filter((item) => item.id !== id);

        setfetchedMessages(newImg);
    };
    const handleDelete = (id) => {
        console.log(id);
        $(modalDelete.current)?.modal("show");
        return setDeleteId(id);
    };
    return (
        <>
            <div className="setHomeWrapper">
                {/* modal section */}

                {feedback ? (
                    <div className="row">
                        <div
                            className="col-md-12 text-center"
                            style={{
                                backgroundColor: "#00ff00",
                                padding: "10px",
                                margin: "20px",
                                color: "white",
                            }}
                        >
                            <h3>{succ}</h3>
                        </div>
                    </div>
                ) : (
                    ""
                )}
                <div
                    className="modal fade"
                    id="modal-default"
                    ref={modalDelete}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add Image</h4>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">
                                <center>
                                    <h5>
                                        do you relay want to Delete this user Message?
                                    </h5>
                                </center>
                            </div>

                            <div className="modal-footer justify-content-between">
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    data-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={async () => {
                                        try {
                                            await axios
                                                .delete(
                                                    `/api/userMessage/${imageDeleteId}`
                                                )
                                                .then((response) => {
                                                    removeTour(imageDeleteId);

                                                    $(
                                                        modalDelete.current
                                                    ).modal("hide");

                                                    setFeedback(true);
                                                    setTimeout(() => {
                                                        setFeedback(false);
                                                    }, 2500);
                                                    setSucc(
                                                        "Message Deleted Succcessively"
                                                    );
                                                });
                                        } catch (error) {
                                            console.log(error);
                                        }
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                        {/* <!-- /.modal-content --> */}
                    </div>
                    {/* <!-- /.modal-dialog --> */}
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="card card-primary collapsed-card">
                            <div className="card-header">
                                {/* display message */}
                                {/* {displayImage(succ,true)} */}
                                <h3 className="card-title">
                                    ContactUs| User Messages.
                                </h3>

                                <div className="card-tools">
                                    <button
                                        type="button"
                                        className="btn btn-tool"
                                        data-card-widget="collapse"
                                    >
                                        <i className="fas fa-plus"></i>
                                    </button>
                                </div>
                                {/* <!-- /.card-tools --> */}
                            </div>
                            {/* <!-- /.card-header --> */}
                            <div className="card-body overflow-auto">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-header">
                                                {/*  */}
                                                <div className="">
                                                    <div className=" mr-2  pb-3">
                                                        <strong>
                                                            {
                                                                fetchedMessages.length
                                                            }{" "}
                                                            Records
                                                        </strong>
                                                    </div>
                                                    <h3 className="card-title">
                                                  
                                                    </h3>
                                                </div>

                                                <div className="card-tools">
                                                    <div
                                                        className="input-group input-group-sm"
                                                        style={{
                                                            width: "150px",
                                                        }}
                                                    >
                                                        <input
                                                            type="text"
                                                            name="table_search"
                                                            className="form-control float-right"
                                                            placeholder="Search"
                                                            value={searchState}
                                                            onChange={(e) =>
                                                                setSearch(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />

                                                        <div className="input-group-append">
                                                            <button
                                                                type="submit"
                                                                className="btn btn-default"
                                                            >
                                                                <i className="fas fa-search"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!-- /.card-header --> */}

                            
                                            <div className="card-body table-responsive p-0">
                                                <table
                                                    className="table table-hover text-nowrap"
                                                    id="reactExportExcel"
                                                >
                                                    <thead>
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>Name</th>
                                                            <th>Email</th>
                                                            <th>Subject</th>
                                                            <th>Messages</th>

                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {currentpost
                                                            ?.filter(
                                                                (items) => {
                                                                    if (
                                                                        searchState ==
                                                                        ""
                                                                    ) {
                                                                        return items;
                                                                    } else if (
                                                                        items.subject
                                                                            .toLowerCase()
                                                                            .includes(
                                                                                searchState.toLowerCase()
                                                                            )
                                                                    ) {
                                                                        return items;
                                                                    }
                                                                }
                                                            )
                                                            .map(
                                                                (
                                                                    items,
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        <>
                                                                            {items ==
                                                                            null ? (
                                                                                <center
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                >
                                                                                    <h2>
                                                                                        No
                                                                                        Images
                                                                                        Available
                                                                                    </h2>
                                                                                </center>
                                                                            ) : (
                                                                                <tr
                                                                                    key={
                                                                                        items.id
                                                                                    }
                                                                                >
                                                                                    <td>
                                                                                        {
                                                                                            items.id
                                                                                        }
                                                                                    </td>
                                                                                    <td>
                                                                                        {
                                                                                            items.Name
                                                                                        }
                                                                                    </td>
                                                                                    <td>
                                                                                        {
                                                                                            items.Email
                                                                                        }
                                                                                    </td>
                                                                                    <td>
                                                                                        {
                                                                                            items.subject
                                                                                        }
                                                                                    </td>
                                                                                    <td>
                                                                                        {
                                                                                            items.message
                                                                                        }
                                                                                    </td>
                                                                                    <td>
                                                                                   
                                                                                        {/* delete modal */}

                                                                                        {/* delete modal */}
                                                                                        <button
                                                                                            data-toggle="modal"
                                                                                            data-target="#editing-modal{{items.id}}"
                                                                                            className="btn btn-danger btn-sm"
                                                                                            onClick={() => {
                                                                                                handleDelete(
                                                                                                    items.id
                                                                                                );
                                                                                            }}
                                                                                        >
                                                                                            <i className="fa  fa-trash mr-1"></i>
                                                                                            del
                                                                                        </button>
                                                                                    </td>
                                                                                </tr>
                                                                            )}
                                                                        </>
                                                                    );
                                                                }
                                                            )}
                                                    </tbody>
                                                </table>

                                                <Paginate
                                                    postPerPage={postPerPage}
                                                    totalPost={
                                                        fetchedMessages.length
                                                    }
                                                    Page={Page}
                                                />
                                            </div>
                                            {/* <!-- /.card-body --> */}
                                        </div>
                                        {/* <!-- /.card --> */}
                                    </div>
                                </div>
                            </div>
                            {/* <!-- /.card-body --> */}
                        </div>
                        {/* <!-- /.card --> */}
                    </div>
                </div>
            </div>
        </>
    );
}
