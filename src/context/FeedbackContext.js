import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    eidt: false,
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  // fetch feedback
  const fetchFeedback = async () => {
    const response = await fetch(`/feedback?_sort=id&order=desc`);
    const data = await response.json();

    setFeedback(data);
    setIsLoading(false);
  };

  // delete feedback
  const deleteFeedback = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      await fetch(`/feedback/${id}`, { method: "DELETE" });
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  //update feedback item
  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: "PUT",
      headers: {
        "CONTENT-TYPE": "application/json",
      },
      body: JSON.stringify(updItem),
    });

    const data = await response.json();

    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
    );
  };

  // set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  // add feedback
  const addFeedback = async (newFeedback) => {
    const response = await fetch("/feedback", {
      method: "POST",
      headers: {
        "CONTENT-TYPE": "application/json",
      },
      body: JSON.stringify(newFeedback),
    });

    const data = await response.json();

    setFeedback([data, ...feedback]);
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        // this is the item in the state
        feedbackEdit,
        isLoading,
        deleteFeedback,
        updateFeedback,
        addFeedback,
        // this is the function to edit feedback
        editFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
