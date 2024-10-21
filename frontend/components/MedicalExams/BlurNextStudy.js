import BlurContainer from "../UI/BlurContainer";
import ScheduleNextStudy from "./ScheduleNextStudy";
import GluttyModal from "../UI/GluttyModal";
import CancelNextStudy from "./CancelNextStudy";
import { useState } from "react";

export default function BlurNextStudy({ visible, onDismiss, time, getData }) {
  const hasNextStudy = time != undefined;

  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState(false);
  const [isError, setIsError] = useState(false);

  function closeModalHandler() {
    setShowModal(false);
    setIsError(false);
    setMessage("");
    getData();
  }

  function openModal(message, isError) {
    setIsError(isError);
    setMessage(message);
    setShowModal(true);
  }

  return (
    <>
      <BlurContainer visible={visible} onDismiss={onDismiss}>
        {hasNextStudy ? (
          <CancelNextStudy
            onDismiss={onDismiss}
            time={time}
            showModal={openModal}
          />
        ) : (
          <ScheduleNextStudy
            onDismiss={onDismiss}
            time={time}
            showModal={openModal}
          />
        )}
      </BlurContainer>
      <GluttyModal
        visible={showModal}
        message={message}
        isError={isError}
        onClose={closeModalHandler}
      />
    </>
  );
}
