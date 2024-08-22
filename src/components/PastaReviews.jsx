import { Row, Col, ListGroup } from 'react-bootstrap'

const PastaReviews = function (props) {
  // dentro props troveremo activePasta, il dato che gli è stato passato da Home
  return (
    <Row className="justify-content-center">
      <Col xs={12} md={6}>
        <ListGroup className="text-center">
          {props.activePasta.comments.map((c) => {
            return (
              <ListGroup.Item key={c.id}>
                {c.rating} | {c.comment} {/* es. 5 | Fantastica */}
              </ListGroup.Item>
            )
          })}
        </ListGroup>
      </Col>
    </Row>
  )
}

export default PastaReviews
