import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MathJax from "react-mathjax2";

function Research() {
  const [activeModal, setActiveModal] = useState({});
  const [metrics, setMetrics] = useState([]);
  const [research, setResearch] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [inputs, setInputs] = useState({
    Description: "",
    MathFormula: ""
  });
  const [editInputs, setEditInputs] = useState({
    description: "",
    mathFormula: ""
  });

  let {Description, MathFormula} = inputs;
  let {description: editDescription, mathFormula: editMathFormula} = editInputs;

  const handleInputChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  }
  const handleEditInputChange = (e) => {
    setEditInputs({
      ...editInputs,
      [e.target.name]: e.target.value
    });
  }

  useEffect(() => {
    if (research && research.id && editMode) {
      setEditInputs({
        description: research.description,
        mathFormula: research.mathFormula
      });
    }
  }, [research, editMode]);

  function activateModal(metric) {
    setActiveModal(metric);
  }
  function deactivateModal() {
    setActiveModal({});
  }

  useEffect(() => {
    console.log("fetching metrics");
    fetch("http://localhost:8080/api/v1/app/metrics")
      .then((response) => response.json())
      .then((data) => setMetrics(data.data));
  }, []);

  useEffect(() => {
    if (activeModal.researchId) {
      fetch(`http://localhost:8080/api/v1/app/research/${activeModal.researchId}`)
        .then((response) => response.json())
        .then((data) => {
          setResearch(data.data);
        });
    }
  }, [activeModal]);


  function handleAddResearch(id) {
    try {
      const body = {Description: Description, MathFormula: MathFormula, MetricId: id};

      fetch("http://localhost:8080/api/v1/app/add/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((data) => {
          setActiveModal({})
          if (data.status === 200) {
            toast.success(data.data + ", Refresh the page to see the result");
          } else {
            toast.error(data.data);
          }
        Description = "";
          MathFormula = "";
        });
    } catch (err) {
      console.error(err.message);
    }
  }

  function handleEditResearch(id) {
    try {
      const body = {id: id, description: editDescription, mathFormula: editMathFormula};
      fetch("http://localhost:8080/api/v1/app/update/research", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setActiveModal({})
          if (data.status === 200) {
            toast.success(data.data + ", Refresh the page to see the result");
          } else {
            toast.error(data.data);
          }
          editDescription = "";
            editMathFormula = "";
        });
    } catch (err) {
      console.error(err.message);
    }
  }

  const displayResearchElement = (metric) => {
    return (
      <div
        id={metric.id}
        className="h-24 shadow shadow-black bg-second btn btn-ghost flex justify-around rounded-box"
        onClick={() => {
          activateModal(metric);
          console.log(activeModal);
        }}
      >
        <li>
          {metric.name}
        </li>
        {metric.researchId ? (
                <div className="text-green-500">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                  >
                    <path
                        fillRule="evenodd"
                        d="M9 1.5H5.625c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5Zm6.61 10.936a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 14.47a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                        clipRule="evenodd"
                    />
                    <path
                        d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z"/>
                  </svg>
                </div>
        ) : (
            <div className="text-red-500">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
              >
                <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                    clipRule="evenodd"
                />
              </svg>
            </div>
        )}
      </div>
    );
  };

  function displayAddModal(metric) {
    if (metric === activeModal) {
      return (
          <div>
            <div className="text-black justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-full my-6 mx-auto max-w-sm">
                <div className="border-0 rounded-lg shadow-md shadow-black relative flex flex-col bg-first text-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl title">{metric.name}</h3>
                    <button
                        className="p-1 ml-auto text-red-600 border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => {
                          deactivateModal();
                        }}
                    >
                            <span className=" h-6 w-6 text-2xl block outline-none focus:outline-none">
                              <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-6 h-6"
                              >
                                <path
                                    fillRule="evenodd"
                                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                                    clipRule="evenodd"
                                />
                              </svg>
                            </span>
                    </button>
                  </div>
                  <div className="relative p-6 flex-auto">
                    <form>
                      <label htmlFor="description" className="label">
                        Description :
                      </label>
                      <textarea
                          name="Description"
                          rows="5"
                          cols="10"
                          className="w-full textarea bg-second text-white"
                          placeholder="description"
                          defaultValue=""
                          value={Description}
                          onChange={handleInputChange}
                      ></textarea>
                      <label htmlFor="formula" className="label">
                        Formula :
                      </label>
                      <input
                          type="text"
                          name="MathFormula"
                          placeholder="Formula (LaTeX)"
                          className="input input-bordered w-full my-2 bg-second"
                          defaultValue=""
                            value={MathFormula}
                            onChange={handleInputChange}
                      />
                    </form>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => handleAddResearch(metric.id)}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </div>
      )
    }
    return null;
  }

  function displayReadModal(metric) {
        if (research && metric === activeModal) {
      return (
          <div>
            <div className="text-black justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-full my-6 mx-auto max-w-sm">
                <div className="border-0 rounded-lg shadow-md shadow-black relative flex flex-col bg-first text-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl title">{metric.name}</h3>
                    <button
                        className="p-1 ml-auto text-red-600 border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => {
                          deactivateModal();
                        }}
                    >
                            <span className=" h-6 w-6 text-2xl block outline-none focus:outline-none">
                              <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-6 h-6"
                              >
                                <path
                                    fillRule="evenodd"
                                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                                    clipRule="evenodd"
                                />
                              </svg>
                            </span>
                    </button>
                  </div>
                  <div className="relative p-6 flex-auto">
                    <div>
                      <p>
                        <span className="font-bold">Description :</span>
                        {research.description}
                      </p>
                      <MathJax.Context input="tex">
                        <div>
                          <MathJax.Node>{research.mathFormula}</MathJax.Node>
                        </div>
                      </MathJax.Context>
                    </div>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                        className="bg-yellow-500 text-white active:bg-yellow-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setEditMode(true)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </div>
        );
    }
    return null;
  }

  function displayEditModal(metric) {
    if (research && metric === activeModal) {
      return (
          <div>
            <div
                className="text-black justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-full my-6 mx-auto max-w-sm">
                <div
                    className="border-0 rounded-lg shadow-md shadow-black relative flex flex-col bg-first text-white outline-none focus:outline-none">
                  <div
                      className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl title">{metric.name}</h3>
                    <button
                        className="p-1 ml-auto text-red-600 border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => {
                          deactivateModal();
                          setEditMode(false);
                        }}
                    >
                            <span className=" h-6 w-6 text-2xl block outline-none focus:outline-none">
                              <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-6 h-6"
                              >
                                <path
                                    fillRule="evenodd"
                                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                                    clipRule="evenodd"
                                />
                              </svg>
                            </span>
                    </button>
                  </div>
                  <div className="relative p-6 flex-auto">
                    <form>
                      <label htmlFor="description" className="label">
                        Description :
                      </label>
                      <textarea
                          name="description"
                          rows="5"
                          cols="10"
                          className="w-full textarea bg-second text-white"
                          placeholder="New description"
                          defaultValue={research.description}
                            onChange={handleEditInputChange}
                      ></textarea>
                      <label htmlFor="formula" className="label">
                        Formula :
                      </label>
                      <input
                          type="text"
                          name="mathFormula"
                          placeholder="New formula (LaTeX)"
                          className="input input-bordered w-full my-2 bg-second"
                            defaultValue={research.mathFormula}
                            onChange={handleEditInputChange}
                      />
                    </form>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                        className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {
                          handleEditResearch(research.id);
                            setEditMode(false);
                        }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </div>
      );
    }
    return null;
  }

  function displayModal(metric) {
    if (metric === activeModal) {
        if (metric.researchId) {
            if (editMode) {
                return displayEditModal(metric);
            }
            return displayReadModal(metric);
        }
        return displayAddModal(metric);
    }
    return null;
  }



  return (
      <div className="bg-third">
        <div className="overflow-y-auto h-screen w-full fixed flex flex-col items-center gap-32">
          <h1 className="component-title underline pt-20">Researches</h1>
          <ul className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
            {metrics.map((metric) => (
                <div key={metric.id}>
                  {displayResearchElement(metric)}
                  {displayModal(metric)}
                </div>
            ))}
          </ul>
      </div>
    </div>
  );
}

export default Research;