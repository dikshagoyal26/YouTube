import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { generateRandomNames, makeRandomMessage } from "../utils/helper";
import ChatMessage from "./ChatMessage";

const LiveChat = () => {
  const [liveMessage, setLiveMessage] = useState("");
  const dispatch = useDispatch();
  const chatMessages = useSelector((state) => state.chat.messages);
  console.log({ chatMessages });
  useEffect(() => {
    const interval = setInterval(() => {
      pollMessages();
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const pollMessages = () => {
    console.log("Polling");
    dispatch(
      addMessage({
        name: generateRandomNames(),
        message: makeRandomMessage(20),
      })
    );
  };

  return (
    <>
      <div className="w-full h-[600px] wl-2 p-2 border border-black bg-plate-200 rounded-lg overflow-y-scroll flex-col-reverse flex">
        <div>
          {chatMessages.map((message) => (
            <ChatMessage name={message.name} message={message.message} />
          ))}
        </div>
      </div>
      <form
        className="w-full p-2 ml-2"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          value={liveMessage}
          onChange={(e) => setLiveMessage(e.target.value)}
          type={"text"}
          className="border border-black w-96 p-1"
        />
        <button
          className="p-1 mx-2 bg-green-200 "
          onClick={() => {
            dispatch(
              addMessage({
                name: "You",
                message: liveMessage,
              })
            );
            setLiveMessage("");
          }}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default LiveChat;
