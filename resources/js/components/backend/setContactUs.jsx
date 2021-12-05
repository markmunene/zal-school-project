import React, { useState, useEffect, useRef } from "react";

import axios from "axios";

export default function setContactUs()
{
    // protected $fillable =['sectionTitle', 'sectionHeader', 'setsectionSubHeader'];
    //
    const [sectionTitle, setsectionTitle] = useState("");
    const [sectionSubHeader, setsectionSubHeader] = useState("");

    const [feedback, setFeedback] = useState(false);
    const [sectionHeader, setsectionHeader] = useState("");
    const [errors, setErrors] = useState([]);
    const [editerrors, setEditerrors] = useState([]);
    const [fetchedContactHeaders, setFetchedContactHeaders] = useState([]);
    const [succ, setSucc] = useState("");
    const [editMOde, setEditMode] = useState(false);

    const [MMainSectionId, setDeleteId] = useState(0);

    const [searchState, setSearch] = useState("");

    const [eItems, setEditContactHeaders] = useState([]);
    const [editsectionHeader, setEditsectionHeader] = useState("");

    const modalRef = useRef({});
    const modalEdit = useRef({});
    const modalDelete = useRef({});

    const getContactHeaders = async () => {
        try {
            await axios.get("api/contact").then((res) => {
                setFetchedContactHeaders(res.data);
            });
        } catch (err) {}
    };
    useEffect(() => {
        getContactHeaders();
        return () => {};
    }, []);
    // delete a post
    const removeSection = (id) => {
        const newContactHeaders = fetchedContactHeaders.filter(
            (item) => item.id !== id
        );

        setFetchedContactHeaders(newContactHeaders);
    };
    // handling the image

    const editDataHandling = (items) => {
        $(modalEdit.current)?.modal("show");
        // .style.display = "block";
        setEditMode(true);
        setsectionHeader(items.sectionHeader);
        setsectionTitle(items.sectionTitle);
        setsectionSubHeader(items.sectionSubHeader);
        return setEditContactHeaders(items);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append("sectionTitle", sectionTitle);
        fd.append("sectionHeader", sectionHeader);
        fd.append("sectionSubHeader", sectionSubHeader);

        axios
            .post("/api/contact/store", fd)
            .then((result) => {
                // setsectionHeader("");
                // setsectionTitle("");
                setFeedback(true);
                setTimeout(() => {
                    setFeedback(false);
                }, 2500);
                setSucc("Contact Headers Added Succesively");

                $(modalRef.current).modal("hide");

                getContactHeaders();
            })
            .catch((err) => {
                setErrors(err.response.data.errors);
            });
    };

    const handleEdit = (e, MsectionId) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append("sectionTitle", sectionTitle);
        fd.append("sectionHeader", sectionHeader);
        fd.append("sectionSubHeader", sectionSubHeader);

        fd.append("MsectonId", MsectionId);
        // console.log(MsectionId + " " + sectionTitle);
        axios
            .post(`/api/contact/update/${MsectionId}`, fd)
            .then((result) => {
                setFeedback(true);
                setTimeout(() => {
                    setFeedback(false);
                }, 2500);

                setSucc("Contact Header Updated Succcessively");
                $(modalEdit.current).modal("hide");

                getContactHeaders();
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
                    <strong>{errors[field][0]}</strong>
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

    const handleAddModal = () => {
        $(modalRef.current).modal("show");
    };

    const handleDelete = (id) => {
        console.log(id);
        $(modalDelete.current)?.modal("show");
        return setDeleteId(id);
    };

    return (
        <>
            <div className="markettingsection">
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
                                <h4 className="modal-title">Add Headers</h4>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            {/* sectionSubHeader */}
                            <form
                                onSubmit={handleSubmit}
                                encType="multipart/form-data"
                            >
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>sectionHeader:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                hasErrorFor("sectionHeader")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="sectionHeader"
                                            placeholder="section Header"
                                            name="sectionHeader"
                                            value={sectionHeader}
                                            onChange={(e) => {
                                                setsectionHeader(
                                                    e.target.value
                                                );
                                            }}
                                            required
                                        />
                                        {renderErrorFor("sectionHeader")}
                                    </div>

                                    <div className="form-group">
                                        <label>sectionTitle:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                hasErrorFor("sectionTitle")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="sectionTitle"
                                            placeholder="Section Title"
                                            name="sectionTitle"
                                            value={sectionTitle}
                                            onChange={(e) => {
                                                setsectionTitle(e.target.value);
                                            }}
                                            required
                                        />
                                        {renderErrorFor("sectionTitle")}
                                    </div>

                                    <div className="form-group">
                                        <label>sectionSubHeader:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                hasErrorFor("sectionSubHeader")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="sectionSubHeader"
                                            placeholder="sectionSubHeader"
                                            name="sectionSubHeader"
                                            value={sectionSubHeader}
                                            onChange={(e) => {
                                                setsectionSubHeader(
                                                    e.target.value
                                                );
                                            }}
                                            required
                                        />
                                        {renderErrorFor("sectionSubHeader")}
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
                                <h4 className="modal-title">Delete Headers</h4>
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
                                        do you relay want to Delete this
                                        Headers?
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
                                                    `/api/contact/${MMainSectionId}`
                                                )
                                                .then((response) => {
                                                    removeSection(
                                                        MMainSectionId
                                                    );
                                                    setFeedback(true);
                                                    setTimeout(() => {
                                                        setFeedback(false);
                                                    }, 2500);
                                                    setSucc(
                                                        "Contact Header Section Deleted Succesively"
                                                    );
                                                    $(
                                                        modalDelete.current
                                                    ).modal("hide");
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
                                <h4 className="modal-title">
                                    Edit Marketting Main section
                                </h4>
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
                                        <label>sectionHeader:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                hasEditErrorFor("sectionHeader")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="sectionHeader"
                                            placeholder="sectionHeader"
                                            name="sectionHeader"
                                            value={sectionHeader}
                                            onChange={(e) => {
                                                setsectionHeader(
                                                    e.target.value
                                                );
                                            }}
                                            required
                                        />
                                        {renderEditErrorFor("sectionHeader")}
                                    </div>

                                    <div className="form-group">
                                        <label>sectionTitle:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                hasEditErrorFor("sectionTitle")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="sectionTitle"
                                            placeholder="Main Header"
                                            name="sectionTitle"
                                            value={sectionTitle}
                                            onChange={(e) => {
                                                setsectionTitle(e.target.value);
                                            }}
                                            required
                                        />
                                        {renderEditErrorFor("sectionTitle")}
                                    </div>
                                    <div className="form-group">
                                        <label>sectionSubHeader:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                hasEditErrorFor(
                                                    "sectionSubHeader"
                                                )
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="sectionSubHeader"
                                            placeholder="sectionSubHeader"
                                            name="sectionSubHeader"
                                            value={sectionSubHeader}
                                            onChange={(e) => {
                                                setsectionSubHeader(
                                                    e.target.value
                                                );
                                            }}
                                            required
                                        />
                                        {renderEditErrorFor("sectionSubHeader")}
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
                                {/* {displayImage(succ, true)} */}
                                <h3 className="card-title">
                                    Contact Us Headers Section
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
                            <div className="card-body ">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-header">
                                                {/*  */}
                                                <div className="">
                                                    <div className=" mr-2  pb-3">
                                                        <strong>
                                                            {
                                                                fetchedContactHeaders.length
                                                            }
                                                            Records
                                                        </strong>
                                                    </div>
                                                    <h3 className="card-title">
                                                        {fetchedContactHeaders.length >
                                                        0 ? (
                                                            ""
                                                        ) : (
                                                            <button
                                                                type="button"
                                                                className="btn btn-success"
                                                                data-toggle="modal"
                                                                onClick={
                                                                    handleAddModal
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
                                                <table className="table table-hover ">
                                                    <thead>
                                                        {/* // protected $fillable
                                                        =['sectionTitle',
                                                        'sectionHeader',
                                                        'setsectionSubHeader'];  */}
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>
                                                                sectionTitle
                                                            </th>
                                                            <th>
                                                                sectionHeader
                                                            </th>
                                                            <th>
                                                                setsectionSubHeader
                                                            </th>

                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {fetchedContactHeaders
                                                            ?.filter(
                                                                (items) => {
                                                                    if (
                                                                        searchState ==
                                                                        ""
                                                                    ) {
                                                                        return items;
                                                                    } else if (
                                                                        items.sectionHeader
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
                                                                                        items.sectionHeader
                                                                                    }
                                                                                </td>
                                                                                <td className=" ">
                                                                                    {
                                                                                        items.sectionTitle
                                                                                    }
                                                                                </td>
                                                                                <td className=" ">
                                                                                    {
                                                                                        items.sectionSubHeader
                                                                                    }
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
                                                                            </tr>
                                                                        </>
                                                                    );
                                                                }
                                                            )}
                                                    </tbody>
                                                </table>
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
