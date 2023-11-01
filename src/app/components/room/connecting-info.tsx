import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { RoomService } from "../../services/roomService";
import { ROOM_STATUS } from "../../room/[id]/enums";

interface IProps {
  roomId: string;
}

const ConnectingInfo = ({ roomId }: IProps) => {
  const [roomStatus, setRoomStatus] = useState<keyof typeof ROOM_STATUS>(
    ROOM_STATUS.CHECKING
  );
  const roomService = new RoomService("http://localhost:5000");

  const fetchRoomId = async () => {
    const response = await roomService.getRoom(roomId);
    if (!response.isSuccess) {
      setRoomStatus(ROOM_STATUS.NOT_FOUND);
      return;
    }

    setRoomStatus(ROOM_STATUS.FOUND);
  };

  useEffect(() => {
    fetchRoomId();
  }, []);

  if (roomStatus === ROOM_STATUS.NOT_FOUND) {
    notFound();
  }

  if (roomStatus === ROOM_STATUS.FOUND) {
    return null;
  }

  return (
    <div className="connecting-info">
      <p className="connecting-info__message">Connecting to the room...</p>
    </div>
  );
};

export default ConnectingInfo;
