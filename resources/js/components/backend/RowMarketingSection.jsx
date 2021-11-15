import React, { useState, useEffect, useRef } from "react";

import axios from "axios";

export default function RowMarketingSection() {
    const [MRowBody, setMRowBody] = useState("");

    
    const [feedback, setFeedback] = useState(false);
    const [MRowHeader, setMRowHeader] = useState("");
    const [errors, setErrors] = useState([]);
    const [editerrors, setEditerrors] = useState([]);
    const [fetchedMRowSection, setFetchedMRowSection] = useState([]);
    const [succ, setSucc] = useState("");
    const [sectionIcon, setsectionIcon] = useState("");

    const [MMainSectionId, setDeleteId] = useState(0);

    const [searchState, setSearch] = useState("");

    const [eItems, setEditMRowSection] = useState([]);
    const [editMRowHeader, setEditMRowHeader] = useState("");

    const modalRef = useRef({});
    const modalEdit = useRef({});
    const modalDelete = useRef({});

    const getMRowSection = async () => {
        try {
            await axios.get("api/MRowSection").then((res) => {
                setFetchedMRowSection(res.data);
            });
        } catch (err) {}
    };
    useEffect(() => {
        getMRowSection();
        return () => {};
    }, []);

    // protected $fillable = ['sectionIcon', 'MRowBody', 'MRowHeader'];

    // delete a post
    const removeSection = (id) => {
        const newMRowSection = fetchedMRowSection.filter(
            (item) => item.id !== id
        );

        setFetchedMRowSection(newMRowSection);
    };
    // handling the image

    const editDataHandling = (items) => {
        $(modalEdit.current)?.modal("show");
        // .style.display = "block";
        // setEditMode(true);
        setMRowHeader(items.MRowHeader);
        setMRowBody(items.MRowBody);
        setsectionIcon(items.sectionIcon)
        return setEditMRowSection(items);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append("MRowBody", MRowBody);
        fd.append("MRowHeader", MRowHeader);
        fd.append("sectionIcon", sectionIcon);

        axios
            .post("/api/MRowSection/store", fd)
            .then((result) => {
                // setMRowHeader("");
                // setMRowBody("");
                setFeedback(true);
                setTimeout(() => {
                    setFeedback(false);
                }, 2500);
                setSucc("Section Added succesively");
                $(modalRef.current).modal("hide");

                getMRowSection();
            })
            .catch((err) => {
                setErrors(err.response.data.errors);
            });
    };

    const handleEdit = (e, MsectionId) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append("MRowBody", MRowBody);
        fd.append("MRowHeader", MRowHeader);
         fd.append("sectionIcon", sectionIcon);
        fd.append("MsectonId", MsectionId);
        console.log(MsectionId + " " + MRowBody);
        axios
            .post(`/api/MRowSection/update/${MsectionId}`, fd)
            .then((result) =>
            {
                setFeedback(true);
                setTimeout(() => {
                    setFeedback(false);
                }, 2500);
                setSucc("Main Marketting Section  Updated Succcessively");
                $(modalEdit.current).modal("hide");

                getMRowSection();
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
                                        <label>sectionIcon:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                hasErrorFor("sectionIcon")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="sectionIcon"
                                            placeholder="Row Section icon"
                                            name="sectionIcon"
                                            value={sectionIcon}
                                            onChange={(e) => {
                                                setsectionIcon(e.target.value);
                                            }}
                                            required
                                        />
                                        {renderErrorFor("sectionIcon")}
                                    </div>
                                    <div className="form-group">
                                        <label>RowSectionHeader:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                hasErrorFor("MRowHeader")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="MRowHeader"
                                            placeholder="Row Section Header"
                                            name="MRowHeader"
                                            value={MRowHeader}
                                            onChange={(e) => {
                                                setMRowHeader(e.target.value);
                                            }}
                                            required
                                        />
                                        {renderErrorFor("MRowHeader")}
                                    </div>

                                    <div className="form-group">
                                        <label>MainBody:</label>
                                        <textarea
                                            className={`form-control ${
                                                hasErrorFor("MRowBody")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="MRowBody"
                                            placeholder="Row Section Body"
                                            name="MRowBody"
                                            value={MRowBody}
                                            onChange={(e) => {
                                                setMRowBody(e.target.value);
                                            }}
                                            required
                                        />
                                        {renderErrorFor("MRowBody")}
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
                                        Markettng Row Section?
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
                                                    `/api/MRowSection/${MMainSectionId}`
                                                )
                                                .then((response) => {
                                                    setFeedback(true);
                                                    setTimeout(() => {
                                                        setFeedback(false);
                                                    }, 2500);
                                                    setSucc(
                                                        "Row Marketting Content Section Deleted Succesively"
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
                                        <label>sectionIcon:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                hasEditErrorFor("sectionIcon")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="sectionIcon"
                                            placeholder="Row Section icon"
                                            name="sectionIcon"
                                            value={sectionIcon}
                                            onChange={(e) => {
                                                setsectionIcon(e.target.value);
                                            }}
                                            required
                                        />
                                        {renderEditErrorFor("sectionIcon")}
                                    </div>

                                    <div className="form-group">
                                        <label>MainHeader:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                hasEditErrorFor("MRowHeader")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="MRowHeader"
                                            placeholder="Main Header"
                                            name="MRowHeader"
                                            value={MRowHeader}
                                            onChange={(e) => {
                                                setMRowHeader(e.target.value);
                                            }}
                                            required
                                        />
                                        {renderEditErrorFor("MRowHeader")}
                                    </div>

                                    <div className="form-group">
                                        <label>MainBody:</label>
                                        <textarea
                                            className={`form-control ${
                                                hasEditErrorFor("MRowBody")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="MRowBody"
                                            placeholder="Main Header"
                                            name="MRowBody"
                                            value={MRowBody}
                                            onChange={(e) => {
                                                setMRowBody(e.target.value);
                                            }}
                                            required
                                        />
                                        {renderEditErrorFor("MRowBody")}
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
                                    Marketting Row Section
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
                                                                fetchedMRowSection.length
                                                            }
                                                            Records
                                                        </strong>
                                                    </div>
                                                    <h3 className="card-title">
                                                        {fetchedMRowSection.length >=
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
                                                            <th>Row Header</th>
                                                            <th>
                                                                Row Descrption
                                                            </th>

                                                            <th>Action</th>
                                                            <th>Row Icon</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {fetchedMRowSection
                                                            ?.filter(
                                                                (items) => {
                                                                    if (
                                                                        searchState ==
                                                                        ""
                                                                    ) {
                                                                        return items;
                                                                    } else if (
                                                                        items.MRowHeader.toLowerCase().includes(
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
                                                                                        items.MRowHeader
                                                                                    }
                                                                                </td>
                                                                                <td className="RowBody">
                                                                                    {
                                                                                        items.MRowBody
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
                                                                                <td>
                                                                                    <i
                                                                                        className={`${items.sectionIcon}`}
                                                                                    >
                                                                                    
                                                                                    </i>
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
