import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import "./style.scss";
import { useNavigate } from "react-router";

const WaitingRoom = (props) => {
  const { loading } = props;
  const navigation = useNavigate();

  const handleClick = () => {
    navigation("/ielts/SpeakingSection");
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title className="sync-loader-container">
      
          Waiting Room
        </Card.Title>
        <Card.Text>
          <h6>
            The examiner has entered the meeting. You are being connected...
          </h6>
          <Row>
            <Col xs={12} md={8} lg={6}>
              <div className="waiting-main-wrap">
                <Button variant="primary" onClick={handleClick} size="m" active>
                  I'm Ready
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default WaitingRoom;
