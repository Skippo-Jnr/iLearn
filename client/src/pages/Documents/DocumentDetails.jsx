import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import documentService from "../../services/documentService";
import toast from "react-hot-toast";
import Spinner from "../../components/common/Spinner";
import { ArrowLeft, ExternalLink } from "lucide-react";
import PageHeader from "../../components/common/PageHeader";
import Tabs from "../../components/common/Tabs";
import ChatInterface from "../../components/chat/ChatInterface";
import AIActions from "../../components/ai/AIActions";
import FlashcardManager from "../../components/flashcards/FlashcardManager";
import QuizManager from "../../components/quizzes/QuizManager";

function DocumentDetails() {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Content");

  useEffect(() => {
    const fetchDocumentDetails = async () => {
      try {
        const data = await documentService.getDocumentById(id);
        setDocument(data);
        console.log(data);
      } catch (error) {
        toast.error("Failed tp fetch document details");
        console.error(error?.response?.data?.error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocumentDetails();
  }, [id]);

  // function to get the full PDF URL
  const getUrl = () => {
    if (!document?.data?.filePath) return null;

    const filePath = document.data.filePath;

    if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
      return filePath;
    }

    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

    return `${baseUrl}${filePath.startsWith("/") ? "" : "/"}${filePath}`;
  };

  const renderContent = () => {
    if (loading) return <Spinner />;

    if (!document || !document.data || !document.data.filePath)
      return <div className="">PDF not available</div>;

    const pdfUrl = getUrl();

    return (
      <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
        <div className="flex items-center justify-between p-4 bg-gray-30 border-b border-gray-300">
          <span className="text-sm font-medium text-gray-700">
            Document Viewer
          </span>
          <a
            href={getUrl}
            className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink size={16} />
            Open in new tab
          </a>
        </div>
        <div className="bg-gray-100">
          <iframe
            src={pdfUrl}
            frameBorder="0"
            className="w-full h-[70vh] bg-white rounded border border-gray-300"
            title="PDF Viewer"
            style={{
              colorScheme: "light",
            }}
          />
        </div>
      </div>
    );
  };

  const renderChat = () => {
    return <ChatInterface />;
  };

  const renderActions = () => {
    return <AIActions />;
  };

  const renderFlashcards = () => {
    return <FlashcardManager documentId={id} />;
  };

  const renderQuizzesTab = () => {
    return <QuizManager documentId={id} />;
  };

  const tabs = [
    { name: "Content", label: "Content", content: renderContent() },
    { name: "Chat", label: "Chat", content: renderChat() },
    { name: "AI Actions", label: "AI Actions", content: renderActions() },
    { name: "Flashcards", label: "Flashcards", content: renderFlashcards() },
    { name: "Quizzes", label: "Quizzes", content: renderQuizzesTab() },
  ];

  if (loading) return <Spinner />;

  if (!document)
    return <div className="text-center p-8">Document not found</div>;

  return (
    <div>
      <div className="">
        <Link
          to="/documents"
          className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft size={10} /> Back to Documents
        </Link>
      </div>
      <PageHeader title={document.data.title} />
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default DocumentDetails;
