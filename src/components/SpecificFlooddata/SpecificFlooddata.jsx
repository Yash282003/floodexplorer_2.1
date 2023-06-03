import { useContext, useState } from "react";
import { VscChromeClose } from "react-icons/vsc";
import "./SpecificFlooddata.css";
import dataContext from "../../context/datacontext";

function SpecificFlooddata({ flooddata }) {
  //   const [show, setShow] = useState(false);

  const { pop, setPop } = useContext(dataContext);

  const { footprint, gsd, epsg_code, item_type } = flooddata;
  return (
    <div>
      {/* {footprint} */}
      {/* <div className={`modal ${pop ? "show" : ""}`}>
        <div className="modal">
          <div className="overlay"></div>

          <div className="modal-inner">
            <div className="topbar">
              <div style={{ fontSize: "24px", fontWeight: "normal" }}>
                Details
              </div>
              <VscChromeClose
                style={{ height: "24px", width: "24px" }}
                onClick={() => setPop(false)}
              />
            </div>
            <div className="main">
              <div className="left">
               
                <div className="detail-container">
                  <div className="detail">
                    <div className="option">Khasra Number</div>
                    <div className="answer">{footprint}</div>
                  </div>
                  <div className="detail">
                    <div className="option">Picutre taken </div>
                    <div className="answer">{gsd}</div>
                  </div>
                  <div className="detail">
                    <div className="option">Aadhar Number</div>
                    <div className="answer">{epsg_code}</div>
                  </div>
                  <div className="detail">
                    <div className="option">Crop cover in Ground </div>
                    <div className="answer">{item_type}</div>
                  </div>
                 
                </div>
              </div>
             
            </div>
          </div>
        </div>
      </div> */}
      lkfmkjgkofm
    </div>
  );
}

export default SpecificFlooddata;
