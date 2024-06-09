import React from "react";
import { Button, Card, Row, Col } from "antd";

const ImageComponent = ({ imageUrl }) => {
  const fetchData = async () => {
    try {
      const response = await fetch(
        `/api/download-image?url=${encodeURIComponent(imageUrl)}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch image, status: ${response.status}`);
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "image.jpg"; // Specify the filename here
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to fetch image:", error.message);
    }
  };
  return (
    <Card
      style={{ maxWidth: "800px", margin: "20px auto", textAlign: "center" }}
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <img
            src={imageUrl}
            alt="Displayed"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Col>
        <Col span={24}>
          <p></p>
        </Col>
        <Col span={24}>
          <Button type="primary" onClick={fetchData}>
            Download Image
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default ImageComponent;