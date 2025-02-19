import React from 'react';
import '../products/Heater.css';

const Heater = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/path/to/Heater-Maintenance-Guide.pdf'; // Replace with actual file path
    link.download = 'Heater_Maintenance_Guide.pdf';
    link.click();
  };

  return (
    <div className="heater-maintenance">
      <h1>Electric Water Heater Maintenance Tips</h1>
      
      <p>
        Maintaining your electric water heater is crucial for efficiency and longevity. Here are some essential tips to keep your unit running smoothly.
      </p>
      <img src='https://maintainiq.com/wp-content/uploads/2023/06/Steps-for-Preventive-Maintenance-of-Commercial-Water-Heaters.jpg' alt='Heater Maintenance' />

   

      <h2>Maintenance Tips</h2>
      <ul>
        <li>
          <h3>Check the Anode Rod</h3>
          <p>The anode rod protects the tank from corrosion. Check it regularly as part of your maintenance routine.</p>
        </li>
        <li>
          <h3>Adjust the Temperature</h3>
          <p>Lowering the temperature can help save on energy bills. Aim for around 120°F (49°C).</p>
        </li>
        <li>
          <h3>Insulate the Tank and Pipes</h3>
          <p>Insulating your water heater and pipes prevents heat loss and reduces energy consumption.</p>
        </li>
        <li>
          <h3>Test the Temperature Pressure Relief (TPR) Valve</h3>
          <p>This safety feature releases pressure if the water gets too hot. Test it every 6 to 12 months.</p>
        </li>
        <li>
          <h3>Drain the Tank</h3>
          <p>Draining the tank removes sediment that can reduce efficiency. Do this once a year.</p>
        </li>
        <img src='https://www.harpcanhelpyou.com/wp-content/uploads/2023/10/how-long-do-water-heaters-last-scaled.jpg' alt='Heater Maintenance' />

        <li>
          <h3>Flush the Tank</h3>
          <p>Flushing removes sediment and mineral deposits. Manufacturers recommend doing this at least once a year.</p>
        </li>
        <li>
          <h3>Check for Leaks</h3>
          <p>Leaks can cause significant damage, so check your water heater regularly for any signs of leaking.</p>
        </li>
        <li>
          <h3>Turn Off the Cold Water Supply</h3>
          <p>If you're away for a while, turning off the power and cold water supply can save electricity and prevent leaks.</p>
        </li>
      </ul>

      <img src='https://aosmith.noesis.dev/wp-content/uploads/2023/04/WH-Maintanance-main-banner.jpg' alt='Anode Rod' />
        <button onClick={handleDownload} className="download-button">
        Download Our Heater Maintenance Guide
      </button>
    </div>
  );
};

export default Heater;
