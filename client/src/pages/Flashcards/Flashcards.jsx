import React, { useState } from "react";
import { useParams } from "react-router-dom";

function FlashcardsPage() {
  const { id: documentId } = useParams();
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [flashcards, setFlashcards] = useState([]);
  const [laoding, setLoading] = useState(true);
  const [generating, setGenerating] = useState(true);
  const [currentCardIndex, setGenerating] = useState(true);
  const [generating, setGenerating] = useState(true);
  const [generating, setGenerating] = useState(true);

  return <div>FlashcardsPage</div>;
}

export default FlashcardsPage;
