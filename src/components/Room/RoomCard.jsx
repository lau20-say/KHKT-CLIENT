import { AppContext } from "../../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function RoomCard({
  uuid,
  idRoom,
  hisJoin,
  avatar,
  limit,
  topic,
  history,
  intro,
  name,
}) {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const join = () => {
    window.location.href = `https://khkt-room.onrender.com/start-call?roomId=${uuid}&accessToken=${state.user.accessToken}`;
  };
  return (
    <div className="w-full mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700 p-6">
      {/* Avatar and Basic Info */}
      <div className="  dark:border-gray-700 px-4 pb-6">
        <div className="relative text-center my-4">
          <div className=" rounded-full p-1 flex justify-center mx-auto">
            <img
              className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800"
              src={avatar || "https://via.placeholder.com/150"}
              alt={name}
            />
          </div>
          <div className="py-2">
            <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
              {name || "Unknown Room"}
            </h3>
            <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
              {(() => {
                const words = topic;
                const spans = [];
                for (let i = 0; i < words.length; i++) {
                  spans.push(
                    <span
                      key={i}
                      className="text-base p-2 rounded-3xl mx-2 border-[1.5px] border-gray-400 font-medium"
                    >
                      {words[i]}
                    </span>
                  );
                }
                return spans;
              })()}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 px-2">
          <button
            className="flex-1 rounded-full text-lg text-white bg-blue-500 px-4 py-2 shadow-md"
            onClick={join}
          >
            Join Room
          </button>
        </div>
      </div>

      {/* Additional Room Info */}
    </div>
  );
}

export default RoomCard;
