import React, { useState, useEffect, useRef } from "react";

import axios from "axios";

export default function SetContactInfo() {
    const [description1, setdescription1] = useState("");

    const [feedback, setFeedback] = useState(false);
    const [description2, setdescription2] = useState("");
    const [errors, setErrors] = useState([]);
    const [editerrors, setEditerrors] = useState([]);
    const [fetchedcontactInfo, setFetchedcontactInfo] = useState([]);
    const [succ, setSucc] = useState("");
    const [contactIcon, setcontactIcon] = useState("");
    //
    const [MMainSectionId, setDeleteId] = useState(0);

    const [searchState, setSearch] = useState("");

    const [eItems, setEditcontactInfo] = useState([]);
    const [editdescription2, setEditdescription2] = useState("");

    const modalRef = useRef({});
    const modalEdit = useRef({});
    const modalDelete = useRef({});

    const getcontactInfo = async () => {
        try {
            await axios.get("api/contactInfo").then((res) => {
                setFetchedcontactInfo(res.data);
            });
        } catch (err) {}
    };
    useEffect(() => {
        getcontactInfo();
        return () => {};
    }, []);

    // protected $fillable = ['contactIcon', 'description1', 'description2'];

    // delete a post
    const removeSection = (id) => {
        const newcontactInfo = fetchedcontactInfo.filter(
            (item) => item.id !== id
        );

        setFetchedcontactInfo(newcontactInfo);
    };
    // handling the image

    const editDataHandling = (items) => {
        $(modalEdit.current)?.modal("show");
        // .style.display = "block";
        // setEditMode(true);
        setdescription2(items.description2);
        setdescription1(items.description1);
        setcontactIcon(items.contactIcon);
        return setEditcontactInfo(items);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append("description1", description1);
        fd.append("description2", description2);
        fd.append("contactIcon", contactIcon);

        axios
            .post("/api/contactInfo/store", fd)
            .then((result) => {
                // setdescription2("");
                // setdescription1("");
                setFeedback(true);
                setTimeout(() => {
                    setFeedback(false);
                }, 2500);
                setSucc("contact Info Added succesively");
                $(modalRef.current).modal("hide");

                getcontactInfo();
            })
            .catch((err) => {
                setErrors(err.response.data.errors);
            });
    };

    const handleEdit = (e, MsectionId) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append("description1", description1);
        fd.append("description2", description2);
        fd.append("contactIcon", contactIcon);
        fd.append("MsectonId", MsectionId);
        console.log(MsectionId + " " + description1);
        axios
            .post(`/api/contactInfo/update/${MsectionId}`, fd)
            .then((result) => {
                setFeedback(true);
                setTimeout(() => {
                    setFeedback(false);
                }, 2500);
                setSucc("Contact Info Updated Succcessively");
                $(modalEdit.current).modal("hide");

                getcontactInfo();
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
                                <h4 className="modal-title">
                                    Add Contact Details
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
                                        <label>contactIcon:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                hasErrorFor("contactIcon")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="contactIcon"
                                            placeholder="contact  icon"
                                            name="contactIcon"
                                            value={contactIcon}
                                            onChange={(e) => {
                                                setcontactIcon(e.target.value);
                                            }}
                                            required
                                        />
                                        {renderErrorFor("contactIcon")}
                                    </div>
                                    <div className="form-group">
                                        <label>Description 2:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                hasErrorFor("description2")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="description2"
                                            placeholder="description2"
                                            name="description2"
                                            value={description2}
                                            onChange={(e) => {
                                                setdescription2(e.target.value);
                                            }}
                                            required
                                        />
                                        {renderErrorFor("description2")}
                                    </div>

                                    <div className="form-group">
                                        <label>Description 1:</label>
                                        <input
                                            className={`form-control ${
                                                hasErrorFor("description1")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="description1"
                                            placeholder="description1"
                                            name="description1"
                                            value={description1}
                                            onChange={(e) => {
                                                setdescription1(e.target.value);
                                            }}
                                            required
                                        />
                                        {renderErrorFor("description1")}
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
                                    Delete Contact Information
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
                                        do you relay want to Delete this Conatct
                                        Details?
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
                                                    `/api/contactInfo/${MMainSectionId}`
                                                )
                                                .then((response) => {
                                                    setFeedback(true);
                                                    setTimeout(() => {
                                                        setFeedback(false);
                                                    }, 2500);
                                                    setSucc(
                                                        "  Contact Info Deleted Succesively"
                                                    );
                                                    removeSection(
                                                        MMainSectionId
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
                                    Edit Marketting Row section
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
                                        <label>contactIcon:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                hasEditErrorFor("contactIcon")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="contactIcon"
                                            placeholder="contact info Icon"
                                            name="contactIcon"
                                            value={contactIcon}
                                            onChange={(e) => {
                                                setcontactIcon(e.target.value);
                                            }}
                                            required
                                        />
                                        {renderEditErrorFor("contactIcon")}
                                    </div>

                                    <div className="form-group">
                                        <label>MainHeader:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                hasEditErrorFor("description2")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="description2"
                                            placeholder="description2"
                                            name="description2"
                                            value={description2}
                                            onChange={(e) => {
                                                setdescription2(e.target.value);
                                            }}
                                            required
                                        />
                                        {renderEditErrorFor("description2")}
                                    </div>

                                    <div className="form-group">
                                        <label>MainBody:</label>
                                        <input
                                            className={`form-control ${
                                                hasEditErrorFor("description1")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="description1"
                                            placeholder="description1"
                                            name="description1"
                                            value={description1}
                                            onChange={(e) => {
                                                setdescription1(e.target.value);
                                            }}
                                            required
                                        />
                                        {renderEditErrorFor("description1")}
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
                                        value=" update"
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
                                    Contact Details Section
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
                                                                fetchedcontactInfo.length
                                                            }
                                                            Records
                                                        </strong>
                                                    </div>
                                                    <h3 className="card-title">
                                                        {fetchedcontactInfo.length >=
                                                        3 ? (
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
                                                            <th>
                                                                contactinfo Icon
                                                            </th>
                                                            <th>Descrption1</th>
                                                            <th>Descrption2</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {fetchedcontactInfo
                                                            ?.filter(
                                                                (items) => {
                                                                    if (
                                                                        searchState ==
                                                                        ""
                                                                    ) {
                                                                        return items;
                                                                    } else if (
                                                                        items.description2
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
                                                                                    <i
                                                                                        className={`${items.contactIcon}`}
                                                                                    ></i>
                                                                                </td>
                                                                                <td>
                                                                                    {
                                                                                        items.description2
                                                                                    }
                                                                                </td>
                                                                                <td className="RowBody">
                                                                                    {
                                                                                        items.description1
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
