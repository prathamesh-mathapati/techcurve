import React, { useEffect, useState } from "react";
import "./style.scss";
import { Col, Pagination, Row, Form } from "react-bootstrap";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { useLiveQuery } from "dexie-react-hooks";
import advancedIELTSDatabase from "../../db";
import { useLocation } from "react-router-dom";
import { getAllByRole } from "@testing-library/react";

const Footer = (props) => {
  const { setSelectedIndex, selectedIndex, paginationDataArry, parts, format } =
    props;
  const [paginationData, setPaginationData] = useState(paginationDataArry);
  const [review, setreview] = useState([]);
  const [isReviewChecked, setIsReviewChecked] = useState(false);
  const [selectedIndexForScroll, setSelectedIndexForScroll] = useState(0);
  const [attendAnswer, setAttendAnswer] = useState([]);
  // Get answer Listening  Test Data of IDB
  const getAnswerListeningTestDataOfDB = useLiveQuery(
    () => advancedIELTSDatabase.listeningTestAnswer.toArray(),
    []
  );
  const getAnswerReadingTestDataOfDB = useLiveQuery(
    () => advancedIELTSDatabase.readingTestAnswer.toArray(),
    []
  );
  const getAnswerWritingTestDataOfDB = useLiveQuery(
    () => advancedIELTSDatabase.writingTestAnswer.toArray(),
    []
  );

  const location = useLocation();

  useEffect(() => {
    for (const item of review) {
      if (item === selectedIndex) {
        setIsReviewChecked(true);
        break;
      } else {
        setIsReviewChecked(false);
      }
    }
  }, [selectedIndex]);

  // use to handle handlePagination
  const handlePagination = (item, status) => {
    let newselectedIndex = selectedIndex;

    if (selectedIndex) {
      if (null !== item) {
        setSelectedIndex(item);
        scrollToSelectedContent(item);
      } else if (status === "Left") {
        newselectedIndex--;
        setSelectedIndex(newselectedIndex);
        scrollToSelectedContent(newselectedIndex);
      } else if (status === "Right") {
        newselectedIndex++;
        setSelectedIndex(newselectedIndex);
        scrollToSelectedContent(newselectedIndex);
      }
    }
  };

  // handel review
  const handleReview = () => {
    setIsReviewChecked(!isReviewChecked);
    if (!isReviewChecked) {
      setreview([...review, selectedIndex]);
    } else {
      review.splice(review.indexOf(selectedIndex), 1);
    }
  };
  // show questions on scroll
  const scrollToSelectedContent = (selected_index) => {
    let selectedContent = document.getElementById(selected_index);

    if (selectedContent && selectedContent.type !== "hidden") {
      selectedContent.scrollIntoView({ behavior: "smooth" });

      selectedContent.focus();
    } else if (selectedIndex) {
      selectedContent = document.getElementById(`${selected_index}_A`);
      if (selectedContent) {
        selectedContent.scrollIntoView({
          behavior: "smooth",
          top: 100,
        });
      } else {
        setSelectedIndexForScroll(selected_index);
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      scrollToSelectedContent(selectedIndex);
      setSelectedIndexForScroll(0);
    }, 500);
  }, [selectedIndexForScroll]);

  // hanldel which one given

  useEffect(() => {
    if (location?.pathname === "/ielts/ListeningSection") {
      setAttendAnswer(getAnswerListeningTestDataOfDB);
    } else if (location?.pathname === "/ielts/ReadingSection") {
      setAttendAnswer(getAnswerReadingTestDataOfDB);
    } else if (location?.pathname === "/ielts/WritingSection") {
      setAttendAnswer(getAnswerWritingTestDataOfDB);
    }
  }, [
    getAnswerListeningTestDataOfDB,
    getAnswerReadingTestDataOfDB,
    getAnswerWritingTestDataOfDB,
  ]);

  return (
    <div className="main-footer-waper">
      <div className="footer-pagination">
        <Row className="g-0">
          <Col sm={12} md={1} lg={1} xl={1}>
            <Form>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="default-checkbox"
                  label={"Review"}
                  onClick={handleReview}
                  checked={isReviewChecked}
                  className="review-check form-check-input"
                />
                <label
                  title=""
                  for="default-checkbox"
                  className="form-check-label"
                >
                  Review
                </label>
              </div>
            </Form>
          </Col>
          <Col
            sm={12}
            md={10}
            lg={10}
            xl={10}
            className="d-flex footer-pagination-nav"
          >
            <Pagination size="sm">
              {paginationData.map((item) => {
                let isActive = false;
                let isAttend = false;
                review.map((reviewItems) => {
                  if (item === reviewItems) {
                    isActive = true;
                  } else if (isReviewChecked && item === selectedIndex) {
                    isActive = true;
                  }
                });
                attendAnswer &&
                  attendAnswer.map((attendAnswer) => {
                    if (
                      attendAnswer?.id === `${item}` &&
                      attendAnswer?.user_answer
                    ) {
                      isAttend = true;
                    } else if (
                      `${attendAnswer?.id}` === `${item}` &&
                      attendAnswer?.answer
                    ) {
                      isAttend = true;
                    }
                  });

                return (
                  <div
                    className={`d-flex ${
                      isActive
                        ? "active-pagination-btn"
                        : "normal-pagination-btn"
                    } ${
                      isAttend
                        ? "attend-pagination-btn"
                        : "normal-pagination-btn"
                    }`}
                    key={item}
                    onClick={() => handlePagination(item, "")}
                  >
                    {parts !== "W" && item === 1 ? <p>Part 1</p> : ""}
                    <Pagination.Item
                      active={item === selectedIndex}
                      className={`page-item-${item}`}
                    >
                      {item}
                    </Pagination.Item>

                    {parts === "R" &&
                      format &&
                      (item === Number(format[0]) ? (
                        <p>Part 2</p>
                      ) : item === Number(format[0]) + Number(format[1]) ? (
                        <p>Part 3</p>
                      ) : (
                        ""
                      ))}

                    {parts === "L" &&
                      (item === 10 ? (
                        <p>Part 2</p>
                      ) : item === 20 ? (
                        <p>Part 3</p>
                      ) : item === 30 ? (
                        <p>Part 4</p>
                      ) : (
                        ""
                      ))}
                  </div>
                );
              })}
            </Pagination>
          </Col>
          <Col lsm={12} md={1} lg={1} xl={1}>
            <div className="footer-pagination-arrows">
              {selectedIndex !== 1 && (
                <FaArrowAltCircleLeft
                  onClick={() => handlePagination(null, "Left")}
                />
              )}
              {paginationData?.length !== selectedIndex && (
                <FaArrowAltCircleRight
                  onClick={() => handlePagination(null, "Right")}
                />
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Footer;
