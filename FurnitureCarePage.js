import React from 'react';
import '../products/FurnitureCarePage.css';

const FurnitureCarePage = () => {
  const handleDownload = () => {
    // Trigger download of the product care guide
    const link = document.createElement('a');
    link.href = '/furniturecare.pdf'; // Replace with your actual file path
    link.download = 'furniturecare.pdf';
    link.click();
  };

  return (
    <div className="furniture-care">
      <h1 className="furniture-care-title">Product Care</h1>

      <h3 className="furniture-care-subtitle">Sofas And Chairs</h3>
      <p className="furniture-care-text">
        The Lakshmi furniture is designed and manufactured to exceptionally high standards using superior quality materials. By taking a few simple steps to care for your purchase, you can look forward to many years of comfort and satisfaction.
      </p>
      <p className="furniture-care-text">
        The Lakshmi furniture features premium quality seat interiors for lasting comfort. When your new sofa is delivered, you may find the seat and back cushions look and feel firmer than you expected. This is normal and they will soften over time. Reversible cushions should be turned weekly and their positions swapped around. This will enhance the appearance of your furniture and avoid localized wear and tear.
      </p>

      <h2 className="furniture-care-heading">Cushion Types</h2>
      <h3 className="furniture-care-subtitle">Fibre Seat Cushions</h3>
      <p className="furniture-care-text">
        The sumptuous cushions are made up of QUALLOFIL® FUSION fibre, where the fibres are shaped to prevent them binding together. They have a soft and inviting appearance and should be plumped regularly throughout the week to prevent flattening.
      </p>

      <h3 className="furniture-care-subtitle">Fibre Wrapped Foam Cushions</h3>
      <p className="furniture-care-text">
        These cushions are made up of a premium foam core with a fibre wrap. They offer the same softness as a fibre cushion but with a slightly firmer sit and the ability to retain plumpness over time, as the foam has excellent recovery characteristics.
      </p>

      <h3 className="furniture-care-subtitle">Feather Wrapped Foam Cushions</h3>
      <p className="furniture-care-text">
        These cushions are high-density foam wrapped with a sumptuous duck feather jacket. A medium firmness, they offer the support and resilience of foam but feel like a feather cushion. They require regular plumping to keep them in shape.
      </p>

      <img className="furniture-care-image" src="https://res.cloudinary.com/theloungeco/image/upload/v1549985174/CMS/vacuuming.jpg" alt="Vacuuming furniture" />

      <h2 className="furniture-care-heading">Cleaning Your Furniture</h2>
      <p className="furniture-care-text"><b>Due to the variety of fibres and fabric constructions used, The Lakshmi Furniture recommends you use a specialist upholstery cleaning company for your sofa.</b></p>
      <p className="furniture-care-text">Covers should never be machine washed or dry-cleaned as this can damage the fire retardant treatment, fade colours, and affect the finish of the fabric. Zips are fitted to assist the manufacturing process, and are not intended to make the cover removable for cleaning.</p>

      <h3 className="furniture-care-subtitle">Velvet and Chenille Fabrics</h3>
      <img className="furniture-care-image" src="https://res.cloudinary.com/theloungeco/image/upload/v1615389118/CMS/premiercare_banner.jpg" alt="Velvet and Chenille Fabrics" />
      <p className="furniture-care-text">
        Fabrics with a longer pile, such as velvet and chenille, may show pressure marks and shade variations to the fabric surface through normal use. This appearance is not a fault but a characteristic of these types of fabric, and does not affect durability.
      </p>
      <p className="furniture-care-text">
        These fabrics are soft and inviting to the touch but will flatten in normal use. Vacuuming and brushing the pile in the opposite direction will help maintain their look. A professional cleaner can restore the pile, but it will flatten again through use.
      </p>

      <h3 className="furniture-care-subtitle">Family Friendly Fabrics</h3>
      <p className="furniture-care-text">
        Aquaclean™ Technology is an invisible molecular layer that is built into our Family Friendly fabrics. Unlike protection that gets sprayed on after the sofa is made, the Aquaclean® treatment system covers every single fibre with an invisible molecular coating meaning that dirt is unable to penetrate the fabric’s fibres and will disappear when water is applied.
      </p>
      <img className="furniture-care-image" src="https://res.cloudinary.com/theloungeco/image/upload/w_1140/CMS/Rose_Noah_BW_1920px.jpg" alt="Family Friendly Fabrics" />

      <h2 className="furniture-care-heading">Expert Tips</h2>
      <ul className="furniture-care-list">
        <li>Avoid exposing your sofa to strong sunlight for long periods of time, as this may cause the colour to fade and the fabric or leather to deteriorate.</li>
        <li>Avoid dragging your upholstery, and protect wooden or delicate flooring from possible marking by furniture feet.</li>
        <li>Sitting on the edges of cushions or arms may cause distortion and permanent damage.</li>
        <li>Keep sharp objects and non-colourfast clothes away from your upholstery to avoid snagging or staining.</li>
        <li>Avoid allowing pets to claw or climb on your furniture.</li>
        <li>Regular cleaning with a brush or vacuum will help maintain your fabric sofa’s appearance.</li>
        <li>For leather furniture, dust with a soft brush and wipe with a damp cloth.</li>
      </ul>

      <button onClick={handleDownload} className="download-button">
        Download Our Product Care Guide
      </button>
    </div>
  );
};

export default FurnitureCarePage;
