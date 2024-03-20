import React from "react";

function Metric() {
    const [showModal, setShowModal] = React.useState(false);

    const displayListElement = (text) => {
        return (
            <div className=" py-3 shadow shadow-black  flex justify-between rounded-box bg-second my-5">
                <li className="px-10 flex items-center">{text}</li>
                <span className="px-10">
                    <button className="btn btn-ghost btn-square text-red-600" onClick={() => setShowModal(true)}>
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                            className="w-6 h-6">
  <path fillRule="evenodd"
        d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
        clipRule="evenodd"/>
</svg>

                    </button>
                </span>
            </div>
        );
    }

    return (
        <div className="h-fit bg-third">
            <div className="flex flex-col items-center gap-10">
                <h1 className="title underline">Metrics</h1>
                <ul className="w-full">
                    {displayListElement("Cyclomatic Complexity")}
                    {displayListElement("Lines of Code")}
                    {displayListElement("Number of Methods")}
                    {displayListElement("Number of Classes")}
                    {displayListElement("Number of Attributes")}
                    {displayListElement("Number of Comments")}
                    {displayListElement("Number of Packages")}
                    {displayListElement("Number of Interfaces")}
                    {displayListElement("Number of Enums")}
                    {displayListElement("Number of Abstract Classes")}
                    {displayListElement("Number of Concrete Classes")}
                    {displayListElement("Number of Static Methods")}
                    {displayListElement("Number of Public Methods")}
                    {displayListElement("Number of Private Methods")}
                    {displayListElement("Number of Protected Methods")}
                    {displayListElement("Number of Default Methods")}
                </ul>
            </div>
            <div className="flex justify-end">
                <button className="btn btn-success flex flex-row text-white " onClick={() => setShowModal(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd"
                              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                              clipRule="evenodd"/>
                    </svg>
                    <span>Add</span>
                </button>
            </div>

            {showModal ? (
                <>
                    <div
                        className="text-black justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-sm">
                            <div className="border-0 rounded-lg shadow-md shadow-black relative flex flex-col bg-first text-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl title">
                                        Add Metric
                                    </h3>
                                    <button
                                        className="p-1 ml-auto text-red-600 border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                    <span
                        className=" h-6 w-6 text-2xl block outline-none focus:outline-none">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                           className="w-6 h-6">
  <path fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
        clipRule="evenodd"/>
</svg>

                    </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <form>
                                        <label htmlFor="name" className="label">
                                            Metric Name :
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Metric Name"
                                            className="input input-bordered w-full my-2 bg-second"
                                        />
                                    </form>
                                </div>
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">

                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
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
    );
}

export default Metric;
