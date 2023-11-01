"use client";
import { useEffect } from "react";
import { notFound } from "next/navigation";
import ConnectingInfo from "../../components/room/connecting-info";
import "../../styles/room/style.scss";

const GroomingRoom = ({ params }: { params: { id: string } }) => {
  return (
    <main className="grooming-room">
      <ConnectingInfo roomId={params.id} />
    </main>
  );
};

export default GroomingRoom;
