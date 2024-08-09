import Image from "next/image";
import './popup.scss';

export default function Popup({ category, subclass, image, title, brandsName, brandsMasthead, brandsDescription, brandsThumbnail, brandsTags, onClose }){
  const handleClose = (event) => {
    event.stopPropagation();
    onClose();
  };  
  return (
      <div className="popup_wrapper" onClick={(e) => e.stopPropagation()}>
        {category === 'brands' && (
          <div className="popup_box">
            <h2>{brandsName}</h2>
            <Image src={brandsMasthead} alt={brandsName} width={960} height={480} />
            <p>{brandsDescription}</p>
            <div className="thumbnails">
              {brandsThumbnail.map((src, index) => (
                <Image key={index} src={src} alt={`Thumbnail ${index}`} width={300} height={150} />
              ))}
            </div>
            <div className="tags">
              {brandsTags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
            <button onClick={handleClose} className="close-btn">Close</button>
          </div>
        )}
        {category === 'balloon' && (
        <div className={`popup_box ${subclass}`}>
          <div className="bubble_box">
            <div dangerouslySetInnerHTML={{ __html: title }} ></div>
            <div dangerouslySetInnerHTML={{ __html: brandsDescription }} ></div>
          </div>
          <Image src={image} alt={title} width={960} height={960} quality={100}/>
          <button onClick={handleClose} className="close-btn">Close</button>
        </div>
      )}
      {category === 'sirine' && (
        <div className="popup_box">
          <p>Information specific to sirine category.</p>
        </div>
      )}
      </div>
    );
  };