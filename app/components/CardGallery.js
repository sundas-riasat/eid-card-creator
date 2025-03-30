// File: components/CardGallery.js

const CardGallery = ({ templates, onSelectTemplate }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Choose a Template
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onSelectTemplate(template)}
          >
            <img
              src={template.imageUrl}
              alt={template.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-medium text-gray-800">{template.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardGallery;
