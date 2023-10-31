"use client";

import { SetStateAction, useEffect, useRef, useState } from "react";

const defaultNickname = () => {
  return (
    (typeof window !== "undefined" &&
      window.localStorage.getItem("nickname")) ||
    ""
  );
};

const NicknameForm = () => {
  const [nickname, setNickname] = useState(defaultNickname);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleNicknameChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setNickname(e.target.value);
  };

  const handleNickNameButtonClick = () => {
    if (nickname.trim() !== "") {
      localStorage.setItem("nickname", nickname.trim());
    }
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
          onClick={handleNickNameButtonClick}
        >
          Create Room
        </button>
      </div>
    </div>
  );
};

export default NicknameForm;