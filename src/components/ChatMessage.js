const ChatMessage = ({ name, message }) => {
  return (
    <div>
      <div className="flex">
        <img
          className="w-12 h-12"
          alt="user"
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
        />
        <span>{name}</span>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default ChatMessage;
