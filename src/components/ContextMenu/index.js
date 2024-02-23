import React from "react";
import "./style.scss";
import highLight from "./../../assets/Image/highlight.png";
import Clear from "./../../assets/Image/clear.png";
import ClearAll from "./../../assets/Image/clear-all.png";
import Notes from "./../../assets/Image/notes.png";
import CloseIcon from "./../../assets/Image/close.png";
import { Form } from "react-bootstrap";

let nodeArryData = [];
const ContextMenu = (props) => {
  const { selectionGetRangeAt, selectionText } = props;

  // for Node
  const [nodeID, setNodeID] = React.useState("");
  const [nodeArry, setNodeArry] = React.useState([]);
  const [nodeTextarea, setNodeTextarea] = React.useState("");
  const [showNode, setShowNode] = React.useState(false);

  const stickyNodeRef = React.useRef();
  const [dx, setDx] = React.useState(false);
  const [dy, setDy] = React.useState(false);
  const [allowSticky, setAllowSticky] = React.useState(false);

  const handleclear = () => {
    var element = document.getElementById(nodeID);
    var element2 = document.getElementById(nodeID);
    element.style.backgroundColor = "transparent";
    element2.classList.remove("remove-highlight-hover");
    let newNodeArryData = nodeArryData?.filter((element) => {
      if (element.id !== nodeID) return element;
    });
    nodeArryData = newNodeArryData;
    setNodeArry([]);
  };
  const handleAllclear = () => {
    const removeHighLight = document.getElementsByClassName("remove-highlight");
    for (let i of removeHighLight) {
      i.style.backgroundColor = "transparent";
      i.classList.remove("remove-highlight-hover");
    }
    nodeArryData = [];
    setNodeArry([]);
  };

  let span = document.createElement("span");

  const handleHighlight = () => {
    if (selectionText) {
      var selectedExtractContents = selectionGetRangeAt.extractContents();
      let div = document.createElement("div");

      span.classList.add("remove-highlight");

      span.setAttribute("id", `${selectionText.length}-sapn`);
      span.style.backgroundColor = "yellow";
      span.appendChild(selectedExtractContents);
      selectionGetRangeAt.insertNode(span);
    }
  };

  const handelNotes = (id, status, addnodeText) => {
    if (status === "add") {
      var element = document.getElementById(nodeID);
      element.classList.add("remove-highlight-hover");
      setShowNode(false);
      setNodeArry([...nodeArry, { id: nodeID, addnodeText }]);
    } else if (status === "close") {
      setNodeTextarea("");
      let newArry = nodeArry.filter((items) => {
        if (items?.id !== id) {
          return items;
        }
      });
      setNodeArry(newArry);
    } else if (status === "addTextarea") {
      nodeArryData.push({ id, addnodeText });
    }
  };

  const handelNoteMouseDown = (e, itemIndex) => {
    let stickyNodeSelector;
    const stickyNodeId = document
      .querySelectorAll(`.note-wrap`)
      .forEach((item, index) => {
        if (itemIndex === index) {
          stickyNodeSelector = item;
        }
      });
    if (stickyNodeSelector) {
      setAllowSticky(true);
      const correntPosition = stickyNodeSelector.getBoundingClientRect();
      setDx(e.clientX - correntPosition.x);
      setDy(e.clientY - correntPosition.y);
    }
  };

  const handelNoteMouseMove = (e, itemIndex) => {
    let stickyNodeSelector;
    const stickyNodeId = document
      .querySelectorAll(`.note-wrap`)
      .forEach((item, index) => {
        if (itemIndex === index) {
          stickyNodeSelector = item;
        }
      });

    if (allowSticky && stickyNodeSelector) {
      // console.log("handelNoteMouseDown");
      const x = e.clientX - dx;
      const y = e.clientY - dy;
      stickyNodeSelector.style.left = x + "px";
      stickyNodeSelector.style.top = y + "px";
      // console.log(e, "llll");
    }
  };

  const handelNoteMouseUp = () => {
    setAllowSticky(false);
  };

  span.onclick = (e) => {
    nodeArryData?.filter((items) => {
      if (e.target.id === items?.id) {
        setNodeArry([
          ...nodeArry,
          { id: items.id, addnodeText: items?.addnodeText },
        ]);
        setNodeTextarea(items.addnodeText);
      }
    });
  };

  span.oncontextmenu = (e) => {
    setShowNode(true);
    setNodeID(e.target.id);
  };

  return (
    <>
      <div className="contextmenu-wapper">
        <ul className="menu-option">
          <li onClick={() => handleHighlight()}>
            <img src={highLight} alt="hightlight" />
            Highlight{" "}
          </li>
          {showNode && (
            <li onClick={() => handelNotes(nodeID, "add", "")}>
              <img src={Notes} alt="Notes" />
              Notes
            </li>
          )}
          <li onClick={handleclear}>
            <img src={Clear} alt="Clear" />
            Clear
          </li>
          <li onClick={handleAllclear}>
            <img src={ClearAll} alt="Clear All" />
            Clear All
          </li>
        </ul>
      </div>
      <div>
        {nodeArry.length !== 0 &&
          nodeArry.map((items, index) => {
            return (
              <div
                className="note-wrap"
                ref={stickyNodeRef}
                id={index + "note-wrap"}
                key={items.id}
              >
                <div
                  onMouseDown={(e) => handelNoteMouseDown(e, index)}
                  onMouseMove={(e) => handelNoteMouseMove(e, index)}
                  onMouseUp={() => handelNoteMouseUp()}
                >
                  <div className="drag-title">
                    <img
                      src={CloseIcon}
                      alt="close"
                      onClick={() => handelNotes(items.id, "close", "")}
                    />
                  </div>
                </div>
                <div className="edit-area">
                  <Form.Group
                    className=""
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Control
                      as="textarea"
                      rows={2}
                      onBlur={(e) =>
                        handelNotes(items.id, "addTextarea", e.target.value)
                      }
                      value={nodeTextarea}
                      onChange={(e) => setNodeTextarea(e.target.value)}
                    />
                  </Form.Group>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ContextMenu;
