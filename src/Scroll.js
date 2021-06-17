import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Scroll = () => {
    
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <div className="content">
      <div className="grids">
        <div className="boxes">1</div>
        <div className="boxes">2</div>
        <div data-aos="fade-right" className="boxes">
          4
        </div>
        <div data-aos="fade-left" className="boxes">
          5
        </div>
        <div data-aos="fade-down-right" className="boxes">
          7
        </div>
      </div>
    </div>
    // <div 
    // data-aos="fade-right"
    // id="transDiv"
    // >
    //   5
    // </div>
  );
};

export default Scroll;
