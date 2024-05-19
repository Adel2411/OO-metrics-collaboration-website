import { useState } from "react";

function Home( { setPage } ) {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const introduction =
    "La programmation orientée objet (POO) est une méthodologie de développement logiciel influente, mettant en avant les objets pour favoriser la modularité et la réutilisabilité du code. Dans ce contexte, l'évaluation des métriques orientées objet est devenue cruciale pour mesurer la qualité, la complexité et la performance des logiciels. Ce rapport se concentre sur l'exploration des métriques orientées objet, en mettant l'accent sur les patrons de conception et leur impact dans le développement logiciel. En plus des métriques traditionnelles, de nouveaux indicateurs ont été créés pour mieux appréhender les défis contemporains du développement logiciel. Il examine les différentes métriques, leur utilité pratique, et leur contribution à l'amélioration des processus de développement en identifiant les zones à risque et en guidant l'optimisation du code. En somme, ce rapport vise à souligner l'importance des métriques orientées objet dans la création de logiciels robustes et maintenables.";

  const QuestionsResponse = [
    {
      question: " Qu'est-ce que les métriques orientées objet ?",
      answer:
        "Les métriques orientées objet sont des mesures utilisées pour évaluer divers aspects de la qualité et de la performance du code dans un projet de développement logiciel orienté objet. Elles aident à identifier les points forts et les faiblesses du code.",
    },
    {
      question: "Où puis-je trouver les définitions des différentes métriques ?",
      answer:
        "Vous pouvez trouver les définitions des principales métriques dans l'espace Documentation. Cette section offre des descriptions détaillées pour vous aider à comprendre et appliquer ces métriques à vos projets Java.",
    },
    {
      question: "Comment puis-je tester les métriques sur mon propre projet Java ?",
      answer:
        "L'espace Test vous permet de soumettre votre code Java et d'évaluer ses métriques. Utilisez nos outils interactifs pour analyser votre projet et obtenir des résultats précis.",
    },
    {
      question: "Pourquoi devrais-je utiliser les métriques orientées objet ?",
      answer:
        "Les métriques orientées objet vous aident à améliorer la structure, la maintenabilité et la performance de votre code Java. Elles fournissent des informations précieuses pour identifier les zones nécessitant des améliorations et pour garantir la qualité du logiciel.",
    },
    {
      question: "Les outils de test sont-ils gratuits ?",
      answer:
        "Oui, nos outils de test sont gratuits à utiliser. Vous pouvez analyser votre code Java sans frais et obtenir des résultats détaillés sur les métriques de votre projet.",
    },
    {
      question: "Puis-je utiliser les métriques pour tout type de projet logiciel ?",
      answer:
        "Ce site est spécifiquement destiné aux projets développés en Java. Les métriques orientées objet proposées sont particulièrement adaptées pour les projets Java.",
    },
    {
      question: "Comment puis-je commencer ?",
      answer:
        "Pour commencer, visitez l'espace Documentation pour vous familiariser avec les métriques. Ensuite, rendez-vous dans l'espace Test pour analyser votre projet Java et obtenir des résultats sur ses métriques.",
    }
  ];

  return (
      <div className="mt-16 h-full w-full fixed overflow-y-auto">
        <div className="w-full flex flex-col items-center mb-16 h-screen">
          <div className="h-1/3 flex items-center justify-center">
            <h1 className="pt-4 text-xl lg:text-4xl font-black">WELCOME TO OO-Metrics Website !</h1>
          </div>
          <div className="px-3 w-full h-2/3 flex flex-col md:flex-row items-center justify-evenly lg:px-10">
            <div className="lg:w-1/3 bg-second p-5 lg:p-10 flex flex-col items-center gap-5 lg:gap-10 shadow-lg shadow-first rounded-box">
              <p className="text-sm lg:text-2xl">L'espace Documentation propose des définitions des principales métriques utilisées pour évaluer la qualité des projets logiciels.</p>
              <button className="btn btn-ghost bg-third hover:bg-fourth w-1/2 lg:text-xl" onClick={() => setPage(2)}>
                Go to Documentation
              </button>
            </div>
            <div className="lg:w-1/3 bg-second p-5 lg:p-10 flex flex-col items-center gap-5 lg:gap-10 shadow-lg shadow-first rounded-box">
              <p className="text-sm lg:text-2xl">L'espace Test vous permet d'évaluer les métriques sur vos projets. Analysez votre code et obtenez des résultats précis pour optimiser votre projet.</p>
              <button className="btn btn-ghost bg-third hover:bg-fourth w-1/2 lg:text-xl" onClick={() => setPage(3)}>
                Go to Test
              </button>
            </div>
          </div>
        </div>
        <div className="h-full flex flex-col gap-24 px-5 lg:px-16">
          <div className="w-full flex flex-col gap-5 text-xl">
            <h1 className="documentation-right-title underline underline-offset-2">
              Introduction to OO-metrics:
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
                        className="w-full"
                        onClick={() =>
                            setSelectedQuestion(
                                selectedQuestion === index ? null : index,
                            )
                        }
                    >
                      <button
                          className="w-full h-24 sm:h-16 flex flex-col sm:flex-row items-center sm:justify-between px-10 rounded-t-xl bg-second">
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
                      </button>
                      {selectedQuestion === index && (
                          <p className={"p-5 text-md lg:text-lg rounded-b-xl bg-fourth shadow shadow-first"}>
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
