import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserAnimalById } from "../api/Add";
let API = "http://localhost:5000/api";

const VaccinationReport = () => {
  const [vaccinationData, setVaccinationData] = useState([]);
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const animalType = 'cow';  // This could come from a state or user input
  // const age = 1;
  const currentDate = new Date();
  let { id } = useParams();

  const animalDetail = () => {
    setLoading(true);
    getUserAnimalById(id).then((data) => {
      if (data?.error) {
        console.log(data.error);
        setError(data.error);
      } else {
        setAnimal(data);
        // console.log("data", data);
      }
      setLoading(false);
    });
  };

  const fetchVaccinationData = async (animalType,age) => {
    // console.log("type",animalType)
    // console.log("age",age)
    try {
      const response = await fetch(
        `${API}/vaccine/recommend?animal_type=${animalType}&age=${age}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch vaccination data");
      }
      const data = await response.json();
      // console.log(data)
      setVaccinationData(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    animalDetail(); // Fetch animal details on mount
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      if (animal) {
        console.log(animal?.animal_type?.animal_type)
        if (animal?.animal_type?.animal_type && animal?.age) {
          await fetchVaccinationData(animal.animal_type.animal_type, animal.age);
        } else {
          setError("Incomplete animal details for fetching vaccination data.");
        }
      }
    };

    fetchData();
  }, [animal]);

  if (loading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">Error: {error}</p>;
  }

  // const totalVaccines = vaccinationData.length;
  // const stableWeightCount = vaccinationData.filter(
  //   (vaccine) => vaccine.weight === "Stable"
  // ).length;
  // const raisedTemperatureCount = vaccinationData.filter(
  //   (vaccine) => vaccine.temperature === "Slightly Raised"
  // ).length;
  // const normalProductionCount = vaccinationData.filter(
  //   (vaccine) => vaccine.production === "Normal"
  // ).length;

  return (
    <div className="min-h-[85vh] bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
          Vaccine Report
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm sm:text-base bg-white rounded-lg shadow-md">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="border py-3 px-4 text-left">Vaccine</th>
                <th className="border py-3 px-4 text-left">Vaccination Date</th>
                <th className="border py-3 px-4 text-left">Completed</th>
              </tr>
            </thead>
            <tbody>
              {vaccinationData.map((vaccine, index) => {
                const nextVaccinationDate = new Date(
                  vaccine.next_vaccination_date
                );
                const vaccinationStatus =
                  nextVaccinationDate < currentDate ? "Completed" : "Due";
                return (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 transition duration-200 ease-in-out"
                  >
                    <td className="border py-2 px-4">{vaccine.vaccine_name}</td>
                    <td className="border py-2 px-4">
                      {vaccine.next_vaccination_date}
                    </td>
                    <td className="border py-2 px-4">
                      <Link to="/vaccinenoti">{vaccinationStatus}</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* <div className="mt-4 p-4 bg-blue-400 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-white text-center">
            Summary Report
          </h3>
          <div className="flex flex-col items-start">
            <p className="text-lg mb-2 text-white">Total Number of Vaccinations: <span className="font-bold">{totalVaccines}</span></p>
            <p className="text-lg mb-2 text-white">
              Weight Status:{" "}
              <span className="font-bold">2 animals with stable weight</span>.
            </p>
            <p className="text-lg mb-2 text-white">
              Temperature Status:{" "}
              <span className="font-bold">
                1 animal with a slight raise in temperature
              </span>
              .
            </p>
            <p className="text-lg mb-4 text-white">
              Production Status:{" "}
              <span className="font-bold">
                2 animals with normal milk production
              </span>
              .
            </p>
          </div>
        </div>

        Conclusion Section
        <div className="mt-6 p-2 bg-blue-500 rounded-lg shadow-lg text-center text-white">
          <p className="text-lg font-semibold">
            Conclusion: Your animal is healthy and well-maintained. Continue to
            monitor their health and ensure timely vaccinations.
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default VaccinationReport;
