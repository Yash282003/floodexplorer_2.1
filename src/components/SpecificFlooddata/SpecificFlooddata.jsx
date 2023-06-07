import { useContext, useEffect, useState } from "react";
import { VscChromeClose } from "react-icons/vsc";
import "./SpecificFlooddata.css";
import dataContext from "../../context/datacontext";
import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";

function SpecificFlooddata({ flooddata }) {
  const { modelArrays,setModelArrays } = useContext(dataContext);
  const handlePop = () => {
    setPop(false);
  };
  useEffect(()=>{
    console.log(modelArrays)
  },[modelArrays])
  const { pop, setPop } = useContext(dataContext);

  console.log(flooddata);
  const { footprint, gsd, epsg_code, item_type } = flooddata;

  const handleFootprintPlotting = (event) => {
    const { value, checked } = event.target;
   
    // Update the state based on checkbox status
    if (checked) {
      setModelArrays((prevSelected) => [...prevSelected, value]);
    } else {
      setModelArrays((prevSelected) =>
        prevSelected.filter((checkboxValue) => checkboxValue !== value)
      );
    }
  };
  return (
    <div className="specificFlooddata_modal">
      <div className="modal_content">
        <VscChromeClose
          style={{ float: "right", fontSize: "25px" }}
          onClick={handlePop}
        />

        <Accordion
          defaultActiveKey="0"
          flush
          style={{ width: "30vw", height: "400px", overflowY: "auto" }}
        >
          {flooddata.map((e) => {
            return (
              <Accordion.Item eventKey={e.field1}>
                <Accordion.Header>{e.item_type}</Accordion.Header>
                <Accordion.Body>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Sl no.</th>
                        <th>Field name</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Latitude</td>
                        <td>{e.Latitude}</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Longitude</td>
                        <td>{e.Longitude}</td>
                      </tr>
                      <tr>
                        <td>3</td>  
                        <td>footprint</td>
                        <td><input type="checkbox" onClick={(e)=>handleFootprintPlotting(e)} value={e.footprint}/>{e.footprint}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}

export default SpecificFlooddata;
