import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";

const FlashCardTopics = () => {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);
  const serverUri =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_API_PRODUCTION
      : import.meta.env.VITE_API_DEVELOPMENT;
  const df = localStorage.getItem("Id");
  // Lấy danh sách topics từ server
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get(
          `${serverUri}/api/flashCard/topics/${df}`
        );
        console.log(response.data.topics);
        setTopics(response.data.topics); // Assuming response.data is an array of topics
      } catch (error) {
        console.error("Error fetching topics:", error);
        alert("Không thể tải danh sách chủ đề từ server.");
      }
    };
    fetchTopics();
  }, []);

  // Hàm thêm chủ đề mới
  const handleAddTopic = async () => {
    const newTopicName = prompt("Nhập tên chủ đề mới:");
    if (newTopicName) {
      try {
        const response = await axios.post(
          `${serverUri}/api/flashCard/create-topic`,
          {
            name: newTopicName,
            admin: state.user.id, // Replace with actual user ID from context or auth
          }
        );
        console.log(response);
        setTopics([...topics, response.data.topic]); // Assuming response.data is the created topic
      } catch (error) {
        console.error("Error adding topic:", error);
        alert("Không thể thêm chủ đề mới.");
      }
    }
  };

  // Hàm xóa chủ đề
  const handleDeleteTopic = async (index) => {
    console.log(topics[index]._id);
    const confirmDelete = window.confirm(
      `Bạn có chắc muốn xóa chủ đề "${topics[index].name}"?`
    );
    if (confirmDelete) {
      const topicId = topics[index]._id; // Assuming topics have an _id field
      try {
        const resp = await axios.post(
          `${serverUri}/api/flashCard/delete-topic/${topicId}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
            },
          }
        );
        if (resp.status === 200) {
          setTopics(topics.filter((_, i) => i !== index));
        }
      } catch (error) {
        console.error("Error deleting topic:", error);
        alert("Không thể xóa chủ đề này.");
      }
    }
  };

  const toTopic = (id) => {
    navigate(`/flash-card/${id}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Danh sách Chủ đề Flashcards</h1>

      {/* Nút thêm chủ đề mới */}
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded mb-6"
        onClick={handleAddTopic}
      >
        Thêm Chủ đề mới
      </button>

      {topics.length === 0 ? (
        <p className="text-gray-500">Chưa có chủ đề nào.</p>
      ) : (
        <ul className="space-y-4">
          {(() => {
            const topicElements = [];
            for (let i = 0; i < topics.length; i++) {
              const topic = topics[i];
              topicElements.push(
                <li
                  key={topic._id}
                  className="flex justify-between items-center bg-white p-4 rounded shadow"
                >
                  {/* Tên chủ đề và số lượng flashcards */}
                  <div>
                    <button
                      onClick={() => {
                        toTopic(topic._id);
                      }}
                    >
                      <h2 className="text-lg font-bold">{topic.name}</h2>
                    </button>
                  </div>

                  {/* Nút xóa */}
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded"
                    onClick={() => handleDeleteTopic(i)}
                  >
                    Xóa
                  </button>
                </li>
              );
            }
            return topicElements;
          })()}
        </ul>
      )}
    </div>
  );
};

export default FlashCardTopics;
