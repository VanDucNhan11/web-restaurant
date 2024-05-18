import React from 'react';
import { IonContent, IonIcon } from '@ionic/react';
import { cashOutline, peopleOutline, restaurantOutline } from 'ionicons/icons';

const Reports = () => {
  // Assume you have data for revenue, number of employees, and number of tables
  const revenue = 10000; // Example revenue
  const numEmployees = 20; // Example number of employees
  const numTables = 30; // Example number of tables

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center title-1 title-fon">Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
          <IonIcon icon={cashOutline} className="text-4xl text-green-600 mr-4" />
          <div>
            <h2 className="text-xl font-semibold mb-2">Revenue</h2>
            <p className="text-3xl font-bold">{`$${revenue}`}</p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
          <IonIcon icon={peopleOutline} className="text-4xl text-blue-600 mr-4" />
          <div>
            <h2 className="text-xl font-semibold mb-2">Number of Employees</h2>
            <p className="text-3xl font-bold">{numEmployees}</p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
          <IonIcon icon={restaurantOutline} className="text-4xl text-purple-600 mr-4" />
          <div>
            <h2 className="text-xl font-semibold mb-2">Number of Tables</h2>
            <p className="text-3xl font-bold">{numTables}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;

