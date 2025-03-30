const Card = ({ user }) => {
  const { firstName, lastName, age, gender, about, photoUrl } = user;

  return (
    <div className="w-72 bg-purple-900 h-fit rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
      {/* Image Section */}
      <figure className="px-6 pt-6">
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className="w-full h-56 object-cover rounded-xl shadow-md"
        />
      </figure>

      {/* Card Body Section */}
      <div className="card-body text-center p-6">
        {/* User's Name */}
        <h2 className="text-2xl font-semibold text-white mb-2">
          {firstName} {lastName}
        </h2>

        {/* User's Age and Gender (if available) */}
        <p className="text-gray-300 text-sm">
          {age && `Age: ${age}`} {gender && ` | Gender: ${gender}`}
        </p>

        {/* About Section */}
        <p className="text-gray-300 mb-4 text-sm">
          {about || "No additional information provided."}
        </p>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button className="btn btn-outline btn-secondary text-white hover:bg-purple-800 transition-all duration-300">
            Ignore
          </button>
          <button className="btn btn-outline btn-accent text-white hover:bg-purple-800 transition-all duration-300">
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
