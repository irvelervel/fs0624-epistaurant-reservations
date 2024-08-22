// questo componente renderizzerà un form per la prenotazione di un tavolo
// da parte dei nostri clienti

import { Component } from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'

// spoiler: questo componente, per poter far funzionare correttamente il form,
// avrà bisogno di uno STATO

// TableBooking sarà composto da un form
// che campi inserire? ho parlato con il mio backender e...

// name --> string
// phone --> string/number
// numberOfPeople --> string/number
// smoking --> boolean
// dateTime --> string (ISO Date)
// specialRequests --> string

class TableBooking extends Component {
  state = {
    reservation: {
      // lo stato iniziale del componente
      // che in questo rappresenta anche lo stato iniziale del form
      name: '',
      phone: '',
      numberOfPeople: '1',
      smoking: false,
      dateTime: '',
      specialRequests: '',
    },
  }

  handleChange = (e, property) => {
    this.setState({
      reservation: {
        ...this.state.reservation,
        [property]: e.target.value,
        // property è una stringa, arriva dall'invocazione del metodo all'interno
        // degli onChange dei vari input; potrebbe essere ad es. "name", oppure
        // "numberOfPeople" etc.
        // per poter "calcolare" il valore di property ed utilizzarlo come
        // nome della proprietà del nuovo oggetto reservation, lo utilizziamo
        // tramite le [ ] sfruttando la "square brackets notation"
      },
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    // ora inviamo i dati alle API di EPICODE per salvare la prenotazione
    // inviamo i dati tramite una chiamata con metodo 'POST'
    fetch('https://striveschool-api.herokuapp.com/api/reservation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.reservation),
    })
      .then((response) => {
        if (response.ok) {
          console.log('prenotazione salvata')
          alert('grazie!')
          // dobbiamo svuotare i campi!
          // per farlo resettiamo lo stato, così i campi si svuoteranno da soli
          this.setState({
            reservation: {
              // lo stato iniziale del componente
              name: '',
              phone: '',
              numberOfPeople: '1',
              smoking: false,
              dateTime: '',
              specialRequests: '',
            },
          })
        } else {
          alert('riprova più tardi')
          throw new Error('errore!')
        }
      })
      .catch((err) => {
        alert(err)
      })
  }

  // METODO ALTERNATIVO DI GESTIONE PROMISE CON ASYNC/AWAIT
  //   handleSubmitAsyncAwait = async (e) => {
  //     e.preventDefault()
  //     // ora inviamo i dati alle API di EPICODE per salvare la prenotazione
  //     // inviamo i dati tramite una chiamata con metodo 'POST'

  //     try {
  //       const response = await fetch(
  //         'https://striveschool-api.herokuapp.com/api/reservation',
  //         {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify(this.state.reservation),
  //         }
  //       )

  //       console.log('response', response) // funziona!

  //       if (response.ok) {
  //         console.log('prenotazione salvata')
  //         alert('grazie!')
  //         // dobbiamo svuotare i campi!
  //         // per farlo resettiamo lo stato, così i campi si svuoteranno da soli
  //         this.setState({
  //           reservation: {
  //             // lo stato iniziale del componente
  //             name: '',
  //             phone: '',
  //             numberOfPeople: '1',
  //             smoking: false,
  //             dateTime: '',
  //             specialRequests: '',
  //           },
  //         })
  //       } else {
  //         alert('riprova più tardi')
  //         throw new Error('errore!')
  //       }
  //     } catch (error) {
  //       // questo è un po' come il .catch() che avevate dopo il .then()
  //       console.log(error)
  //     }
  //   }

  render() {
    return (
      <Container>
        <Row className="justify-content-center my-4">
          <Col xs={12} md={6}>
            <h2 className="text-center mb-3">Prenota il tuo tavolo ORA!</h2>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Come ti chiami?"
                  required
                  // 1) salviamo nello stato ogni lettera inserita
                  // con questo particolare input dobbiamo riempire
                  // la proprietà "name" dentro reservation nello state
                  onChange={(e) => {
                    console.log('scritto qualcosa in name!', e.target.value)
                    // l'unico modo per cambiare lo stato di un componente
                    // è utilizzare this.setState()
                    this.setState({
                      reservation: {
                        ...this.state.reservation,
                        // questo spread operator mi permette di far partire
                        // il mio nuovo oggetto reservation da TUTTE le proprietà
                        // vecchie
                        name: e.target.value,
                      },
                    })
                  }}
                  // adesso facciamo la freccia n. 2)
                  // colleghiamo l'interfaccia allo stato
                  value={this.state.reservation.name}
                  // come mai ci serve ANCHE questo passaggio?
                  // perchè vogliamo essere in grado di maneggiare il contenuto
                  // dell'input modificando lo stato
                />
                {/* il Form.Control altro non è che un <input /> */}
              </Form.Group>

              {/* se il campo nome è minore di tre caratteri -> nulla */}
              {/* se il campo nome è maggiore di tre caratteri ma non è stefano -> alert rosso */}
              {/* se il campo nome è maggiore di tre caratteri ed è stefano -> alert verde */}

              {this.state.reservation.name.length < 3 ? (
                <></>
              ) : this.state.reservation.name !== 'Stefano' ? (
                <Alert variant="danger">Non hai indovinato il nome!</Alert>
              ) : (
                <Alert variant="success">Hai indovinato il nome!</Alert>
              )}

              <Form.Group className="mb-3">
                <Form.Label>N. telefono</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Inserisci un numero italiano"
                  required
                  onChange={(e) => {
                    // this.setState({
                    //   reservation: {
                    //     ...this.state.reservation,
                    //     phone: e.target.value,
                    //   },
                    // })
                    this.handleChange(e, 'phone')
                  }}
                  value={this.state.reservation.phone}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Numero di persone</Form.Label>
                <Form.Select
                  required
                  onChange={(e) => {
                    // this.setState({
                    //   reservation: {
                    //     ...this.state.reservation,
                    //     numberOfPeople: e.target.value,
                    //   },
                    // })
                    this.handleChange(e, 'numberOfPeople')
                  }}
                  value={this.state.reservation.numberOfPeople}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Tavolo fumatori?"
                  onChange={(e) => {
                    this.setState({
                      reservation: {
                        ...this.state.reservation,
                        smoking: e.target.checked,
                        // e.target.value tornerebbe "on" o "off"
                        // mentre e.target.checked torna "true" o "false"
                        // (che è quello che vogliamo)
                      },
                    })
                  }}
                  checked={this.state.reservation.smoking}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Quando volete venire?</Form.Label>
                <Form.Control
                  type="datetime-local"
                  required
                  onChange={(e) => {
                    // this.setState({
                    //   reservation: {
                    //     ...this.state.reservation,
                    //     dateTime: e.target.value,
                    //   },
                    // })
                    this.handleChange(e, 'dateTime')
                  }}
                  value={this.state.reservation.dateTime}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Allergie/bambini/animali?</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  onChange={(e) => {
                    this.setState({
                      reservation: {
                        ...this.state.reservation,
                        specialRequests: e.target.value,
                      },
                    })
                  }}
                  value={this.state.reservation.specialRequests}
                />
              </Form.Group>

              <Button variant="success" type="submit">
                Invia!
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default TableBooking
