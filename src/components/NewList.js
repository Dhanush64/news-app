import { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

import useNewsData from "../hooks/useNewsData";
import CustomPagination from "./CustomPagination";

const NewsList = (props) => {
  const { category, searchTerm } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  const onPageChange = (pageNumber) => setCurrentPage(pageNumber);

  const { newsData, loading, error } = useNewsData(category, searchTerm, null);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Error: {error.message}
      </div>
    );
  }

  const totalArticles = newsData?.length;
  const totalPages = Math.ceil(totalArticles / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentArticles = newsData?.slice(startIndex, endIndex);

  return (
    <Container>
      <Row>
        {currentArticles?.map((article, index) => (
          <Col xs={12} md={3} lg={4} key={index} className="mb-2 ">
              <Card style={{ width: "220px" }}>
                <Card.Img
                  src={article.image}
                  alt={"Image of " + article.title}
                  variant="top"
                  loading="lazy"
                  style={{
                    position: "relative",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "0",
                    right: "50px",
                    padding: "3px 8px", 
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    fontSize: "10px",
                    fontWeight: "bold",
                    textAlign: "center",
                    transform: "translate(50%, -50%)",
                  }}
                >
                  {article.source.name
                  .split(" ")
                    .map((word) => word.toUpperCase())
                    .join(" ")}
                </div>
                <Card.Body>
                  <Card.Title>{article.title}</Card.Title>
                  <Card.Text>{article.description}</Card.Text>
                  <Card.Link href={article.url} target="_blank">
                    Read More
                  </Card.Link>
                </Card.Body>
              </Card>
          </Col>
        ))}
      </Row>

      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </Container>
  );
};

export default NewsList;
