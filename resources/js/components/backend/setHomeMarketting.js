import React, { useState, useEffect, useRef } from "react";

import axios from "axios";

export default function setHomeMarketting() {
    const [MMainBody, setMMainBody] = useState("");

     const [feedback, setFeedback] = useState(false);
    const [MMainHeader, setMMainHeader] = useState("");
    const [errors, setErrors] = useState([]);
    const [editerrors, setEditerrors] = useState([]);
    const [fetchedMMSection, setFetchedMMSection] = useState([]);
    const [succ, setSucc] = useState("");
    const [editMOde, setEditMode] = useState(false);

    const [MMainSectionId, setDeleteId] = useState(0);

    const [searchState, setSearch] = useState("");

    const [eItems, setEditMMSection] = useState([]);
    const [editMMainHeader, setEditMMainHeader] = useState("");

    const modalRef = useRef({});
    const modalEdit = useRef({});
    const modalDelete = useRef({});

    const getMMsection = async () => {
        try {
            await axios.get("api/MMsection").then((res) => {
                setFetchedMMSection(res.data);
            });
        } catch (err) {}
    };
    useEffect(() => {
        getMMsection();
        return () => {};
    }, []);
    // delete a post
    const removeSection = (id) => {
        const newMMsection = fetchedMMSection.filter((item) => item.id !== id);

        setFetchedMMSection(newMMsection);
    };
    // handling the image

    const editDataHandling = (items) => {
        $(modalEdit.current)?.modal("show");
        // .style.display = "block";
        setEditMode(true);
        setMMainHeader(items.MMainHeader);
        setMMainBody(items.MMainBody);
        return setEditMMSection(items);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append("MMainBody", MMainBody);
        fd.append("MMainHeader", MMainHeader);

        axios
            .post("/api/MMsection/store", fd)
            .then((result) => {
                // setMMainHeader("");
                // setMMainBody("");
                 setFeedback(true);
                 setTimeout(() => {
                     setFeedback(false);
                 }, 2500);
                 setSucc("Main Marketting Section Added Succesively");
               
                $(modalRef.current).modal("hide");

                getMMsection();
            })
            .catch((err) => {
                setErrors(err.response.data.errors);
            });
    };

    const handleEdit = (e, MsectionId) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append("MMainBody", MMainBody);
        fd.append("MMainHeader", MMainHeader);
        fd.append("MsectonId", MsectionId);
        console.log(MsectionId + " " + MMainBody);
        axios
            .post(`/api/MMsection/edit/${MsectionId}`, fd)
            .then((result) =>
            {
                 setFeedback(true);
                 setTimeout(() => {
                     setFeedback(false);
                 }, 2500);
                 
                setSucc("Main Marketting  Updated Succcessively");
                $(modalEdit.current).modal("hide");

                getMMsection();
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
    const displayImage = (message, status) => {
        if (status) {
            return setInterval(() => {
                <>
                    <div className="row">
                        <div
                            className="col-md-12 text-center"
                            style={{
                                backgroundColor: "#00ff00",
                                padding: "10px",
                                margin: "20px",
                            }}
                        >
                            <h3>{message}</h3>
                        </div>
                    </div>
                </>;
            }, 1000);
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
                                <h4 className="modal-title">
                                    Add Main Section
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
                                onSubmit={handleSubmit}
                                encType="multipart/form-data"
                            >
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>MainHeader:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                hasErrorFor("MMainHeader")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="MMainHeader"
                                            placeholder="Main Header"
                                            name="MMainHeader"
                                            value={MMainHeader}
                                            onChange={(e) => {
                                                setMMainHeader(e.target.value);
                                            }}
                                            required
                                        />
                                        {renderErrorFor("MMainHeader")}
                                    </div>

                                    <div className="form-group">
                                        <label>MainBody:</label>
                                        <textarea
                                            type="textarea"
                                            className={`form-control ${
                                                hasErrorFor("MMainBody")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="MMainBody"
                                            placeholder="Main Header"
                                            name="MMainBody"
                                            value={MMainBody}
                                            onChange={(e) => {
                                                setMMainBody(e.target.value);
                                            }}
                                            required
                                        />
                                        {renderErrorFor("MMainBody")}
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
                                <h4 className="modal-title">
                                    Delete Main section
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

                            <div className="modal-body">
                                <center>
                                    <h5>
                                        do you relay want to Delete this
                                        Markettng Main Section?
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
                                                    `/api/MMsection/${MMainSectionId}`
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
                                                        "Main Marketting Section Deleted Succesively"
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
                                        <label>MainHeader:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                hasEditErrorFor("MMainHeader")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="MMainHeader"
                                            placeholder="Main Header"
                                            name="MMainHeader"
                                            value={MMainHeader}
                                            onChange={(e) => {
                                                setMMainHeader(e.target.value);
                                            }}
                                            required
                                        />
                                        {renderEditErrorFor("MMainHeader")}
                                    </div>

                                    <div className="form-group">
                                        <label>MainBody:</label>
                                        <textarea
                                            type="textarea"
                                            className={`form-control ${
                                                hasEditErrorFor("MMainBody")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="MMainBody"
                                            placeholder="Main Header"
                                            name="MMainBody"
                                            value={MMainBody}
                                            onChange={(e) => {
                                                setMMainBody(e.target.value);
                                            }}
                                            required
                                        />
                                        {renderEditErrorFor("MMainBody")}
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
                                    Marketting Main Section
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
                                                                fetchedMMSection.length
                                                            }
                                                            Records
                                                        </strong>
                                                    </div>
                                                    <h3 className="card-title">
                                                        {fetchedMMSection.length > 0 ? (
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
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>Main Header</th>
                                                            <th>
                                                                Main Descrption
                                                            </th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {fetchedMMSection
                                                            ?.filter(
                                                                (items) => {
                                                                    if (
                                                                        searchState ==
                                                                        ""
                                                                    ) {
                                                                        return items;
                                                                    } else if (
                                                                        items.MMainHeader.toLowerCase().includes(
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
                                                                                        items.MMainHeader
                                                                                    }
                                                                                </td>
                                                                                <td className=" ">
                                                                                    {
                                                                                        items.MMainBody
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
