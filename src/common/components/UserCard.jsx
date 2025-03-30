const UserInfoCard = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {data?.data?.map((user) => {
        const { firstName, lastName, age, gender, about, photoUrl } = user;
        const capitalize = (str) =>
          str ? str[0].toUpperCase() + str.slice(1) : "";
        return (
          <div
            key={user._id}
            className="bg-purple-700 text-white shadow-lg rounded-2xl p-5 w-full max-w-sm"
          >
            <div className="flex flex-col items-center">
              <img
                src={photoUrl || "/default-avatar.png"}
                alt={firstName}
                className="w-24 h-24 rounded-full border-2 border-gray-300"
              />
              <h2 className="mt-4 text-lg font-semibold">
                {capitalize(firstName)} {capitalize(lastName)}
              </h2>
              <p className="text-sm text-gray-200">
                {capitalize(gender)}, {age} years old
              </p>
              <p className="text-sm text-gray-300 mt-2">
                {about || "No information provided"}
              </p>
              <div className="mt-4 flex gap-3">
                <button className="btn btn-primary rounded-lg">
                  Ignore
                </button>
                <button className="btn btn-secondary rounded-lg">
                  Connect
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserInfoCard;
