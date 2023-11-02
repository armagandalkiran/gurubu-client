import React from "react";
import { useGroomingRoom } from "../../contexts/GroomingRoomContext";
import classNames from "classnames";

interface IProps {
  id: string;
  point: string;
  name: string;
}

const VoteCard = ({ id, point, name }: IProps) => {
  const { setUserVote, userVote } = useGroomingRoom();
  const isCardSelected = Number(userVote[name]) === Number(point);
  const handleClick = () => {
    if (userVote[name] === point) {
      const temp = { ...userVote };
      delete temp[name];
      setUserVote({ ...temp });
      return;
    }
    setUserVote({ ...userVote, [name]: point });
  };

  return (
    <button
      className={classNames("vote-card", { selected: isCardSelected })}
      onClick={handleClick}
    >
      {point}
    </button>
  );
};

export default VoteCard;
