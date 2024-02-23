import React from "react";
import { Col, Row, Table, Form } from "react-bootstrap";
import diagram from "../../../assets/Image/Diagram.png";
import "./style.scss";
import $ from 'jquery';
import { useEffect } from "react";
export const LPlanMapDiagram = (props) => {
  const { colum, row, questionsNo } = props;
  const [status, setStatus] = React.useState("");
  const [stateRowNo, setStateRowNo] = React.useState([]);

  const handleCheck = (id, RowNo) => {
    setStatus(id);
    // setStateRowNo([...stateRowNo, RowNo]);
  };
  
  
  
  
  return (
    <div className="listeing-plan-map-diagram">
      <Row>
        <Col sm={12} md={12} lg={6} xl={6}>
          <img src={diagram} alt="diagram" />
        </Col>
        <Col sm={12} md={12} lg={6} xl={6}>
          <Table striped bordered hover className="mt-5">
            <thead>
              <tr>
                {row?.map((items, i) => {
                  return <th key={i}>{items}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {colum?.map((items, i) => {
                return (
                  <tr id={`main-${i}`} key={i} className="main-tr-waper">
                    <td>
                      {questionsNo + i}. {items}
                    </td>
                    <td
                      className="td-content"
                      onClick={() => handleCheck(questionsNo + i + "A", i)}
                    >
                      {/* {status === questionsNo + i + "A" && "✓"} */}
                    </td>
                    <td
                      className="td-content"
                      onClick={() => handleCheck(questionsNo + i + "B")}
                    >
                      {/* {status === questionsNo + i + "B" && "✓"} */}
                    </td>
                    <td
                      className="td-content"
                      onClick={() => handleCheck(questionsNo + i + "C")}
                    >
                      {/* {status === questionsNo + i + "C" && "✓"} */}
                    </td>
                    <td
                      className="td-content"
                      onClick={() => handleCheck(questionsNo + i + "D")}
                    >
                      {/* {status === questionsNo + i + "D" && "✓"} */}
                    </td>
                    <td
                      className="td-content"
                      onClick={() => handleCheck(questionsNo + i + "E")}
                    >
                      {/* {status === questionsNo + i + "E" && "✓"} */}
                    </td>
                    <td
                      className="td-content"
                      onClick={() => handleCheck(questionsNo + i + "F")}
                    >
                      {/* {status === questionsNo + i + "F" && "✓"} */}
                    </td>
                    <td
                      className="td-content"
                      onClick={() => handleCheck(questionsNo + i + "G")}
                    >
                      {/* {status === questionsNo + i + "G" && "✓"} */}
                    </td>
                    <td
                      className="td-content"
                      onClick={() => handleCheck(questionsNo + i + "H")}
                    >
                      {/* {status === questionsNo + i + "H" && "✓"} */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};
