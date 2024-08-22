// Ogni componente che deve recuperare dei dati all'avvio avrà bisogno di uno state
// -> abbiamo bisogno di un componente a classe

// oggi il nostro obiettivo è mostrare le prenotazioni esistenti nelle API
// all'avvio del nostro componente BookingList

import { Component } from 'react'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'

class BookingList extends Component {
  state = {
    reservations: [], // so già che recupererò dalle API un array di prenotazioni
    // per questo motivo inizializzo la proprietà dello stato in cui le salverò
    // come un ARRAY VUOTO
  }

  render() {
    return (
      <Container>
        <Row className="justify-content-center my-4">
          <Col xs={12} md={6}>
            <h2 className="text-center mb-3">Prenotazioni esistenti</h2>
            <ListGroup>
              {/* impostiamo ora le regole del nostro componente React! */}
              {/* colleghiamo l'INTERFACCIA <--> DATI */}
              {this.state.reservations.map((res) => {
                return (
                  // non dimentichiamo la prop KEY, indispensabile
                  // per mantenere alte le performance anche su migliaia di elementi
                  <ListGroup.Item key={res._id}>
                    {res.name} per {res.numberOfPeople}
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default BookingList
