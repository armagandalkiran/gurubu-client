import axios from "axios";

export class RoomService {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async createRoom(payload: CreateRoomPayload) {
    const url = `${this.baseUrl}/room/create`;

    try {
      const response = await axios.post(url, payload);
      return { isSuccess: true };
    } catch (e) {
      return { isSuccess: false };
    }
  }

  async getRoom(id: string) {
    const url = `${this.baseUrl}/room/${id}`;
    try {
      const response = await axios.get(url);
      return { isSuccess: true };
    } catch (e) {
      return { isSuccess: false };
    }
  }
}

interface CreateRoomPayload {
  nickName: string;
}
