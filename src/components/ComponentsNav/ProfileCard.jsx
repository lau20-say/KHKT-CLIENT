import React, { useState, useContext, useEffect } from "react";
import CreateIcon from "@mui/icons-material/Create";
import { AppContext } from "../../App";
import axios from "axios";
import { useSnackbar } from "notistack";

const ProfileCard = ({ onClose }) => {
  const { state, dispatch } = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar();

  const [avatar, setAvatar] = useState(localStorage.getItem("Avatar"));
  const [name, setName] = useState(localStorage.getItem("Fullname"));
  const [email, setEmail] = useState(localStorage.getItem("Email"));
  const [editingAvatar, setEditingAvatar] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const serverUri =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_API_PRODUCTION
      : import.meta.env.VITE_API_DEVELOPMENT;

  useEffect(() => {
    setHasChanges(
      avatar !== localStorage.getItem("Avatar") ||
        name !== localStorage.getItem("Fullname") ||
        email !== localStorage.getItem("Email")
    );
  }, [avatar, name, email]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "oki001");
      formData.append("cloud_name", "di5omn7wa");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/di5omn7wa/image/upload",
          formData
        );
        setAvatar(response.data.secure_url);
        setEditingAvatar(false);
        enqueueSnackbar("Avatar uploaded successfully!", {
          variant: "success",
        });
      } catch (error) {
        enqueueSnackbar("Error uploading avatar. Please try again.", {
          variant: "error",
        });
      }
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.post(
        `${serverUri}/api/user/update-user`,
        { fullName: name, email, avatar },
        {
          headers: {
            Authorization: `Bearer ${state.user.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const updatedUser = { name, email, avatar };
        dispatch({ type: "UPDATE_USER", payload: updatedUser });
        localStorage.setItem("userData", JSON.stringify(updatedUser));

        enqueueSnackbar("Profile updated successfully!", {
          variant: "success",
        });
        setIsEditing(false);
      }
    } catch (error) {
      enqueueSnackbar("Failed to update profile. Please try again.", {
        variant: "error",
      });
    }
  };

  return (
    <div className="flex flex-col items-center bg-white overflow-hidden shadow rounded-lg border p-4 transform transition-opacity duration-300 opacity-100">
      <button
        className="self-end text-gray-500 hover:text-red-500 mb-2"
        onClick={onClose}
      >
        Close
      </button>
      <div className="relative">
        <img
          src={avatar}
          alt="Avatar"
          className="w-24 h-24 rounded-full border-2 border-gray-300 shadow-md"
        />
        <button
          className="absolute bottom-0 right-0 bg-blue-300 rounded-full h-6 w-6 flex items-center justify-center"
          onClick={() => setEditingAvatar(!editingAvatar)}
        >
          <CreateIcon sx={{ fontSize: 16 }} />
        </button>
      </div>

      {editingAvatar && (
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-4"
        />
      )}

      <div className="w-full mt-4">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            User Profile
          </h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 p-2 rounded"
                  />
                ) : (
                  name
                )}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {isEditing ? (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 p-2 rounded"
                  />
                ) : (
                  email
                )}
              </dd>
            </div>
          </dl>
        </div>
        <div className="w-full flex justify-end mt-4">
          <button
            className="mr-4 bg-gray-300 text-black px-4 py-2 rounded"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
          <button
            onClick={handleUpdate}
            disabled={!hasChanges}
            className={`px-4 py-2 rounded ${
              hasChanges
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
