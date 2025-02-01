import React from 'react';

const vaccinationData = [
  {
    vaccine: 'FMD Vaccine',
    lastVaccinated: '2024-05-12',
    nextVaccination: '2024-11-12',
    frequency: 'Every 6 months',
    weight: 'Stable',
    temperature: 'Slightly Raised',
    production: 'Normal',
  },
  {
    vaccine: 'Brucellosis Vaccine',
    lastVaccinated: '2024-04-20',
    nextVaccination: '2024-10-20',
    frequency: 'Every 8 months',
    weight: 'Stable',
    temperature: 'Normal',
    production: 'Normal',
  },
];

const VaccinationReport = () => {
  const matchingVaccines = vaccinationData;

  const totalVaccines = matchingVaccines.length;
  const stableWeightCount = matchingVaccines.filter((vaccine) => vaccine.weight === 'Stable').length;
  const raisedTemperatureCount = matchingVaccines.filter((vaccine) => vaccine.temperature === 'Slightly Raised').length;
  const normalProductionCount = matchingVaccines.filter((vaccine) => vaccine.production === 'Normal').length;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-6">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-lg overflow-hidden">
        <header className="py-4 px-6">
          <h2 className="text-2xl font-bold text-gray-800">Animal Vaccination Report</h2>
        </header>

        <div className="p-6">
          {/* Vaccine Table */}
          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse text-sm sm:text-base">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="border py-3 px-4 text-left">Animal Type</th>
                  <th className="border py-3 px-4 text-left">Breed</th>
                  <th className="border py-3 px-4 text-left">Age</th>
                  <th className="border py-3 px-4 text-left">Vaccine</th>
                  <th className="border py-3 px-4 text-left">Last Vaccinated</th>
                  <th className="border py-3 px-4 text-left">Next Vaccination</th>
                  <th className="border py-3 px-4 text-left">Frequency</th>
                  <th className="border py-3 px-4 text-center">Weight</th>
                  <th className="border py-3 px-4 text-center">Temperature</th>
                  <th className="border py-3 px-4 text-center">Production</th>
                </tr>
              </thead>
              <tbody>
                {matchingVaccines.map((vaccine, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 transition duration-200"
                  >
                    <td className="border py-2 px-4">Cow</td>
                    <td className="border py-2 px-4">Terai Cattle</td>
                    <td className="border py-2 px-4">10 years</td>
                    <td className="border py-2 px-4">{vaccine.vaccine}</td>
                    <td className="border py-2 px-4">{vaccine.lastVaccinated}</td>
                    <td className="border py-2 px-4">{vaccine.nextVaccination}</td>
                    <td className="border py-2 px-4">{vaccine.frequency}</td>
                    <td className="border py-2 px-4 text-center">{vaccine.weight}</td>
                    <td className="border py-2 px-4 text-center">{vaccine.temperature}</td>
                    <td className="border py-2 px-4 text-center">{vaccine.production}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Section */}
          <div className="p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Summary Report</h3>
            <div className="text-lg space-y-3">
              <p>
                <strong>Total Vaccinations:</strong>{' '}
                <span className="text-blue-600 font-semibold">{totalVaccines}</span>
              </p>
              <p>
                <strong>Weight Status:</strong>{' '}
                <span className="text-green-600">{stableWeightCount} animals with stable weight</span>.
              </p>
              <p>
                <strong>Temperature Status:</strong>{' '}
                <span className="text-orange-600">{raisedTemperatureCount} animals with slightly raised temperature</span>.
              </p>
              <p>
                <strong>Production Status:</strong>{' '}
                <span className="text-blue-600">{normalProductionCount} animals with normal production</span>.
              </p>
            </div>
          </div>

          {/* Upcoming Vaccinations */}
          <div className="mt-8">
            <h4 className="text-xl font-semibold text-gray-800">Upcoming Vaccinations</h4>
            <ul className="mt-4 space-y-2">
              {matchingVaccines.map((vaccine, index) => (
                <li key={index} className="p-4 rounded-lg shadow-sm hover:shadow-md transition">
                  <strong className="text-gray-800">{vaccine.vaccine}</strong> - Next vaccination: 
                  <span className="text-blue-600 font-medium"> {vaccine.nextVaccination}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaccinationReport;
