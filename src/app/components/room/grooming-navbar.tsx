import { useGroomingRoom } from "../../contexts/GroomingRoomContext";
import { IconUserFilled } from "@tabler/icons-react";
import { ROOM_STATUS } from "../../room/[id]/enums";

interface IProps {
  showNickNameForm: boolean;
}

const GroomingNavbar = ({ showNickNameForm }: IProps) => {
  const { groomingInfo, roomStatus } = useGroomingRoom();

  if (roomStatus !== ROOM_STATUS.FOUND || showNickNameForm ) {
    return null;
  }

  return (
    <nav className="grooming-navbar">
      <div className="grooming-navbar__participants">
        <p>Participants:</p>
        <div className="grooming-navbar__participant-number">
          <IconUserFilled width={20} />
          <p>{groomingInfo.totalParticipants || "0"}</p>
        </div>
      </div>
      <div>test</div>
    </nav>
  );
};

export default GroomingNavbar;
