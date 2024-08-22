// Ogni componente che deve recuperare dei dati all'avvio avrà bisogno di uno state
// -> abbiamo bisogno di un componente a classe

// oggi il nostro obiettivo è mostrare le prenotazioni esistenti nelle API
// all'avvio del nostro componente BookingList

// FLUSSO DI ESECUZIONE
// 1) LO STATO INIZIALE DEL COMPONENTE È SETTATO AD ARRAY VUOTO
// 2) PRIMO RENDER: vengono disegnate le parti STATICHE dell'interfaccia, e viene
// mappato l'array vuoto dello stato
// 3) dopo il primo render, viene eseguito COMPONENTDIDMOUNT, che effettua la fetch
// e RIEMPIE this.state.reservations
// 4) poichè è cambiato lo stato, react -IN AUTOMATICO- re-invoca render()
// 5) render() viene ri-eseguito riga per riga, tralascia le parti già presenti nel DOM
// e si ritrova a dover ri-mappare l'array: trova che a questo punto l'array non è
// più vuoto, e una alla volta crea le righe della lista

import { Component } from 'react'
import { Container, Row, Col, ListGroup, Spinner, Alert } from 'react-bootstrap'

class BookingList extends Component {
  state = {
    reservations: [], // so già che recupererò dalle API un array di prenotazioni
    // per questo motivo inizializzo la proprietà dello stato in cui le salverò
    // come un ARRAY VUOTO
    isLoading: true,
    isError: false,
  }

  // tutti i nostri metodi personalizzati all'interno della classe devono
  // essere costruiti tramite FUNZIONI FRECCIA (perchè le funzioni freccia
  // per definizione NON possiedono un proprio "this", ma ereditano quello
  // dell'ambiente circostante)

  componentDidMount = () => {
    console.log('SONO IN COMPONENTDIDMOUNT')
    // si deve chiamare esattamente "componentDidMount"

    // è il metodo nei componenti a classe che si occupa di recuperare dati
    // tramite chiamata API all'avvio
    // è il posto P E R F E T T O per eseguire fetch all'avvio o in generale
    // operazioni "costose"

    // componentDidMount è un metodo che viene eseguito immediatamente dopo
    // il PRIMO render
    // viene lanciato AUTOMATICAMENTE dai componenti a classe
    // esiste SOLO nei componenti a classe

    // componentDidMount viene lanciato da React UNA-VOLTA-SOLA

    this.fetchReservations()
  }

  fetchReservations = () => {
    // recuperiamo tramite una chiamata API le nostre prenotazioni
    fetch('https://striveschool-api.herokuapp.com/api/reservation')
      .then((response) => {
        // finale buono :)
        if (response.ok) {
          // la chiamata ha tornato 200
          return response.json()
        } else {
          // la chiamata ha tornato 400, 401, 403, 404, 500
          throw new Error('La chiamata non è andata a buon fine')
        }
      })
      .then((arrayOfReservations) => {
        console.log('PRENOTAZIONI RECUPERATE DAL SERVER', arrayOfReservations)
        this.setState({
          reservations: arrayOfReservations,
          isLoading: false,
          // salva l'array di prenotazioni nello stato, prendendo il posto
          // dell'array vuoto con cui avevamo inizializzato il componente

          // !!! REGOLA FONDAMENTALE DI REACT !!!
          // DOPO OGNI CAMBIO DI STATO O OGNI CAMBIO DI PROPS,
          // RENDER() VIENE RE-INVOCATO
        })
      })
      .catch((err) => {
        // finale cattivo :( problema di rete?
        console.log('ERRORE NEL RECUPERO DATI (internet)?', err)
        // spegniamo lo spinner anche qua!
        this.setState({
          isLoading: false, // spegniamo lo spinner
          isError: true, // accendiamo l'errore
        })
      })
  }

  render() {
    console.log('INVOCATO RENDER()')
    // this.fetchReservations()
    // mettere una funzione (come la nostra fetchReservations) che effettua
    // un this.setState() all'interno di render() CAUSA UN LOOP INFINITO
    return (
      <Container>
        <Row className="justify-content-center my-4">
          <Col xs={12} md={6}>
            <h2 className="text-center mb-3">Prenotazioni esistenti</h2>
            <div className="d-flex justify-content-center mb-3">
              {this.state.isLoading && (
                <Spinner animation="border" variant="info" />
              )}
              {this.state.isError && (
                <Alert variant="danger">
                  Oops! Qualcosa è andato storto 😱
                  <i className="bi bi-exclamation-triangle"></i>
                </Alert>
              )}
            </div>
            <ListGroup>
              {/* impostiamo ora le regole del nostro componente React! */}
              {/* colleghiamo l'INTERFACCIA <--> DATI */}
              {!this.state.isLoading && this.state.reservations.length === 0 ? (
                <ListGroup.Item>
                  Al momento non è presente nessuna prenotazione :(
                </ListGroup.Item>
              ) : (
                this.state.reservations.map((res) => {
                  return (
                    // non dimentichiamo la prop KEY, indispensabile
                    // per mantenere alte le performance anche su migliaia di elementi
                    <ListGroup.Item key={res._id}>
                      {res.name} per {res.numberOfPeople}
                    </ListGroup.Item>
                  )
                })
              )}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default BookingList
