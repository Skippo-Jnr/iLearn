import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";

const getDocuments = async () => {
  try {
    const { data } = await axiosInstance.get(API_PATHS.DOCUMENTS.GET_DOCUMENTS);
    return data?.data;
  } catch (error) {
    throw (
      error.response?.data?.error || { message: "Failed to fetch documents" }
    );
  }
};

const uploadDocument = async (formData) => {
  try {
    const { data } = await axiosInstance.post(
      API_PATHS.DOCUMENTS.UPLOAD,
      formData,
    );
    return data;
  } catch (error) {
    throw (
      error.response?.data?.error || { message: "Failed to upload document" }
    );
  }
};

const deleteDocument = async (id) => {
  try {
    const { data } = await axiosInstance.delete(
      API_PATHS.DOCUMENTS.DELETE_DOCUMENT_BY_ID(id),
    );
    return data;
  } catch (error) {
    throw (
      error.response?.data?.error || { message: "Failed to delete document" }
    );
  }
};

const getDocumentById = async (id) => {
  try {
    const { data } = await axiosInstance.get(
      API_PATHS.DOCUMENTS.GET_DOCUMENT_BY_ID(id),
    );
    return data;
  } catch (error) {
    throw (
      error.response?.data?.error || {
        message: "Failed to fetch document details",
      }
    );
  }
};

const documentService = {
  getDocuments,
  uploadDocument,
  deleteDocument,
  getDocumentById,
};

export default documentService;
