import axios from "axios";
// import { Modal } from "bootstrap";
import React, { useState, useEffect, useRef } from "react";

import Paginate from "../pagination/paginate";

// import '../uploadedImages'

// import jQuery from "jquery";
// import TestingModal from "./TestingModal"
export default function SetNews() {
    const [image, setImage] = useState("");

    const [feedback, setFeedback] = useState(false);
    const [Title, setTitle] = useState("");
    const [Body, setBody] = useState("");

    const [errors, setErrors] = useState([]);
    const [editerrors, setEditerrors] = useState([]);
    const [FetchedNews, setFetchedNews] = useState([]);
    const [succ, setSucc] = useState("");
    const [editMOde, setEditMode] = useState(false);

    const [imageDeleteId, setDeleteId] = useState(0);
    const [searchState, setSearch] = useState("");

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

    const [eItems, setEditImg] = useState([]);
    // const [editTitle, setEditTitle] = useState("");

    const modalRef = useRef({});
    const modalEdit = useRef({});
    const modalDelete = useRef({});

    const getImages = async () => {
        try {
            await axios.get("api/events").then((res) => {
                setFetchedNews(res.data);
            });
        } catch (err) {}
    };
    useEffect(() => {
        getImages();
        return () => {};
    }, []);
    // delete a post
    const removeTour = (id) => {
        const newImg = FetchedNews.filter((item) => item.id !== id);

        setFetchedNews(newImg);
    };
    // handling the image
    const handlefile = (file) => {
        setImage(file[0]);
    };

    const editDataHandling = (items) => {
        $(modalEdit.current)?.modal("show");
        // .style.display = "block";
        setEditMode(true);
        setTitle(items.Title);
        setBody(items.Body)
        return setEditImg(items);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append("image", image);
        fd.append("Title", Title);
        fd.append("Body", Body);

        axios
            .post("/api/events/store", fd, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            })
            .then((result) => {
                setImage("");
                setTitle("");
                setFeedback(true);
                setTimeout(() => {
                    setFeedback(false);
                }, 2500);
                setSucc("News Added succesively");
                $(modalRef.current).modal("hide");

                getImages();
            })
            .catch((err) => {
                setErrors(err.response.data.errors);
            });
    };

    const handleEdit = (e, EditId) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append("image", image);
        fd.append("Title", Title);
        fd.append("Body", Body);

        fd.append("EditId", EditId);

        axios
            .post(`/api/events/update/${EditId}`, fd, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            })
            .then((result) => {
                setFeedback(true);
                setTimeout(() => {
                    setFeedback(false);
                }, 2500);
                setSucc("News Section Updated Succcessively");
                $(modalEdit.current).modal("hide");

                getImages();
            })
            .catch((err) => {
                // setErrors(err.response.data.errors);
                setEditerrors(err.response.data.errors);

                // console.log(err.response.errors);
            });
    };

    const hasErrorFor = (field) => {
        return !!errors[field];
    };
    const hasEditErrorFor = (field) => {
        return !!editerrors[field];
    };

    const renderErrorFor = (field) => {
        if (hasErrorFor(field)) {
            return (
                <span className="invalid-feedback">
                    <strong>{edi[field][0]}</strong>
                </span>
            );
        }
    };

    const renderEditErrorFor = (field) => {
        if (hasEditErrorFor(field)) {
            return (
                <span className="invalid-feedback">
                    <strong>{editerrors[field][0]}</strong>
                </span>
            );
        }
    };

    const handleDelete = (id) => {
        console.log(id);
        $(modalDelete.current)?.modal("show");
        return setDeleteId(id);
    };

    const handleOpenModal = () =>
    {
    $(modalRef.current).modal('show')
        
    }
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
                <div className="modal fade" id="modal-default" ref={modalRef}>
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
                            <form
                                onSubmit={handleSubmit}
                                encType="multipart/form-data"
                            >
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>Title:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                hasErrorFor("Title")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="Title"
                                            placeholder="Title"
                                            name="Title"
                                            value={Title}
                                            onChange={(e) => {
                                                setTitle(e.target.value);
                                            }}
                                            required
                                        />
                                        {renderErrorFor("Title")}
                                    </div>
                                    <div className="form-group">
                                        <label>Body:</label>
                                        <textarea
                                            type="textarea"
                                            className={`form-control ${
                                                hasErrorFor("Body")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="Body"
                                            placeholder="Main Header"
                                            name="Body"
                                            value={Body}
                                            onChange={(e) => {
                                                setBody(e.target.value);
                                            }}
                                            required
                                        />
                                        {renderErrorFor("Body")}
                                    </div>
                                    <div className="custom-file pb-3">
                                        <input
                                            type="file"
                                            className={`form-control custom-file-input ${
                                                hasErrorFor("image")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            onChange={(e) =>
                                                handlefile(e.target.files)
                                            }
                                        />
                                        <label className="custom-file-label">
                                            choose an image
                                        </label>

                                        {renderErrorFor("image")}
                                    </div>
                                </div>

                                <div className="modal-footer justify-content-between">
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        data-dismiss="modal"
                                    >
                                        Close
                                    </button>
                                    <input
                                        type="submit"
                                        className="btn btn-success"
                                        value=" Save"
                                    />
                                </div>
                            </form>
                        </div>
                        {/* <!-- /.modal-content --> */}
                    </div>
                    {/* <!-- /.modal-dialog --> */}
                </div>

                <div
                    className="modal fade"
                  
                    ref={modalDelete}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Delete news</h4>
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
                                        do you relay want to Delete this News
                                        Section ?
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
                                                    `/api/events/${imageDeleteId}`
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
                                                        "News Section Deleted Succcessively"
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

                <div
                    className="modal fade"
                    id="#editing-modal{{items.id}}"
                    ref={modalEdit}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Edit Image</h4>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form
                                onSubmit={(e) => handleEdit(e, eItems.id)}
                                encType="multipart/form-data"
                            >
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>Title:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                hasEditErrorFor("Title")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="Title"
                                            placeholder="Title"
                                            name="Title"
                                            value={Title}
                                            onChange={(e) => {
                                                setTitle(e.target.value);
                                            }}
                                            required
                                        />
                                        {renderEditErrorFor("Title")}
                                    </div>
                                    <div className="form-group">
                                        <label>Body:</label>
                                        <textarea
                                            type="textarea"
                                            className={`form-control ${
                                                hasEditErrorFor("Body")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="Body"
                                            placeholder="Main Header"
                                            name="Body"
                                            value={Body}
                                            onChange={(e) => {
                                                setBody(e.target.value);
                                            }}
                                            required
                                        />
                                        {renderEditErrorFor("Body")}
                                    </div>

                                    <div className="mb-3">
                                        <img
                                            src={
                                                "./NewsImages/" +
                                                eItems.ImageName
                                            }
                                            alt=""
                                            className=" img-fluid
                                                                                                 "
                                            height={"100px"}
                                            width={"100px"}
                                        />
                                    </div>
                                    <div className="custom-file pb-3">
                                        <input
                                            type="file"
                                            className={`form-control custom-file-input ${
                                                hasEditErrorFor("image")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id=""
                                            onChange={(e) =>
                                                handlefile(e.target.files)
                                            }
                                        />
                                        <label className="custom-file-label">
                                            choose an image
                                        </label>
                                        {renderEditErrorFor("image")}
                                    </div>
                                </div>
                                <div className="modal-footer justify-content-between">
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        data-dismiss="modal"
                                    >
                                        Close
                                    </button>
                                    <input
                                        type="submit"
                                        className="btn btn-success"
                                        value=" Save"
                                    />
                                </div>
                            </form>
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
                                   Home|News Events |section
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
                                                            {FetchedNews.length}
                                                            Records
                                                        </strong>
                                                    </div>
                                                    <h3 className="card-title">
                                                        <button
                                                            type="button"
                                                            className="btn btn-success"
                                                            data-toggle="modal"
                                                            data-target="#modal-default"
                                                            onClick={()=>handleOpenModal()}
                                                        >
                                                            <i className=" fa fa-plus mr-1"></i>
                                                            add
                                                        </button>
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
                                                <table className="table table-hover ">
                                                    <thead>
                                                        <tr>
                                                            <th>ID</th>

                                                            <th>Title</th>
                                                            <th>Body</th>
                                                            <th>Image</th>

                                                            <th>Action</th>
                                                            <th>Creator</th>
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
                                                                        items.Title.toLowerCase().includes(
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
                                                                                            items.Title
                                                                                        }
                                                                                    </td>
                                                                                    <td className="RowBody">
                                                                                        {
                                                                                            items.Body
                                                                                        }
                                                                                    </td>
                                                                                    <td>
                                                                                        <img
                                                                                            src={
                                                                                                "./NewsImages/" +
                                                                                                items.ImageName
                                                                                            }
                                                                                            alt=""
                                                                                            className=" img-fluid
                                                                                                 CalTableimage"
                                                                                        />
                                                                                    </td>
                                                                                    <td>
                                                                                        <button
                                                                                            type="button"
                                                                                            className="btn btn-info btn-sm mr-2"
                                                                                            data-toggle="modal"
                                                                                            data-target="#editing-modal{{items.id}}"
                                                                                            onClick={() =>
                                                                                                editDataHandling(
                                                                                                    items
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            <i className="fa fa-edit mr-1"></i>
                                                                                            edit
                                                                                        </button>
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

                                                                                    <td>
                                                                                        {
                                                                                            items.CreatorName
                                                                                        }
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
                                                        FetchedNews.length
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
