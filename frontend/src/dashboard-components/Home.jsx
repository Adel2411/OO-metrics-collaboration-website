import { useState } from "react";

function Home() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const introduction =
    "So perhaps, you've generated some fancy text, and you're content that you can now copy and paste your fancy text in the comments section of funny cat videos, but perhaps you're wondering how it's even possible to change the font of your text? Is it some sort of hack? Are you copying and pasting an actual font?\n" +
    "Well, the answer is actually no - rather than generating fancy fonts, this converter creates fancy symbols. The explanation starts with unicode; an industry standard which creates the specification for thousands of different symbols and characters. All the characters that you see on your electronic devices, and printed in books, are likely specified by the unicode standard.";
  const QuestionsResponse = [
    {
      question: "What is the purpose of this application?",
      answer:
        "The purpose of this application is to provide a platform for the employees to view their details and update them if necessary.",
    },
    {
      question: "What are the features of this application?",
      answer:
        "The application provides the following features: \n 1. View the list of all employees \n 2. View the details of an employee \n 3. Update the details of an employee",
    },
    {
      question: "How can I view the list of all employees?",
      answer:
        "You can view the list of all employees by clicking on the 'Employees' tab in the navigation bar.",
    },
    {
      question: "How can I view the details of an employee?",
      answer:
        "You can view the details of an employee by clicking on the 'View' button next to the employee's name in the list of employees.",
    },
    {
      question: "How can I update the details of an employee?",
      answer:
        "You can update the details of an employee by clicking on the 'Update' button next to the employee's name in the list of employees.",
    },
    {
      question: "How can I update the details of an employee?",
      answer:
        "You can update the details of an employee by clicking on the 'Update' button next to the employee's name in the list of employees.",
    },
    {
      question: "How can I update the details of an employee?",
      answer:
        "You can update the details of an employee by clicking on the 'Update' button next to the employee's name in the list of employees.",
    },
    {
      question: "How can I update the details of an employee?",
      answer:
        "You can update the details of an employee by clicking on the 'Update' button next to the employee's name in the list of employees.",
    },
    {
      question: "How can I update the details of an employee?",
      answer:
        "You can update the details of an employee by clicking on the 'Update' button next to the employee's name in the list of employees.",
    },
    {
      question: "How can I update the details of an employee?",
      answer:
        "You can update the details of an employee by clicking on the 'Update' button next to the employee's name in the list of employees.",
    },
    {
      question: "How can I update the details of an employee?",
      answer:
        "You can update the details of an employee by clicking on the 'Update' button next to the employee's name in the list of employees.",
    },
    {
      question: "How can I update the details of an employee?",
      answer:
        "You can update the details of an employee by clicking on the 'Update' button next to the employee's name in the list of employees.",
    },
    {
      question: "How can I update the details of an employee?",
      answer:
        "You can update the details of an employee by clicking on the 'Update' button next to the employee's name in the list of employees.",
    },
  ];

  return (
    <div className="h-full w-full fixed overflow-y-auto">
      <div className="mt-16 h-full flex flex-col gap-24 px-5 lg:px-16">
        <div className="w-full flex justify-center pb-10">
          <h1 className="pt-4 component-title underline">Home</h1>
        </div>
        <div className="w-full flex flex-col gap-5 text-xl">
          <h1 className="documentation-right-title underline">
            Introduction :
          </h1>
          <p>{introduction}</p>
        </div>
        <div className="w-full flex flex-col justify-center gap-10">
          <p className="documentation-right-title underline">Q&A :</p>
          <ul className="flex flex-col items-center gap-5 mb-24">
            {QuestionsResponse.map((questionResponse, index) => {
              return (
                <li
                  key={index}
                  className="w-full rounded-box shadow shadow-first"
                  onClick={() =>
                    setSelectedQuestion(
                      selectedQuestion === index ? null : index,
                    )
                  }
                >
                  <div className="h-24 sm:h-16 flex flex-col sm:flex-row items-center sm:justify-between px-10 btn btn-ghost bg-second hover:bg-fourth">
                    <h1 className="text-md lg:text-xl">
                      {questionResponse.question}
                    </h1>
                    {selectedQuestion === index ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 15.75 7.5-7.5 7.5 7.5"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m19.5 8.25-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    )}
                  </div>
                  {selectedQuestion === index && (
                    <p className={"p-5 text-md lg:text-lg"}>
                      {questionResponse.answer}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
