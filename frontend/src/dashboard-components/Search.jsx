import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Search() {
  const [activeModal, setActiveModal] = useState(null);
  const [metrics, setMetrics] = useState([]);

  function activateModal(id) {
    setActiveModal(id);
  }
  function deactivateModal(id) {
    setActiveModal(null);
  }

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/app/metrics")
      .then((response) => response.json())
      .then((data) => setMetrics(data));
  }, [metrics]);

  function handleAddResearch(id) {
    // const metricName = document.querySelector("input[name='name']").value;
    // setMetrics([...metrics, metricName]);
    // setShowModal(false);
    try {
      const researchDescription = document.querySelector("textarea[name='description']").value;
        const researchFormula = document.querySelector("input[name='formula']").value;
        const body = { metricId: id, description: researchDescription, mathFormula: researchFormula };

      fetch("http://localhost:8080/api/v1/app/add/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((data) => setActiveModal(null));
      toast.success("Research added successfully ! you can check it in the Metrics tab.");
    } catch (err) {
      console.error(err.message);
    }
  }

  const displayListElement = (metric) => {
    return (
      <div
        id={metric.id}
        className="h-24 shadow shadow-black bg-second btn btn-ghost flex justify-around rounded-box"
      >
        <li
          onClick={(e) => {
            activateModal(metric.id);
          }}
          className="w-full h-full flex justify-center items-center"
        >
          {metric.name}
        </li>
      </div>
    );
  };

  return (
    <div className="bg-third">
      <div className="overflow-y-auto h-screen w-full fixed flex flex-col items-center gap-32">
        <h1 className="title underline pt-20">Researches</h1>
        <ul className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
          {metrics
            .filter((metric) => !metric.status)
            .map((metric) => (
              <div key={metric.id}>{displayListElement(metric)}</div>
            ))}
        </ul>
        {metrics
          .filter((metric) => !metric.status)
          .map((metric) => (
            <div>
              {activeModal === metric.id ? (
                <>
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
                                <textarea name="description" rows="5" cols="10" className="w-full textarea bg-second text-white">
                                  {metric.description}
                              </textarea>
                                <label htmlFor="formula" className="label">
                                    Formula :
                                </label>
                                <input
                                    type="text"
                                    name="formula"
                                    placeholder="Formula (LaTeX)"
                                    className="input input-bordered w-full my-2 bg-second"
                                />
                            </form>
                        </div>
                          <div
                              className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
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
                </>
              ) : null}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Search;
