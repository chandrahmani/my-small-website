import { useEffect, useState } from "react";
import axios from "axios";
import { ActType } from "@/utils/types";

export const Actors = () => {
  const [act, setAct] = useState<ActType[]>([]);
  const [filteredActors, setFilteredActors] = useState<ActType[]>([]);
  const [search, setSearch] = useState<string>("");

  const fetchData = async () => {
    try {
      const { data } = await axios.get("/api/acts");
      console.log(data);
      setAct(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = () => {
    setFilteredActors(
      act.filter(
        (actor) =>
          actor.name.toLowerCase().includes(search.toLowerCase()) ||
          actor.movies.some((movie) =>
            movie.toLowerCase().includes(search.toLowerCase())
          )
      )
    );
  };

  if (!act) return <p>Loading...</p>;

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Actor Directory
          </h1>
          <input
            type="text"
            placeholder="Search by name or movie..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 mb-6 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
            onClick={handleSearch}
          >
            Search
          </button>

          <div className="grid gap-6 md:grid-cols-2">
            {filteredActors.map((actor, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg"
              >
                <h2 className="text-xl font-semibold text-gray-800">
                  {actor.name}
                </h2>
                <img
                  src={actor.image}
                  alt={"Actor"}
                  width={300}
                  height={200}
                  className="w-full h-40 object-cover rounded-lg mt-4"
                />
                <p className="text-gray-600 mt-4">{actor.bio}</p>
                <h3 className="mt-4 font-medium text-gray-800">Movies</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
