import { useEffect } from "react";
import { useSocket } from "../../contexts/SocketContext";
import {
  checkUserJoinedLobbyBefore,
  getCurrentLobby,
} from "../../shared/helpers/lobbyStorage";
import { useGroomingRoom } from "../../contexts/GroomingRoomContext";
import VotingStick from "./voting-stick";

interface IProps {
  roomId: string;
  showNickNameForm: boolean;
  setShowNickNameForm: (value: boolean) => void;
}

const GroomingBoard = ({
  roomId,
  showNickNameForm,
  setShowNickNameForm,
}: IProps) => {
  const socket = useSocket();
  const { userInfo, setGroomingInfo, groomingInfo } = useGroomingRoom();

  useEffect(() => {
    if (!checkUserJoinedLobbyBefore(roomId)) {
      setShowNickNameForm(true);
      return;
    }
    const nickname = localStorage.getItem("nickname");
    const lobby = getCurrentLobby(roomId);

    socket.emit("joinRoom", {
      nickname,
      roomID: roomId,
      lobby,
    });

    socket.on("initialize", (data) => setGroomingInfo(data));

    socket.on("userDisconnected", (data) => {
    });

    socket.on("welcomeMessage", (message) => {
    });
  }, []);

  if (showNickNameForm) {
    return null;
  }

  return (
    <div className="grooming-board">
      <section className="grooming-board__playground">
        {groomingInfo.metrics?.map((metric) => (
          <VotingStick
            key={metric.id}
            id={metric.id}
            points={metric.points}
            name={metric.name}
          />
        ))}
      </section>
      <section className="grooming-board__logs-section">
        {Object.keys(groomingInfo.participants || {}).map((participantKey) => (
          <p key={participantKey}>{groomingInfo.participants[participantKey].nickname}</p>
        ))}
      </section>
    </div>
  );
};

export default GroomingBoard;
