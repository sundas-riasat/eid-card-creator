// File: components/CardPreview.js

const CardPreview = ({ card }) => {
  if (!card) return null;

  const cardStyle = {
    backgroundColor: card.backgroundColor,
  };

  const titleStyle = {
    fontFamily: card.titleStyle?.fontFamily || "Arial",
    fontSize: card.titleStyle?.fontSize || "2rem",
    color: card.titleStyle?.color || "#ffffff",
  };

  const greetingStyle = {
    fontFamily: card.greetingStyle?.fontFamily || "Arial",
    fontSize: card.greetingStyle?.fontSize || "1.5rem",
    color: card.greetingStyle?.color || "#ffffff",
    marginBottom: "1rem",
  };

  const messageStyle = {
    fontFamily: card.messageStyle?.fontFamily || "Arial",
    fontSize: card.messageStyle?.fontSize || "1rem",
    color: card.messageStyle?.color || "#ffffff",
    marginBottom: "1.5rem",
  };

  const signatureStyle = {
    fontFamily: card.signatureStyle?.fontFamily || "Arial",
    fontSize: card.signatureStyle?.fontSize || "1.25rem",
    color: card.signatureStyle?.color || "#ffffff",
    textAlign: "right",
  };

  // Function to convert newlines to <br> tags
  const formatText = (text) => {
    return text?.split("\n").map((line, i) => (
      <span key={i}>
        {line}
        {i !== text.split("\n").length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div
      id="card-preview"
      className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-lg overflow-hidden shadow-lg"
      style={cardStyle}
    >
      <img
        src={card.imageUrl}
        alt="Card background"
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />

      <div className="absolute inset-0 flex flex-col p-6 overflow-auto">
        <div className="text-center mb-4">
          <h2 className="font-bold drop-shadow-md" style={titleStyle}>
            {card.titleStyle?.text || "Eid Mubarak"}
          </h2>
        </div>

        <div className="mt-2 flex-grow flex flex-col justify-between">
          <div>
            <div style={greetingStyle}>{formatText(card.greeting)}</div>

            <div style={messageStyle}>{formatText(card.message)}</div>
          </div>

          <div style={signatureStyle}>{formatText(card.signature)}</div>
        </div>
      </div>
    </div>
  );
};

export default CardPreview;
