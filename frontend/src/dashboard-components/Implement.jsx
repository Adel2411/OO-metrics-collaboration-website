import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs/index.js";
import SyntaxHighlighter from "react-syntax-highlighter";
import url from "../url.json";

function Implement() {
  const [activeModal, setActiveModal] = useState({});
  const [metrics, setMetrics] = useState([]);
  const [implement, setImplement] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [inputs, setInputs] = useState({
    code: "",
  });
  const [editInputs, setEditInputs] = useState({
    code: "",
  });

  let { code } = inputs;
  let { code: editCode } = editInputs;

  function getShortCut(title) {
    return title
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase();
  }

  const handleInputChange = (e) => {
    setInputs({
      code: e.target.value,
    });
  };
  const handleEditInputChange = (e) => {
    setEditInputs({
      code: e.target.value,
    });
  };

  useEffect(() => {
    if (implement && implement.id && editMode) {
      setEditInputs({
        code: implement.code,
      });
    }
  }, [implement, editMode]);

  function activateModal(metric) {
    setActiveModal(metric);
  }
  function deactivateModal() {
    setActiveModal({});
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${url.current}/admin/get/metrics`, {
      "method": "GET",
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
        .then((response) => response.json())
        .then((data) => setMetrics(data.data));
  }, []);

  useEffect(() => {
    if (activeModal.codeImplementationId) {
      const token = localStorage.getItem("token");
      fetch(
        `${url.current}/admin/get/codeimplementation/${activeModal.codeImplementationId}`, {
            method: "GET",
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          }
      )
        .then((response) => response.json())
        .then((data) => {
          setImplement(data.data);
        });
    }
  }, [activeModal]);

  function handleAddCode(id) {
    try {
      const body = { research_id: id, code: code };
      const token = localStorage.getItem("token");

      fetch(`${url.current}/admin/add/codeimplementation`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((data) => {
          setActiveModal({});
          if (data.status === 200) {
            toast.success(data.data + ", Refresh the page to see the result");
          } else {
            toast.error(data.data);
          }
          code = "";
        });
    } catch (err) {
      console.error(err.message);
    }
  }

  function handleEditCode(id) {
    try {
      const body = { id: id, code: editCode };
      const token = localStorage.getItem("token");

      fetch(`${url.current}/admin/update/codeimplementation`, {
        method: "PUT",
        headers: { "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((data) => {
          setActiveModal({});
          if (data.status === 200) {
            toast.success(data.data + ", Refresh the page to see the result");
          } else {
            toast.error(data.data);
          }
          editCode = "";
        });
    } catch (err) {
      console.error(err.message);
    }
  }

  function handleDeleteCode(id) {
    try {
      const token = localStorage.getItem("token");

      fetch(`${url.current}/admin/delete/codeimplementation/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => {
          setActiveModal({});
          if (!response.ok) {
            toast.error("Failed to delete");
            throw new Error("Failed to delete");
          }
          toast.success("Deleted successfully");
            return response.json();
        });
    } catch (err) {
      console.error(err.message);
    }
  }


  const displayCodeElement = (metric) => {
    return (
      <div
        id={metric.id}
        className="h-24 shadow shadow-black bg-second btn btn-ghost flex justify-around rounded-box"
        onClick={() => {
          activateModal(metric);
          console.log(activeModal);
        }}
      >
        <li className="implementations-title">{getShortCut(metric.name)}</li>
        {metric.codeImplementationId ? (
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
              <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
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
                  <h3 className="text-3xl modal-title">{metric.name}</h3>
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
                    <label
                      htmlFor="description"
                      className="label label-text modal-subtitle"
                    >
                      Code implementation :
                    </label>
                    <textarea
                      name="code"
                      rows="5"
                      cols="10"
                      className="w-full textarea bg-second text-white modal-input"
                      placeholder="java implementation..."
                      onChange={handleInputChange}
                      value={code}
                    ></textarea>
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="modal-button bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleAddCode(metric.researchId)}
                  >
                    Add
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

  function displayReadModal(metric) {
    if (implement && metric === activeModal) {
      return (
        <div>
          <div className="text-black justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-sm">
              <div className="border-0 rounded-lg shadow-md shadow-black relative flex flex-col bg-first text-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl modal-title">{metric.name}</h3>
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
                  <h3 className="modal-subtitle">Code :</h3>
                  <div className="max-h-60 overflow-y-auto">
                    <SyntaxHighlighter
                      language="java"
                      style={atomOneDark}
                      customStyle={{
                        padding: "10px",
                      }}
                      wrapLongLines={true}
                      showLineNumbers={true}
                    >
                      {implement.code}
                    </SyntaxHighlighter>
                  </div>
                </div>
                <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                      className="modal-button bg-red-600 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                        onClick={() => handleDeleteCode(metric.codeImplementationId)}
                  >
                    Delete
                  </button>
                  <button
                      className="modal-button bg-yellow-500 text-white active:bg-yellow-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
    if (implement && metric === activeModal) {
      return (
          <div>
            <div
                className="text-black justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-sm">
              <div className="border-0 rounded-lg shadow-md shadow-black relative flex flex-col bg-first text-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl modal-title">{metric.name}</h3>
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
                    <label
                      htmlFor="description"
                      className="label label-text modal-subtitle"
                    >
                      Code implementation :
                    </label>
                    <textarea
                      name="code"
                      rows="5"
                      cols="10"
                      className="modal-input w-full textarea bg-second text-white"
                      placeholder="New code implementation..."
                      defaultValue={implement.code}
                      onChange={handleEditInputChange}
                    ></textarea>
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="modal-button bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      handleEditCode(implement.id);
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
      if (metric.codeImplementationId) {
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
        <h1 className="component-title underline pt-20">Implementations</h1>
        <ul className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
          {metrics.map((metric) => (
            <div key={metric.id}>
              {displayCodeElement(metric)}
              {displayModal(metric)}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Implement;