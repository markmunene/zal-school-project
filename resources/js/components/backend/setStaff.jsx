import axios from "axios";
// import { Modal } from "bootstrap";
import React, { useState, useEffect, useRef } from "react";

import Paginate from "../pagination/paginate";

export default function SetStaff() {
    const [image, setImage] = useState("");

    const [feedback, setFeedback] = useState(false);
    const [Description, setDescription] = useState("");
   
    const [HeadedBy, setHeadedBy] = useState("");
    const [EduCationLevel, setEduCationLevel] = useState("");
    const [Header, setHeader] = useState("");
   

    const [errors, setErrors] = useState([]);
    const [editerrors, setEditerrors] = useState([]);
    const [fetchedStaff, setfetchedStaff] = useState([]);
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

    const currentpost = fetchedStaff.slice(
        indexOfFirstPost,
        indexOfLastPost
    );

    const Page = (pageNumber) => setCurrentPage(pageNumber);

    const [eItems, setEditImg] = useState([]);
   
    const modalRef = useRef({});
    const modalEdit = useRef({});
    const modalDelete = useRef({});

    const getStaff = async () => {
        try {
            await axios.get("api/staffD").then((res) => {
                setfetchedStaff(res.data);
            });
        } catch (err) {}
    };
    useEffect(() => {
        getStaff();
        return () => {};
    }, []);
    // delete a post
    const removeTour = (id) => {
        const newImg = fetchedStaff.filter((item) => item.id !== id);

        setfetchedStaff(newImg);
    };
    // handling the image
    const handlefile = (file) => {
        setImage(file[0]);
    };
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
    const hasEditErrorFor = (field) => {
        return !!editerrors[field];
    };

    const editDataHandling = (items) => {
        $(modalEdit.current)?.modal("show");
        // .style.display = "block";
        setEditMode(true);
      
        setDescription(items.Description);
        setHeadedBy(items.HeadedBy);
       
        setHeader(items.Header);
        setEduCationLevel(items.EduCationLevel);
        return setEditImg(items);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append("image", image);
      
        fd.append("Header", Header);
        fd.append("HeadedBy", HeadedBy);
        fd.append("EduCationLevel", EduCationLevel);
       
        fd.append("Description", Description);

        axios
            .post("/api/staffD/store", fd, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            })
            .then((result) => {
                setImage("");
                setHeadedBy("");
                setDescription("");
                setHeadedBy("");

                setHeader("");
                setEduCationLevel("");
                setFeedback(true);
                setTimeout(() => {
                    setFeedback(false);
                }, 2500);
                setSucc("Staff added Succcessively");
                $(modalRef.current).modal("hide");

                getStaff();
            })
            .catch((err) => {
                // setErrors(err.response.data.errors);
                setErrors(err.response.data.errors);

                // console.log(err.response.errors);
            });
    };

    const handleEdit = (e, staffId) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append("image", image);
      
        fd.append("Header", Header);
        fd.append("HeadedBy", HeadedBy);
        fd.append("EduCationLevel", EduCationLevel);
       
        fd.append("Description", Description);
        fd.append("staffId", staffId);

        axios
            .post(`/api/staffD/update/${staffId}`, fd, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            })
            .then((result) =>
            {
                    setImage("");
                    setHeadedBy("");
                    setDescription("");
                    setHeadedBy("");
                    setHeader("");
                    setEduCationLevel(""); 
                setFeedback(true);
                setTimeout(() => {
                    setFeedback(false);
                }, 2500);
                setSucc("Staff Updated Succcessively");
                $(modalEdit.current).modal("hide");

                getStaff();
            })
            .catch((err) => {
                // setErrors(err.response.data.errors);
                setErrors(err.response.data.errors);

                // console.log(err.response.errors);
            });
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
    const handleAddModal = () => {
        $(modalRef.current).modal("show");
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
                <div className="modal fade" id="modal-default" ref={modalRef}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title"> Add Staff</h4>
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
                                    {/*  */}
                                    <div className="form-group">
                                        <label>Header:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                hasErrorFor("Header")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="Header"
                                            placeholder="Header"
                                            name="Header"
                                            value={Header}
                                            onChange={(e) => {
                                                setHeader(e.target.value);
                                            }}
                                            required
                                        />
                                        {renderErrorFor("Header")}
                                    </div>
                                    {/*  */}

                                    <div className="form-group">
                                        <label>Description:</label>
                                        <textarea
                                            className={`form-control ${
                                                hasErrorFor("Description")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="Description"
                                            placeholder="Description"
                                            name="Description"
                                            value={Description}
                                            onChange={(e) => {
                                                setDescription(e.target.value);
                                            }}
                                            required
                                        />
                                        {renderErrorFor("Description")}
                                    </div>
                                    {/*  */}
                                    <div className="form-group">
                                        <label>HeadedBy:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                hasErrorFor("HeadedBy")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="HeadedBy"
                                            placeholder="HeadedBy"
                                            name="HeadedBy"
                                            value={HeadedBy}
                                            onChange={(e) => {
                                                setHeadedBy(e.target.value);
                                            }}
                                            required
                                        />
                                        {renderErrorFor("HeadedBy")}
                                    </div>
                                    {/*  */}
                                    <div className="form-group">
                                        <label>EduCationLevel:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                hasErrorFor("EduCationLevel")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="EduCationLevel"
                                            placeholder="EduCationLevel"
                                            name="EduCationLevel"
                                            value={EduCationLevel}
                                            onChange={(e) => {
                                                setEduCationLevel(
                                                    e.target.value
                                                );
                                            }}
                                            required
                                        />
                                        {renderErrorFor("EduCationLevel")}
                                    </div>
                                   

                                    {/*  */}
                                    <div className="custom-file pb-3">
                                        <input
                                            type="file"
                                            className={`form-control custom-file-input ${
                                                hasErrorFor("image")
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
                    id="modal-default"
                    ref={modalDelete}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Delete Staff</h4>
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
                                        do you relay want to Delete this Staff ?
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
                                                    `/api/staffD/${imageDeleteId}`
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
                                                        "Staff Deleted Succcessively"
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
                                <h4 className="modal-title">Edit Staff</h4>
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
                                    {/*  */}
                                    <div className="form-group">
                                        <label>Header:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                hasErrorFor("Header")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="Header"
                                            placeholder="Header"
                                            name="Header"
                                            value={Header}
                                            onChange={(e) => {
                                                setHeader(e.target.value);
                                            }}
                                            required
                                        />
                                        {renderErrorFor("Header")}
                                    </div>
                                    {/*  */}

                                    <div className="form-group">
                                        <label>Description:</label>
                                        <textarea
                                            className={`form-control ${
                                                hasErrorFor("Description")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="Description"
                                            placeholder="Description"
                                            name="Description"
                                            value={Description}
                                            onChange={(e) => {
                                                setDescription(e.target.value);
                                            }}
                                            required
                                        />
                                        {renderErrorFor("Description")}
                                    </div>
                                    {/*  */}
                                    <div className="form-group">
                                        <label>HeadedBy:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                hasErrorFor("HeadedBy")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="HeadedBy"
                                            placeholder="HeadedBy"
                                            name="HeadedBy"
                                            value={HeadedBy}
                                            onChange={(e) => {
                                                setHeadedBy(e.target.value);
                                            }}
                                            required
                                        />
                                        {renderErrorFor("HeadedBy")}
                                    </div>
                                    {/*  */}
                                    <div className="form-group">
                                        <label>EduCationLevel:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                hasErrorFor("EduCationLevel")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="EduCationLevel"
                                            placeholder="EduCationLevel"
                                            name="EduCationLevel"
                                            value={EduCationLevel}
                                            onChange={(e) => {
                                                setEduCationLevel(
                                                    e.target.value
                                                );
                                            }}
                                            required
                                        />
                                        {renderErrorFor("EduCationLevel")}
                                    </div>
                                    {/*  */}

                                    <div className="mb-3">
                                        <img
                                            src={
                                                "./uploadedImages/" +
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
                                <h3 className="card-title">About us|Staff</h3>

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
                                                                fetchedStaff.length
                                                            }
                                                            Records
                                                        </strong>
                                                    </div>
                                                    <h3 className="card-title">
                                                        {fetchedStaff.length >
                                                        4 ? (
                                                            ""
                                                        ) : (
                                                            <button
                                                                type="button"
                                                                className="btn btn-success"
                                                                data-toggle="modal"
                                                                onClick={() =>
                                                                    handleAddModal()
                                                                }
                                                            >
                                                                <i className=" fa fa-plus mr-1"></i>
                                                                add
                                                            </button>
                                                        )}
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
                                                    className="table table-hover "
                                                    id="reactExportExcel"
                                                >
                                                    <thead>
                                                        <tr>
                                                            <th>ID</th>

                                                            <th>Header</th>
                                                            <th>Description</th>
                                                            <th>HeadedBy</th>
                                                            <th>
                                                                EduCationLevel
                                                            </th>
                                                            <th>Image</th>
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
                                                                        items.Header.toLowerCase().includes(
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
                                                                                            items.Header
                                                                                        }
                                                                                    </td>

                                                                                    <td className="w-30">
                                                                                        {
                                                                                            items.Description
                                                                                        }
                                                                                    </td>
                                                                                    <td>
                                                                                        {
                                                                                            items.HeadedBy
                                                                                        }
                                                                                    </td>
                                                                                    <td>
                                                                                        {
                                                                                            items.EduCationLevel
                                                                                        }
                                                                                    </td>

                                                                                    <td>
                                                                                        <img
                                                                                            src={
                                                                                                "./uploadedImages/" +
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
                                                                                            className="btn btn-info btn-sm my-2 "
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
                                                                                            className="btn btn-danger btn-sm "
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
                                                        fetchedStaff.length
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
