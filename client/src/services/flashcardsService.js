import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";

const getAllFlashcardSets = async () => {
  try {
    const { data } = await axiosInstance.get(
      API_PATHS.FLASHCARDS.GET_ALL_FLASHCARD_SETS,
    );
    return data;
  } catch (error) {
    throw (
      error.response?.data?.error || {
        message: "Failed to fetch flashcard sets",
      }
    );
  }
};

const getFlashcardsForDocument = async (documentId) => {
  try {
    const { data } = await axiosInstance.get(
      API_PATHS.FLASHCARDS.GET_FLASHCARDS_FOR_DOC(documentId),
    );
    return data;
  } catch (error) {
    throw (
      error.response?.data?.error || {
        message: "Failed to fetch flashcards",
      }
    );
  }
};

const reviewFlashcard = async (cardId, cardIndex) => {
  try {
    const { data } = await axiosInstance.post(
      API_PATHS.FLASHCARDS.REVIEW_FLASHCARD(cardId),
      { cardIndex },
    );
    return data;
  } catch (error) {
    throw (
      error.response?.data?.error || {
        message: "Failed to review flashcard",
      }
    );
  }
};

const toggleStar = async (cardId) => {
  try {
    const { data } = await axiosInstance.put(
      API_PATHS.FLASHCARDS.TOGGLE_STAR(cardId),
    );
    return data;
  } catch (error) {
    throw (
      error.response?.data?.error || {
        message: "Failed to star flashcard",
      }
    );
  }
};

const deleteFlashcardSet = async (id) => {
  try {
    const { data } = await axiosInstance.delete(
      API_PATHS.FLASHCARDS.DELETE_FLASHCARD_SET(id),
    );
    return data;
  } catch (error) {
    throw (
      error.response?.data?.error || {
        message: "Failed to delete flashcard",
      }
    );
  }
};

const flashcardService = {
  getAllFlashcardSets,
  getFlashcardsForDocument,
  reviewFlashcard,
  toggleStar,
  deleteFlashcardSet,
};

export default flashcardService;
