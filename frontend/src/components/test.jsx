import React, { useState, useEffect } from 'react';
import axios from 'axios';



  {/* <div className="flex flex-row  items-center  mb-6 md:mb-0">
          <img src="logo.png" className="w-16 h-16 mr-2" alt="Vet Vitals Logo" />
          <h1 className="text-2xl font-bold text-blue-500">Vet Vitals</h1>
      
          
          </div>
        */}

const App = () => {


  const [animals, setAnimals] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [newHealthRecord, setNewHealthRecord] = useState({
    illness: '',
    symptoms: '',
    severity: '',
    treatment: '',
    prevention: '',
    nextVaccination: ''
  });

  useEffect(() => {
    // Fetch all animals
    axios.get('http://localhost:8000/api/animals')
      .then(response => setAnimals(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleSelectAnimal = (animalId) => {
    setSelectedAnimal(animalId);
    // Fetch health records for the selected animal
    axios.get(`http://localhost:8000/api/animals/${animalId}/healthRecords`)
      .then(response => console.log(response.data))
      .catch(error => console.log(error));
  };

  const handleSubmitRecord = (e) => {
    e.preventDefault();
    const { illness, symptoms, severity, treatment, prevention, nextVaccination } = newHealthRecord;
    axios.post(`http://localhost:8000/api/animals/${selectedAnimal}/healthRecords`, {
      illness,
      symptoms: symptoms.split(','),
      severity,
      treatment,
      prevention,
      nextVaccination
    })
    .then(response => {
      console.log('Health record added', response.data);
      setNewHealthRecord({
        illness: '',
        symptoms: '',
        severity: '',
        treatment: '',
        prevention: '',
        nextVaccination: ''
      });
    })
    .catch(error => console.log(error));
  };

  return (
    <div>
      <h1>Animal Health Tracking App</h1>
      <div>
        <h2>Animals</h2>
        <ul>
          {animals.map(animal => (
            <li key={animal._id} onClick={() => handleSelectAnimal(animal._id)}>
              {animal.name} ({animal.type})
            </li>
          ))}
        </ul>
      </div>

      {selectedAnimal && (
        <div>
          <h3>Add Health Record</h3>
          <form onSubmit={handleSubmitRecord}>
            <input type="text" placeholder="Illness" value={newHealthRecord.illness} onChange={(e) => setNewHealthRecord({ ...newHealthRecord, illness: e.target.value })} required />
            <input type="text" placeholder="Symptoms" value={newHealthRecord.symptoms} onChange={(e) => setNewHealthRecord({ ...newHealthRecord, symptoms: e.target.value })} required />
            <input type="text" placeholder="Severity" value={newHealthRecord.severity} onChange={(e) => setNewHealthRecord({ ...newHealthRecord, severity: e.target.value })} required />
            <input type="text" placeholder="Treatment" value={newHealthRecord.treatment} onChange={(e) => setNewHealthRecord({ ...newHealthRecord, treatment: e.target.value })} required />
            <input type="text" placeholder="Prevention" value={newHealthRecord.prevention} onChange={(e) => setNewHealthRecord({ ...newHealthRecord, prevention: e.target.value })} required />
            <input type="date" placeholder="Next Vaccination Date" value={newHealthRecord.nextVaccination} onChange={(e) => setNewHealthRecord({ ...newHealthRecord, nextVaccination: e.target.value })} />
            <button type="submit">Add Record</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
