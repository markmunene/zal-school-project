import axios from "axios";
// import { Modal } from "bootstrap";
import React, { useState, useEffect, useRef } from "react";

import Paginate from "../pagination/paginate";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

export default function SetMission() {
    //    protected $fillable = [
    //     'ImageName',
    //  'Header',
    //  'Description',
    //  '',
    //   '',
    //   '',
    //   '',
    //   '',
    //   ''
    // ];
    const [image, setImage] = useState("");

    const [feedback, setFeedback] = useState(false);
    const [Description, setDescription] = useState("");
    const [SectionIcon, setSectionIcon] = useState("");
    const [ValuesHeader, setValuesHeader] = useState("");
    const [StatTotal, setStatTotal] = useState("");
    const [Header, setHeader] = useState("");
    const [StatName, setStatName] = useState("");
    const [ValuesDesc, setValuesDesc] = useState("");
    const [SectionName, setSectionName] = useState("");

    const [errors, setErrors] = useState([]);
    const [editerrors, setEditerrors] = useState([]);
    const [fetchedMission, setfetchedMission] = useState([]);
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

    const currentpost = fetchedMission.slice(indexOfFirstPost, indexOfLastPost);

    const Page = (pageNumber) => setCurrentPage(pageNumber);
    // end of pagination logic

    const [eItems, setEditImg] = useState([]);
    // const [editStatName, setEditStatName] = useState("");

    const modalRef = useRef({});
    const modalEdit = useRef({});
    const modalDelete = useRef({});

    const getMission = async () => {
        try {
            await axios.get("api/mission").then((res) => {
                setfetchedMission(res.data);
            });
        } catch (err) {}
    };
    useEffect(() => {
        getMission();
        return () => {};
    }, []);
    // delete a post
    const removeTour = (id) => {
        const newImg = fetchedMission.filter((item) => item.id !== id);

        setfetchedMission(newImg);
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

        setStatName(items.StatName);
        setValuesDesc(items.ValuesDesc);
        setSectionName(items.SectionName);
        setDescription(items.Description);
        setValuesHeader(items.ValuesHeader);
        setSectionIcon(items.SectionIcon);
        setHeader(items.Header);
        setStatTotal(items.StatTotal);
        return setEditImg(items);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append("image", image);
        fd.append("StatName", StatName);
        fd.append("Header", Header);
        fd.append("Description", Description);

        fd.append("ValuesHeader", ValuesHeader);
        fd.append("StatTotal", StatTotal);
        fd.append("SectionIcon", SectionIcon);

        fd.append("ValuesDesc", ValuesDesc);
        fd.append("SectionName", SectionName);

        axios
            .post("/api/mission/store", fd, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            })
            .then((result) => {
                setImage("");
                setStatName("");
                setValuesDesc("");
                setSectionName("");
                setDescription("");
                setValuesHeader("");
                setSectionIcon("");
                setHeader("");

                setStatTotal("");
                setFeedback(true);
                setTimeout(() => {
                    setFeedback(false);
                }, 2500);
                setSucc("Mission Added succesively");
                $(modalRef.current).modal("hide");

                getMission();
            })
            .catch((err) => {
                setErrors(err.response.data.errors);
            });
    };

    const handleEdit = (e, ImgId) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append("image", image);
        fd.append("StatName", StatName);
        fd.append("Header", Header);
        fd.append("ValuesHeader", ValuesHeader);
        fd.append("StatTotal", StatTotal);
        fd.append("SectionIcon", SectionIcon);
        fd.append("Description", Description);
        fd.append("ValuesDesc", ValuesDesc);
        fd.append("SectionName", SectionName);
        fd.append("ImgId", ImgId);

        axios
            .post(`/api/mission/update/${ImgId}`, fd, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            })
            .then((result) =>
            {
                 setImage("");
                 setStatName("");
                 setValuesDesc("");
                 setSectionName("");
                 setDescription("");
                 setValuesHeader("");
                 setSectionIcon("");
                 setHeader("");

                 setStatTotal("");
                setFeedback(true);
                setTimeout(() => {
                    setFeedback(false);
                }, 2500);
                setSucc("Mission Updated Succcessively");
                $(modalEdit.current).modal("hide");

                getMission();
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
                                <h4 className="modal-title"> Add Mission</h4>
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
                                        />
                                        {renderErrorFor("Header")}
                                    </div>
                                    {/*  */}

                                    {/* ValuesDesc */}
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
                                        />
                                        {renderErrorFor("Description")}
                                    </div>
                                    <div className="form-group">
                                        <label>SectionIcon:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                hasErrorFor("SectionIcon")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="SectionIcon"
                                            placeholder="SectionIcon"
                                            name="SectionIcon"
                                            value={SectionIcon}
                                            onChange={(e) => {
                                                setSectionIcon(e.target.value);
                                            }}
                                        />
                                        {renderErrorFor("SectionIcon")}
                                    </div>
                                    {/*  */}
                                    <div className="form-group">
                                        <label>ValuesHeader:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                hasErrorFor("ValuesHeader")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="ValuesHeader"
                                            placeholder="ValuesHeader"
                                            name="ValuesHeader"
                                            value={ValuesHeader}
                                            onChange={(e) => {
                                                setValuesHeader(e.target.value);
                                            }}
                                        />
                                        {renderErrorFor("ValuesHeader")}
                                    </div>
                                    {/*  */}
                                    <div className="form-group">
                                        <label>ValuesDesc:</label>
                                        <textarea
                                            className={`form-control ${
                                                hasErrorFor("ValuesDesc")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="ValuesDesc"
                                            placeholder="ValuesDesc"
                                            name="ValuesDesc"
                                            value={ValuesDesc}
                                            onChange={(e) => {
                                                setValuesDesc(e.target.value);
                                            }}
                                        />
                                        {renderErrorFor("ValuesDesc")}
                                    </div>

                                    {/*  */}
                                    <div className="form-group">
                                        <label>StatTotal:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                hasErrorFor("StatTotal")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="StatTotal"
                                            placeholder="StatTotal"
                                            name="StatTotal"
                                            value={StatTotal}
                                            onChange={(e) => {
                                                setStatTotal(e.target.value);
                                            }}
                                        />
                                        {renderErrorFor("StatTotal")}
                                    </div>
                                    {/*  */}

                                    <div className="form-group">
                                        <label>StatName:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                hasErrorFor("StatName")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="StatName"
                                            placeholder="StatName"
                                            name="StatName"
                                            value={StatName}
                                            onChange={(e) => {
                                                setStatName(e.target.value);
                                            }}
                                        />
                                        {renderErrorFor("StatName")}
                                    </div>
                                    {/*SectionName  */}

                                    <div className="form-group">
                                        <label>SectionName:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                hasErrorFor("SectionName")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="SectionName"
                                            placeholder="SectionName"
                                            name="SectionName"
                                            value={SectionName}
                                            onChange={(e) => {
                                                setSectionName(e.target.value);
                                            }}
                                        />
                                        {renderErrorFor("SectionName")}
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
                                <h4 className="modal-title">Delete Mission</h4>
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
                                        do you relay want to Delete this Mission
                                        ?
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
                                                    `/api/mission/${imageDeleteId}`
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
                                                        "Mission Deleted Succcessively"
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
                                <h4 className="modal-title">Edit Mission</h4>
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
                                        />
                                        {renderErrorFor("Header")}
                                    </div>
                                    {/*  */}

                                    {/* ValuesDesc */}
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
                                        />
                                        {renderErrorFor("Description")}
                                    </div>
                                    <div className="form-group">
                                        <label>SectionIcon:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                hasErrorFor("SectionIcon")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="SectionIcon"
                                            placeholder="SectionIcon"
                                            name="SectionIcon"
                                            value={SectionIcon}
                                            onChange={(e) => {
                                                setSectionIcon(e.target.value);
                                            }}
                                        />
                                        {renderErrorFor("SectionIcon")}
                                    </div>
                                    {/*  */}
                                    <div className="form-group">
                                        <label>ValuesHeader:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                hasErrorFor("ValuesHeader")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="ValuesHeader"
                                            placeholder="ValuesHeader"
                                            name="ValuesHeader"
                                            value={ValuesHeader}
                                            onChange={(e) => {
                                                setValuesHeader(e.target.value);
                                            }}
                                        />
                                        {renderErrorFor("ValuesHeader")}
                                    </div>
                                    {/*  */}
                                    <div className="form-group">
                                        <label>ValuesDesc:</label>
                                        <textarea
                                            className={`form-control ${
                                                hasErrorFor("ValuesDesc")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="ValuesDesc"
                                            placeholder="ValuesDesc"
                                            name="ValuesDesc"
                                            value={ValuesDesc}
                                            onChange={(e) => {
                                                setValuesDesc(e.target.value);
                                            }}
                                        />
                                        {renderErrorFor("ValuesDesc")}
                                    </div>

                                    {/*  */}
                                    <div className="form-group">
                                        <label>StatTotal:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                hasErrorFor("StatTotal")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="StatTotal"
                                            placeholder="StatTotal"
                                            name="StatTotal"
                                            value={StatTotal}
                                            onChange={(e) => {
                                                setStatTotal(e.target.value);
                                            }}
                                        />
                                        {renderErrorFor("StatTotal")}
                                    </div>
                                    {/*  */}

                                    <div className="form-group">
                                        <label>StatName:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                hasErrorFor("StatName")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="StatName"
                                            placeholder="StatName"
                                            name="StatName"
                                            value={StatName}
                                            onChange={(e) => {
                                                setStatName(e.target.value);
                                            }}
                                        />
                                        {renderErrorFor("StatName")}
                                    </div>
                                    {/*SectionName  */}

                                    <div className="form-group">
                                        <label>SectionName:</label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                hasErrorFor("SectionName")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            id="SectionName"
                                            placeholder="SectionName"
                                            name="SectionName"
                                            value={SectionName}
                                            onChange={(e) => {
                                                setSectionName(e.target.value);
                                            }}
                                        />
                                        {renderErrorFor("SectionName")}
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
                                <h3 className="card-title">About Us|mission | History |Vision</h3>

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
                                                                fetchedMission.length
                                                            }
                                                            Records
                                                        </strong>
                                                    </div>
                                                    <h3 className="card-title">
                                                        {fetchedMission.length >
                                                        10 ? (
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
                                                            <th>Image</th>
                                                            <th>Header</th>
                                                            <th>Description</th>
                                                            <th>ValueIcon</th>
                                                            <th>
                                                                ValuesHeader
                                                            </th>
                                                            <th>ValuesDesc </th>
                                                            <th>StatName</th>
                                                            <th>StatTotal</th>
                                                            <th>SectionName</th>
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
                                                                                ""
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
                                                                                        {items
                                                                                            .ImageName
                                                                                            .length ===
                                                                                        0 ? (
                                                                                            ""
                                                                                        ) : (
                                                                                            <img
                                                                                                src={
                                                                                                    "./uploadedImages/" +
                                                                                                    items.ImageName
                                                                                                }
                                                                                                alt=""
                                                                                                className=" img-fluid
                                                                                                 CalTableimage"
                                                                                            />
                                                                                        )}
                                                                                    </td>
                                                                                    <td>
                                                                                        {
                                                                                            items.Header
                                                                                        }
                                                                                    </td>
                                                                                    <td style={{width : '200px'}}>
                                                                                        {
                                                                                            items.Description
                                                                                        }
                                                                                    </td>
                                                                                   
                                                                                    <td>
                                                                                       <i className= {
                                                                                            `${items.SectionIcon}`
                                                                                        }></i>
                                                                                    </td>

                                                                                    <td>
                                                                                        {
                                                                                            items.ValuesHeader
                                                                                        }
                                                                                    </td>
                                                                                    <td className="w-45">
                                                                                        {
                                                                                            items.ValuesDesc
                                                                                        }
                                                                                    </td>
                                                                                    <td>
                                                                                        {
                                                                                            items.StatTotal
                                                                                        }
                                                                                    </td>
                                                                                    <td>
                                                                                        {
                                                                                            items.StatName
                                                                                        }
                                                                                    </td>
                                                                                    <td>
                                                                                        {
                                                                                            items.SectionName
                                                                                        }
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
                                                        fetchedMission.length
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
