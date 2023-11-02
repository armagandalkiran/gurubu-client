import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ROOM_STATUS } from "../room/[id]/enums";
import { getCurrentLobby } from "../shared/helpers/lobbyStorage";
import { GroomingInfo, UserInfo, UserVote } from "../shared/interfaces";

interface GroomingContextValues {
  roomStatus: keyof typeof ROOM_STATUS;
  setRoomStatus: Function;
  userInfo: UserInfo;
  groomingInfo: GroomingInfo;
  setGroomingInfo: Function;
  userVote: UserVote;
  setUserVote: Function;
}

const GroomingRoomContext = createContext({} as GroomingContextValues);

export function useGroomingRoom() {
  return useContext(GroomingRoomContext);
}

export function GroomingRoomProvider({
  children,
  roomId,
}: GroomingRoomProviderProps) {
  const [roomStatus, setRoomStatus] = useState(ROOM_STATUS.CHECKING);
  const [userInfo, setUserinfo] = useState({} as UserInfo);
  const [groomingInfo, setGroomingInfo] = useState({} as GroomingInfo);
  const [userVote, setUserVote] = useState({} as UserVote);

  useEffect(() => {
    const nickname = localStorage.getItem("nickname");
    const lobby = getCurrentLobby(roomId);

    if (!nickname || !lobby) {
      return;
    }

    setUserinfo({
      nickname,
      lobby,
    });
  }, [roomId]);

  const values = useMemo(
    () => ({
      roomStatus,
      setRoomStatus,
      userInfo,
      groomingInfo,
      setGroomingInfo,
      userVote,
      setUserVote,
    }),
    [
      roomStatus,
      setRoomStatus,
      userInfo,
      groomingInfo,
      setGroomingInfo,
      userVote,
      setUserVote,
    ]
  );
  return (
    <GroomingRoomContext.Provider value={values}>
      {children}
    </GroomingRoomContext.Provider>
  );
}

type GroomingRoomProviderProps = {
  children: ReactNode;
  roomId: string;
};
