import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../App";

const FlashCardApp = () => {
  const { state, dispatch } = useContext(AppContext);
  const { idTopic } = useParams();
  const [flashcards, setFlashcards] = useState([]);
  const [newFlashcard, setNewFlashcard] = useState({ part1: "", part2: "" });
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [showRandomCard, setShowRandomCard] = useState(false);
  const [randomCard, setRandomCard] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [nameTopic, setNameTopic] = useState("");
  const serverUri = "http://localhost:5000"; // Cấu hình URL API server

  // Lấy danh sách flashcards từ server
  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await axios.post(
          `${serverUri}/api/flashCard/topics/${idTopic}`
        );
        setNameTopic(response.data.topic.name);
        setFlashcards(response.data.topic.flash || []);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
        alert("Không thể tải flashcards từ server.");
      }
    };

    if (idTopic) fetchFlashcards();
  }, [idTopic]);

  // Thêm flashcard mới
  const handleAddFlashcard = async () => {
    if (newFlashcard.part1.trim() && newFlashcard.part2.trim()) {
      try {
        const response = await axios.post(
          `${serverUri}/api/flashCard/topics/${idTopic}/flashcards`,
          {
            p1: newFlashcard.part1,
            p2: newFlashcard.part2,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
            },
          }
        );
        if (response.status === 200) {
          setFlashcards([...flashcards, response.data.flashCard]);
        }
        setNewFlashcard({ part1: "", part2: "" });
        setShowAddCardForm(false);
      } catch (error) {
        console.error("Error adding flashcard:", error);
        alert("Không thể thêm flashcard.");
      }
    } else {
      alert("Vui lòng nhập đầy đủ thông tin Flashcard!");
    }
  };

  // Lấy flashcard ngẫu nhiên
  const handleRandomCard = () => {
    if (flashcards.length === 0) {
      alert("Chủ đề này chưa có Flashcards.");
      return;
    }
    const randomIndex = Math.floor(Math.random() * flashcards.length);
    setRandomCard(flashcards[randomIndex]);
    setUserAnswer("");
    setShowAnswer(false);
    setShowRandomCard(true);
  };
  const handleShowAnswer = () => {
    setShowAnswer(true);
  };
  // Hiển thị câu trả lời

  // Dừng chế độ random card
  const handleStopRandom = () => {
    setShowRandomCard(false);
    setRandomCard(null);
    setUserAnswer("");
    setShowAnswer(false);
  };

  // Xóa flashcard
  const handleDeleteFlashcard = async (cardId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa Flashcard này?")) {
      try {
        const response = await axios.delete(
          `${serverUri}/api/flashCard/topics/${idTopic}/flashcards/${cardId}`,
          {
            headers: {
              Authorization: `Bearer ${state.user.accessToken}`,
            },
          }
        );
        if (response.status === 200) {
          setFlashcards(flashcards.filter((card) => card._id !== cardId));
        }
      } catch (error) {
        console.error("Error deleting flashcard:", error);
        alert("Không thể xóa flashcard.");
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen relative">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Quản lý Flashcards
      </h1>

      {/* Danh sách flashcards trong chủ đề */}
      <div className="bg-white p-6 rounded-lg shadow-lg overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-700">{nameTopic}</h2>
        {flashcards.length === 0 ? (
          <p className="text-gray-500">Chưa có flashcards trong chủ đề này.</p>
        ) : (
          <div className="space-y-4 pb-16">
            {flashcards.map((card, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 border rounded-lg shadow-sm flex gap-4 break-words items-center"
              >
                <div className="flex-1 p-4 max-w-[47%] bg-blue-50 border border-blue-200 rounded-md">
                  <p className="font-medium text-blue-800">{card.p1}</p>
                </div>
                <div className="flex-1 p-4 max-w-[47%] bg-blue-50 border border-blue-200 rounded-md">
                  <p className="font-medium text-blue-800">{card.p2}</p>
                </div>
                <button
                  className="px-3 py-1 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600"
                  onClick={() => handleDeleteFlashcard(card._id)}
                >
                  Xóa
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Nút Add Card */}
      <button
        className="fixed bottom-4 left-4 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:bg-blue-600 z-10"
        onClick={() => setShowAddCardForm(true)} // Mở form thêm flashcard
      >
        Thêm Flashcard
      </button>

      <button
        className="fixed bottom-4 right-4 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:bg-blue-600 z-10"
        onClick={handleRandomCard}
      >
        Flashcard Ngẫu Nhiên
      </button>
      {/* Form thêm flashcard */}
      {showAddCardForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-gray-700">
              Tạo Flashcard mới
            </h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                className="p-3 border rounded-lg"
                placeholder="Phần 1"
                value={newFlashcard.part1}
                onChange={(e) =>
                  setNewFlashcard({ ...newFlashcard, part1: e.target.value })
                }
              />
              <input
                type="text"
                className="p-3 border rounded-lg"
                placeholder="Phần 2"
                value={newFlashcard.part2}
                onChange={(e) =>
                  setNewFlashcard({ ...newFlashcard, part2: e.target.value })
                }
              />
              <div className="flex justify-end gap-4">
                <button
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                  onClick={() => setShowAddCardForm(false)}
                >
                  Hủy
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                  onClick={handleAddFlashcard}
                >
                  Thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hiển thị Random Card */}
      {showRandomCard && randomCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              className="absolute top-2 right-2 bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center"
              onClick={handleStopRandom}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4 text-gray-700">
              Flashcard Ngẫu Nhiên
            </h2>
            {/* Hiển thị P1 */}
            <p className="text-2xl font-medium mb-4 text-gray-900">
              {randomCard.p1}
            </p>
            <input
              type="text"
              className="p-3 border rounded-lg w-full mb-4"
              placeholder="Nhập câu trả lời của bạn"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            />
            {/* Hiển thị P2 nếu người dùng nhấn Check */}
            {showAnswer && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-md text-blue-700">
                <p className="font-medium">Câu trả lời đúng là:</p>
                <p className="font-bold">{randomCard.p2}</p>
              </div>
            )}
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={handleShowAnswer} // Kích hoạt hiển thị câu trả lời
              >
                Check
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={handleRandomCard} // Lấy random card mới
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashCardApp;
