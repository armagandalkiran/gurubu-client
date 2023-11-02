"use client";

import { SetStateAction, useEffect, useRef, useState } from "react";
import { RoomService } from "../../services/roomService";

interface IProps {
  joinMode?: boolean;
  roomId?: string;
}

const defaultNickname = () => {
  return (
    (typeof window !== "undefined" &&
      window.localStorage.getItem("nickname")) ||
    ""
  );
};

const NicknameForm = ({ joinMode, roomId }: IProps) => {
  const [nickname, setNickname] = useState(defaultNickname);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const roomService = new RoomService("http://localhost:5000");

  const handleNicknameChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setNickname(e.target.value);
  };

  const handleCreateRoomButtonClick = async () => {
    const trimmedNickName = nickname.trim();
    if (trimmedNickName === "") {
      return;
    }
    localStorage.setItem("nickname", trimmedNickName);
    const payload = { nickName: trimmedNickName };
    const response = await roomService.createRoom(payload);

    if (!response) {
      return;
    }

    let lobby = JSON.parse(localStorage.getItem("lobby") || "{}");

    if (!Object.keys(lobby).length) {
      const lobbyContent = {
        state: {
          rooms: {
            [response.roomID]: response,
          },
        },
      };
      lobby = lobbyContent;
      localStorage.setItem("lobby", JSON.stringify(lobbyContent));
    }

    lobby.state.rooms[response.roomID] = response;
    localStorage.setItem("lobby", JSON.stringify(lobby));

    window.location.assign(`/room/${response.roomID}`);
  };

  const handleJoinRoomButtonClick = async () => {
    const trimmedNickName = nickname.trim();
    if (trimmedNickName === "" || !roomId) {
      return;
    }
    localStorage.setItem("nickname", trimmedNickName);
    const payload = { nickName: trimmedNickName };
    const response = await roomService.join(roomId, payload);

    if (!response) {
      return;
    }

    let lobby = JSON.parse(localStorage.getItem("lobby") || "{}");

    if (!Object.keys(lobby).length) {
      const lobbyContent = {
        state: {
          rooms: {
            [response.roomID]: response,
          },
        },
      };
      lobby = lobbyContent;
      localStorage.setItem("lobby", JSON.stringify(lobbyContent));
    }

    lobby.state.rooms[response.roomID] = response;
    localStorage.setItem("lobby", JSON.stringify(lobby));

    window.location.assign(`/room/${response.roomID}`);
  };

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.focus();

    inputRef.current.setSelectionRange(
      inputRef.current.value.length,
      inputRef.current.value.length
    );
  }, []);

  return (
    <div className="nickname-form">
      <h1 className="nickname-form__title">Welcome to Gurubu</h1>
      <div className="nickname-form__action-wrapper">
        <div className="nickname-form__input-wrapper">
          <label htmlFor="nickname-input" className="nickname-form__label">
            To enter the room, choose a nickname.
          </label>
          <input
            id="nickname-input"
            ref={inputRef}
            className="nickname-form__input"
            placeholder="Enter your nickname"
            value={nickname}
            onChange={handleNicknameChange}
          />
        </div>
        <button
          className="nickname-form__button"
          onClick={
            joinMode ? handleJoinRoomButtonClick : handleCreateRoomButtonClick
          }
        >
          {joinMode ? "Join Room" : "Create Room"}
        </button>
      </div>
    </div>
  );
};

export default NicknameForm;
