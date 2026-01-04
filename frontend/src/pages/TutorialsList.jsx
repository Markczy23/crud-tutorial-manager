import { useEffect, useState } from "react";
import TutorialService from "../services/tutorial.service";
import { Link } from "react-router-dom";

function TutorialsList() {
  const [tutorials, setTutorials] = useState([]);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  //uncomment later
  useEffect(() => {
    retrieveTutorials();
  }, []);

  //   //comment out later
  //   useEffect(() => {
  //     fakeTuts();
  //   }, []);

  //for testing to populate with fake data
  const fakeTuts = () => {
    setTutorials([
      {
        id: 1,
        title: "Tut uno",
        description: "The first of its kind",
        published: true,
      },
      {
        id: 2,
        title: "Tut duolingo",
        description: "The second owl",
        published: false,
      },
      {
        id: 3,
        title: "Tut tut tut",
        description: "Three times the charm",
        published: true,
      },
    ]);
  };

  const retrieveTutorials = () => {
    TutorialService.getAll()
      .then((response) => {
        setTutorials(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setActiveTutorial = (tutorial, index) => {
    setCurrentIndex(index);
    setCurrentTutorial(tutorial);
  };

  const refreshList = () => {
    retrieveTutorials();
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };

  const removeAllTutorials = () => {
    TutorialService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const findByTitle = () => {
    TutorialService.findByTitle(searchTitle)
      .then((response) => {
        setTutorials(response.data);
        setCurrentTutorial(null);
        setCurrentIndex(-1);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-4">
      {/* Left side search and list */}
      <div className="flex-1">
        <div className="flex">
          <input
            className="w-full border border-gray-300 rounded-l px-2 py-1"
            placeholder="Search by title"
            type="text"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
          <button
            className="bg-blue-500 rounded-r py-1 px-4 text-white cursor-pointer"
            onClick={findByTitle}
          >
            Search
          </button>
        </div>

        <h4 className="font-bold text-lg mb-2">Tutorials List</h4>
        <ul className="divide-y-4 divide-gray-200 border border-gray-200 rounded">
          {tutorials &&
            tutorials.map((tutorial, index) => (
              <li
                className={
                  "px-4 py-2 cursor-pointer " +
                  (currentIndex === index ? "bg-blue-100" : "")
                }
                key={index}
                onClick={() => setActiveTutorial(tutorial, index)}
              >
                {tutorial.title}
              </li>
            ))}
        </ul>

        <button
          className="bg-red-500 text-white rounded px-4 py-1 mt-2 cursor-pointer"
          onClick={removeAllTutorials}
        >
          Remove all
        </button>
      </div>

      {/* Right side Current tutorial */}
      <div className="flex-1">
        {currentTutorial ? (
          <div className="rounded shadow p-4 bg-white">
            <h4 className="font-bold text-lg mb-2">Tutorial</h4>
            <div className="mb-2">
              <strong>Title: </strong>
              {currentTutorial.title}
            </div>
            <div className="mb-2">
              <strong>Description: </strong>
              {currentTutorial.description}
            </div>
            <div className="mb-2">
              <strong>Status: </strong>
              {currentTutorial.published ? "Published" : "Pending"}
            </div>

            <Link
              to={`/tutorials/${currentTutorial.id}`}
              className="inline-block bg-yellow-400 text-black rounded py-1 px-4"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <p>Please click on a tutorial to see its info</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TutorialsList;
