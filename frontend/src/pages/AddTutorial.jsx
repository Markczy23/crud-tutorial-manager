import { useState } from "react";
import TutorialService from "../services/tutorial.service.js";

function AddTutorial() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const saveTutorial = () => {
    const data = { title, description };
    TutorialService.create(data)
      .then((response) => {
        console.log(response.data);
        setSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const newTutorial = () => {
    setSubmitted(false);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="max-w-sm mx-auto rounded shadow p-4 bg-white mt-4">
      {submitted ? (
        <div>
          <h4 className="font-bold text-green-600 mb-4">
            Tutorial Submitted Successfully!
          </h4>

          <button
            className="bg-blue-500 text-white rounded px-4 py-1 hover:cursor-pointer"
            onClick={newTutorial}
          >
            Add a new one
          </button>
        </div>
      ) : (
        <div>
          <h4 className="font-bold text-xl mb-2">Add Tutorial</h4>

          <div className="mb-2">
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              className="border border-gray-300 rounded w-full px-2 py-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label className="font-medium block mb-1">Description</label>
            <input
              type="text"
              className="border border-gray-300 w-full px-2 py-1 rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button
            className="bg-green-500 text-white rounded py-1 px-4 mt-2 hover:cursor-pointer"
            onClick={saveTutorial}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default AddTutorial;
