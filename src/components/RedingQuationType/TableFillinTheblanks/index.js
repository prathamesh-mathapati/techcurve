import React from "react";
import "./style.scss";
import { Table } from "react-bootstrap";

const TableFillinTheblanks = (props) => {
  const {
    questionsTo,
    interaction,
    questionsNo,
    selectedIndex,
    setSelectedIndex,
  } = props;

  const handleInput = (index) => {
    setSelectedIndex(index);
  };
  return (
    <div className="tablefillintheblanks-question-type">
      <p className="tablefillintheblanks-question-total">{questionsTo}</p>
      <p className="question-choose-titel">{interaction}</p>
      <Table>
        <thead>
          <tr>
            <th>Place</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Anthropologists </td>
            <td>sometimes </td>
            <td>cessary for survival</td>
            <td>
              hat the problem of stress caused by working too many hours still
              doesn’t receive sufficient recognition and ought
              <input
                placeholder={questionsNo !== selectedIndex && questionsNo}
                onClick={(e) => handleInput(questionsNo)}
                className={`${questionsNo === selectedIndex && "table-input"}`}
              />
            </td>
          </tr>
          <tr>
            <td>Perhaps </td>
            <td>
              frequently
              <input
                placeholder={
                  questionsNo + 1 !== selectedIndex && questionsNo + 1
                }
                onClick={(e) => handleInput(questionsNo + 1)}
                className={`${
                  questionsNo + 1 === selectedIndex && "table-input"
                }`}
              />
              generally has increased
            </td>
            <td>Thornton</td>
            <td>workforce that</td>
          </tr>
          <tr>
            <td>alternative </td>
            <td>example, customers may expect a</td>
            <td>depends </td>
            The truth is that such a four-day week has many attractions but it
            will not be appropriate in every instance,’ says Professor Hazel.
            ‘It depends very much on the company concerned, its size, internal
            structure and the nature of its relationships with customers,{" "}
            <input
              placeholder={questionsNo + 2 !== selectedIndex && questionsNo + 2}
              onClick={(e) => handleInput(questionsNo + 2)}
              className={`${
                questionsNo + 2 === selectedIndex && "table-input"
              }`}
            />
            partners and suppliers
          </tr>
          <tr>
            <td>
              Indeed
              <input
                placeholder={
                  questionsNo + 3 !== selectedIndex && questionsNo + 3
                }
                onClick={(e) => handleInput(questionsNo + 3)}
                className={`${
                  questionsNo + 3 === selectedIndex && "table-input"
                }`}
              />
            </td>
            <td>represents </td>
            <td>Thornton</td>
            <td>
              This term work–life balance has become a cliché,’ says Hadi. ‘In
              reality, life is an intricate mix of work and leisure and the
              relationship between the two has so many strands that they cannot
              be neatly divided. The idea of work– life balance as it is often
              understood has limited value
            </td>
          </tr>
          <tr>
            <td>experiment </td>
            <td>Jacob</td>
            <td>
              The 240 employees at Certified Life completed surveys at the
              beginning and end of the experiment to provide
              <input
                placeholder={
                  questionsNo + 4 !== selectedIndex && questionsNo + 4
                }
                onClick={(e) => handleInput(questionsNo + 4)}
                className={`${
                  questionsNo + 4 === selectedIndex && "table-input"
                }`}
              />
            </td>
            @mdo
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default TableFillinTheblanks;
