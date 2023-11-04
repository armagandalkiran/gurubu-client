import { Fragment, useEffect, useState } from "react";
import { useSocket } from "../../contexts/SocketContext";
import {
  checkUserJoinedLobbyBefore,
  getCurrentLobby,
} from "../../shared/helpers/lobbyStorage";
import { useGroomingRoom } from "../../contexts/GroomingRoomContext";
import VotingStick from "./voting-stick";
import classNames from "classnames";
import Image from "next/image";
import { IconCheck } from "@tabler/icons-react";
import MetricAverages from "./metric-averages";
import GroomingBoardParticipants from "./grooming-board-participants";

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
  const { userInfo, setGroomingInfo, groomingInfo, setUserVote } =
    useGroomingRoom();

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

    socket.on("initialize", (data) => {
      if (data?.participants[lobby.userID]) {
        setUserVote(data.participants[lobby.userID].votes);
        setGroomingInfo(data);
      }
    });

    socket.on("voteSent", (data) => setGroomingInfo(data));

    socket.on("showResults", (data) => {
      setGroomingInfo(data);
    });

    socket.on("resetVotes", (data) => {
      setUserVote({});
      setGroomingInfo(data);
    });

    socket.on("userDisconnected", (data) => setGroomingInfo(data));

    socket.on("welcomeMessage", (message) => {});
  }, []);

  const handleShowResultsClick = () => {
    if (groomingInfo.isResultShown) {
      return;
    }
    socket.emit("showResults", roomId);
  };

  const handleResetVotesClick = () => {
    socket.emit("resetVotes", roomId);
  };

  if (showNickNameForm) {
    return null;
  }

  return (
    <div className="grooming-board">
      <section className="grooming-board__playground">
        {groomingInfo.isResultShown && (
          <div className="grooming-board__results">
            <Image src="/trophy.svg" alt="trophy" width={200} height={200} />
            <p>{groomingInfo.score}</p>
          </div>
        )}
        {!groomingInfo.isResultShown && (
          <div className="grooming-board__voting-sticks">
            {groomingInfo.metrics?.map((metric) => (
              <VotingStick
                key={metric.id}
                id={metric.id}
                points={metric.points}
                name={metric.name}
              />
            ))}
          </div>
        )}
        <MetricAverages />
        {userInfo.lobby?.isAdmin && (
          <div className="grooming-board__actions-wrapper">
            <button
              className="grooming-board__reset-votes-button"
              onClick={handleResetVotesClick}
            >
              Reset Votes
            </button>
            <button
              className={classNames("grooming-board__show-result-button", {
                disabled: groomingInfo.isResultShown,
              })}
              onClick={handleShowResultsClick}
            >
              Show Results
            </button>
          </div>
        )}
      </section>
      <section className="grooming-board__logs-section">
        <>
          <ul className="grooming-board__metrics">
            {groomingInfo.metrics?.map((metric) => (
              <li key={metric.id}>{metric.name}</li>
            ))}
          </ul>
          <GroomingBoardParticipants />
        </>
      </section>
    </div>
  );
};

export default GroomingBoard;
