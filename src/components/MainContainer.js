import React from "react";
import ButtonList from "./ButtonList";
import VideoContent from "./VideoContent";

const MainContainer = () => {
  return (
    <div className="flex flex-col">
      <ButtonList />
      <VideoContent />
    </div>
  );
};

export default MainContainer;
