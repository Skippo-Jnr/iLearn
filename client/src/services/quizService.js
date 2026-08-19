import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";

const getQuizzesForDocument = async (documentId) => {
  try {
    const { data } = await axiosInstance.get(
      API_PATHS.QUIZZES.GET_QUIZZES_FOR_DOC(documentId),
    );
    return data;
  } catch (error) {
    throw (
      error?.response?.data?.error || { message: "Failed to fetch quizzes" }
    );
  }
};

const getQuizById = async (quizId) => {
  try {
    const { data } = await axiosInstance.get(
      API_PATHS.QUIZZES.GET_QUIZ_BY_ID(quizId),
    );
    return data;
  } catch (error) {
    throw error?.response?.data?.error || { message: "Failed to fetch quiz" };
  }
};

const submitQuiz = async (quizId, answers) => {
  try {
    const { data } = await axiosInstance.post(
      API_PATHS.QUIZZES.SUBMIT_QUIZ(quizId),
      { answers },
    );
    return data;
  } catch (error) {
    throw error?.response?.data?.error || { message: "Failed to submit quiz" };
  }
};

const getQuizResults = async (quizId) => {
  try {
    const { data } = await axiosInstance.get(
      API_PATHS.QUIZZES.GET_QUIZ_RESULTS(quizId),
    );
    return data;
  } catch (error) {
    throw (
      error?.response?.data?.error || {
        message: "Failed to fetch quiz results",
      }
    );
  }
};

const deleteQuiz = async (quizId) => {
  try {
    const { data } = await axiosInstance.delete(
      API_PATHS.QUIZZES.DELETE_QUIZ(quizId),
    );
    return data;
  } catch (error) {
    throw error?.response?.data?.error || { message: "Failed to delete quiz" };
  }
};

const quizService = {
  getQuizzesForDocument,
  getQuizById,
  submitQuiz,
  getQuizResults,
  deleteQuiz,
};

export default quizService;
