import { useContext, useEffect, useState } from "react";
import { VscChromeClose } from "react-icons/vsc";
import "./SpecificFlooddata.css";
import dataContext from "../../context/datacontext";
import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";
import Draggable from "react-draggable";

function SpecificFlooddata({ flooddata }) {
  const { modelArrays, setModelArrays } = useContext(dataContext);
  const { pop,setPop } = useContext(dataContext);
  const handlePop = () => {
    setPop(false);
  };

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
    <Draggable handle=".modal_drag_handle">
      <div className="specificFlooddata_modal">
        <div className="modal_content">
          <div className="modal_drag_handle">
            <Accordion
              defaultActiveKey="0"
              flush
              style={{ width: "45vw", height: "400px", overflowY: "auto" }}
            >
              <VscChromeClose
                style={{ float: "right", fontSize: "25px" }}
                onClick={handlePop}
              />
              {flooddata.map((e) => {
                return (
                  <Accordion.Item eventKey={e.field1}>
                    <Accordion.Header>{e.title}</Accordion.Header>
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
                            <td>
                              <input
                                type="checkbox"
                                onClick={(e) => handleFootprintPlotting(e)}
                                value={e.footprint}
                              />
                              {e.footprint}
                            </td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>Complete geojson geometry</td>
                            <td>{e.complete_geojson_geometry}</td>
                          </tr>
                          <tr>
                            <td>5</td>
                            <td>Epsg code</td>
                            <td>{e.epsg_code}</td>
                          </tr>
                          <tr>
                            <td>6</td>
                            <td>Satellite Id</td>
                            <td>{e.satellite_id}</td>
                          </tr>
                          <tr>
                            <td>7</td>
                            <td>Sun azimuth</td>
                            <td>{e.sun_azimuth}</td>
                          </tr>
                          <tr>
                            <td>8</td>
                            <td>Sun elevation</td>
                            <td>{e.sun_elevation}</td>
                          </tr>
                          <tr>
                            <td>9</td>
                            <td>Updated</td>
                            <td>{e.updated}</td>
                          </tr>
                          <tr>
                            <td>10</td>
                            <td>View angle</td>
                            <td>{e.view_angle}</td>
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
      </div>
    </Draggable>
  );
}

export default SpecificFlooddata;