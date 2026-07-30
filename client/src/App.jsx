import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import DocumentList from "./pages/Documents/DocumentList";
import DocumentDetails from "./pages/Documents/DocumentDetails";
import FlashcardsList from "./pages/Flashcards/FlashcardsList";
import FlashcardsPage from "./pages/Flashcards/Flashcards";
import QuizTake from "./pages/Quizzes/QuizTake";
import QuizResult from "./pages/Quizzes/QuizResult";
import Profile from "./pages/Profile/Profile";

function App() {
  const isAuthenticated = false;
  const loading = false;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/documents" element={<DocumentList />} />
          <Route path="/documents/:id" element={<DocumentDetails />} />
          <Route path="/flashcards" element={<FlashcardsList />} />
          <Route
            path="/documents/:id/flashcards"
            element={<FlashcardsPage />}
          />
          <Route path="/quizzes/:quizId" element={<QuizTake />} />
          <Route path="/quizzes/:quizId/results" element={<QuizResult />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
