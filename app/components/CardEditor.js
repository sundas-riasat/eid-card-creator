// File: components/CardEditor.js
import { useState } from "react";

const CardEditor = ({ card, onUpdateCard }) => {
  const [customImage, setCustomImage] = useState(null);

  const fontFamilies = [
    "Arial",
    "Roboto",
    "Montserrat",
    "Cairo",
    "Lato",
    "Poppins",
    "Open Sans",
    "Quicksand",
    "Raleway",
    "Playfair Display",
    "Caveat",
    "Pacifico",
    "Shadows Into Light",
  ];

  const fontSizes = [
    "0.75rem",
    "1rem",
    "1.25rem",
    "1.5rem",
    "1.75rem",
    "2rem",
    "2.25rem",
    "2.5rem",
  ];

  const colors = [
    "#ffffff",
    "#212121",
    "#000000",
    "#4CAF50",
    "#2196F3",
    "#9C27B0",
    "#FF5722",
    "#FFC107",
    "#3F51B5",
    "#E91E63",
  ];

  const backgroundColors = [
    "#4CAF50",
    "#FFC107",
    "#2196F3",
    "#9C27B0",
    "#E0E0E0",
    "#FF5722",
    "#FFEB3B",
    "#673AB7",
    "#3F51B5",
    "#FFD700",
  ];

  const handleTextChange = (field, value) => {
    if (field === "title") {
      onUpdateCard({
        titleStyle: { ...card.titleStyle, text: value },
      });
    } else {
      onUpdateCard({ [field]: value });
    }
  };

  const handleStyleChange = (field, property, value) => {
    onUpdateCard({
      [`${field}Style`]: {
        ...card[`${field}Style`],
        [property]: value,
      },
    });
  };

  const handleBgColorChange = (color) => {
    onUpdateCard({ backgroundColor: color });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomImage(reader.result);
        onUpdateCard({ imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Customize Your Card</h2>

      <div className="space-y-8">
        {/* Title Section */}
        <div className="p-4 border rounded-md">
          <h3 className="font-medium text-lg mb-3">Title</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1 text-sm">Text</label>
              <textarea
                value={card.titleStyle.text}
                onChange={(e) => handleTextChange("title", e.target.value)}
                className="w-full p-2 border rounded focus:ring focus:ring-emerald-200 focus:border-emerald-500"
                rows="2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 mb-1 text-sm">Font</label>
                <select
                  value={card.titleStyle.fontFamily}
                  onChange={(e) =>
                    handleStyleChange("title", "fontFamily", e.target.value)
                  }
                  className="w-full p-2 border rounded focus:ring focus:ring-emerald-200 focus:border-emerald-500"
                >
                  {fontFamilies.map((font) => (
                    <option key={font} value={font}>
                      {font}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-1 text-sm">Size</label>
                <select
                  value={card.titleStyle.fontSize}
                  onChange={(e) =>
                    handleStyleChange("title", "fontSize", e.target.value)
                  }
                  className="w-full p-2 border rounded focus:ring focus:ring-emerald-200 focus:border-emerald-500"
                >
                  {fontSizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-1 text-sm">
                  Color
                </label>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleStyleChange("title", "color", color)}
                      className={`w-6 h-6 rounded-full border ${
                        card.titleStyle.color === color
                          ? "border-black"
                          : "border-gray-200"
                      }`}
                      style={{ backgroundColor: color }}
                      aria-label={`Color ${color}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Greeting Section */}
        <div className="p-4 border rounded-md">
          <h3 className="font-medium text-lg mb-3">Greeting</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1 text-sm">Text</label>
              <textarea
                value={card.greeting}
                onChange={(e) => handleTextChange("greeting", e.target.value)}
                className="w-full p-2 border rounded focus:ring focus:ring-emerald-200 focus:border-emerald-500"
                rows="2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 mb-1 text-sm">Font</label>
                <select
                  value={card.greetingStyle.fontFamily}
                  onChange={(e) =>
                    handleStyleChange("greeting", "fontFamily", e.target.value)
                  }
                  className="w-full p-2 border rounded focus:ring focus:ring-emerald-200 focus:border-emerald-500"
                >
                  {fontFamilies.map((font) => (
                    <option key={font} value={font}>
                      {font}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-1 text-sm">Size</label>
                <select
                  value={card.greetingStyle.fontSize}
                  onChange={(e) =>
                    handleStyleChange("greeting", "fontSize", e.target.value)
                  }
                  className="w-full p-2 border rounded focus:ring focus:ring-emerald-200 focus:border-emerald-500"
                >
                  {fontSizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-1 text-sm">
                  Color
                </label>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() =>
                        handleStyleChange("greeting", "color", color)
                      }
                      className={`w-6 h-6 rounded-full border ${
                        card.greetingStyle.color === color
                          ? "border-black"
                          : "border-gray-200"
                      }`}
                      style={{ backgroundColor: color }}
                      aria-label={`Color ${color}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message Section */}
        <div className="p-4 border rounded-md">
          <h3 className="font-medium text-lg mb-3">Message</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1 text-sm">Text</label>
              <textarea
                value={card.message}
                onChange={(e) => handleTextChange("message", e.target.value)}
                className="w-full p-2 border rounded focus:ring focus:ring-emerald-200 focus:border-emerald-500"
                rows="3"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 mb-1 text-sm">Font</label>
                <select
                  value={card.messageStyle.fontFamily}
                  onChange={(e) =>
                    handleStyleChange("message", "fontFamily", e.target.value)
                  }
                  className="w-full p-2 border rounded focus:ring focus:ring-emerald-200 focus:border-emerald-500"
                >
                  {fontFamilies.map((font) => (
                    <option key={font} value={font}>
                      {font}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-1 text-sm">Size</label>
                <select
                  value={card.messageStyle.fontSize}
                  onChange={(e) =>
                    handleStyleChange("message", "fontSize", e.target.value)
                  }
                  className="w-full p-2 border rounded focus:ring focus:ring-emerald-200 focus:border-emerald-500"
                >
                  {fontSizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-1 text-sm">
                  Color
                </label>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() =>
                        handleStyleChange("message", "color", color)
                      }
                      className={`w-6 h-6 rounded-full border ${
                        card.messageStyle.color === color
                          ? "border-black"
                          : "border-gray-200"
                      }`}
                      style={{ backgroundColor: color }}
                      aria-label={`Color ${color}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Signature Section */}
        <div className="p-4 border rounded-md">
          <h3 className="font-medium text-lg mb-3">Signature</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1 text-sm">Text</label>
              <textarea
                value={card.signature}
                onChange={(e) => handleTextChange("signature", e.target.value)}
                className="w-full p-2 border rounded focus:ring focus:ring-emerald-200 focus:border-emerald-500"
                rows="2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 mb-1 text-sm">Font</label>
                <select
                  value={card.signatureStyle.fontFamily}
                  onChange={(e) =>
                    handleStyleChange("signature", "fontFamily", e.target.value)
                  }
                  className="w-full p-2 border rounded focus:ring focus:ring-emerald-200 focus:border-emerald-500"
                >
                  {fontFamilies.map((font) => (
                    <option key={font} value={font}>
                      {font}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-1 text-sm">Size</label>
                <select
                  value={card.signatureStyle.fontSize}
                  onChange={(e) =>
                    handleStyleChange("signature", "fontSize", e.target.value)
                  }
                  className="w-full p-2 border rounded focus:ring focus:ring-emerald-200 focus:border-emerald-500"
                >
                  {fontSizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-1 text-sm">
                  Color
                </label>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() =>
                        handleStyleChange("signature", "color", color)
                      }
                      className={`w-6 h-6 rounded-full border ${
                        card.signatureStyle.color === color
                          ? "border-black"
                          : "border-gray-200"
                      }`}
                      style={{ backgroundColor: color }}
                      aria-label={`Color ${color}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background and Image */}
        <div className="p-4 border rounded-md">
          <h3 className="font-medium text-lg mb-3">Card Background</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">
                Background Color
              </label>
              <div className="flex flex-wrap gap-2">
                {backgroundColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleBgColorChange(color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      card.backgroundColor === color
                        ? "border-black"
                        : "border-gray-200"
                    }`}
                    style={{ backgroundColor: color }}
                    aria-label={`Background color ${color}`}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Background Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border rounded focus:ring focus:ring-emerald-200 focus:border-emerald-500"
              />
              {customImage && (
                <div className="mt-2">
                  <img
                    src={customImage}
                    alt="Custom"
                    className="h-32 object-contain"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardEditor;
