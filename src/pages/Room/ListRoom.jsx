import { useEffect, useState } from "react";
import RoomCard from "../../components/Room/RoomCard";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";

const ListRoom = () => {
  const [page, setPage] = useState(1);
  const [listRoom, setListRoom] = useState([]);
  const [error, setError] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const serverUri =
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_API_PRODUCTION
      : import.meta.env.VITE_API_DEVELOPMENT;

  const fetchRoomData = async () => {
    try {
      setError(false);
      const response = await axios.post(
        `${serverUri}/api/room/get-all-room?page=${page}&limit=10`
      );

      const rooms = Array.isArray(response.data.rooms)
        ? response.data.rooms
        : [];
      setListRoom(rooms);
    } catch (error) {
      setError(true);
      enqueueSnackbar("Failed to load rooms!", { variant: "error" });
    }
  };

  useEffect(() => {
    fetchRoomData();
  }, [page]);

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Header Spacing */}
      <div className="w-full h-20 z-10"></div>

      {/* Create Room Button */}
      <div className="w-full my-4 fixed z-20 px-6">
        <Link
          to="/create-room"
          className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 text-white w-28 transition ease-in duration-200 text-center font-semibold shadow-md focus:outline-none focus:ring-2 rounded-lg flex items-center justify-center text-lg"
        >
          Create +
        </Link>
      </div>

      {/* Room List */}
      <div className="grid gap-6 mt-24 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 p-4">
        {error ? (
          <p className="text-red-500 text-center w-full">
            <span role="img" aria-label="Error">
              🤖
            </span>{" "}
            Failed to load rooms. Please try again later.
          </p>
        ) : listRoom.length > 0 ? (
          (() => {
            const roomCards = [];
            for (let i = 0; i < listRoom.length; i++) {
              const room = listRoom[i];
              roomCards.push(
                <RoomCard
                  key={room._id}
                  name={room.name}
                  intro={room.intro}
                  history={room.history}
                  topic={room.topic}
                  limit={room.limit}
                  avatar={room.admin.avatar}
                  hisJoin={room.history.length}
                  idRoom={room._id}
                  uuid={room.uuid}
                />
              );
            }
            return roomCards;
          })()
        ) : (
          <p className="text-gray-500 text-center w-full">
            No rooms available.
          </p>
        )}
      </div>
    </div>
  );
};

export default ListRoom;
