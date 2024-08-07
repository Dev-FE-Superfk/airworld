import Image from "next/image";
import './popup.scss';

export default function Popup({ buildingName, buildingMasthead, buildingDescription, buildingThumbnail, buildingTags, onClose }){
  const handleClose = (event) => {
    event.stopPropagation();
    onClose();
  };  
  return (
      <div className="popup_wrapper" onClick={(e) => e.stopPropagation()}>
        <div className="popup_box">
          <h2>{buildingName}</h2>
          <Image src={buildingMasthead} alt={buildingName} width={960} height={480} />
          <p>{buildingDescription}</p>
          <div className="thumbnails">
            {buildingThumbnail.map((src, index) => (
              <Image key={index} src={src} alt={`Thumbnail ${index}`} width={300} height={150} />
            ))}
          </div>
          <div className="tags">
            {buildingTags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
          <button onClick={handleClose} className="close-btn">Close</button>
        </div>
      </div>
    );
  };