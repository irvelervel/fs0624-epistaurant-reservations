import { Container, Row, Col, Carousel } from 'react-bootstrap'
import pastasciutte from '../data/menu.json'
import { Component } from 'react'
// pastasciutte è un array di 5 oggetti, ognuno rappresentante un piatto di pasta
import PastaReviews from './PastaReviews'

class Home extends Component {
  state = {
    activePasta: pastasciutte[0],
    // inizializzo lo stato con i valori iniziali
  }

  // le props sarebbero in this.props

  render() {
    return (
      <Container>
        {/* un Container altro non è che un <div class="container"></div> */}
        <Row className="justify-content-center my-4">
          {/* col-12 col-md-6 col-lg-4 */}
          <Col xs={12} md={6} lg={4} className="text-center">
            <h2>Benvenuti a Epistaurant!</h2>
            <h4>Ristorante italiano dal 1970</h4>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <Carousel
              onSlide={(i) => {
                console.log('SLIDE CAMBIATA!', i)
                // la prossima activePasta è pastasciutte[i]
                // dobbiamo settare lo stato del componente Home con pastasciutte[i]
                // come nuova activeSlide
                // lo stato di un componente è READ-ONLY
                // per cambiare lo stato di un componente bisogna utilizzare un
                // metodo apposito, che si chiama "setState()"
                // setState si trova su "this"
                this.setState({
                  // questo è un NUOVO oggetto state, che verrà FUSO
                  // con lo stato corrente
                  activePasta: pastasciutte[i],
                })
              }}
            >
              {pastasciutte.map((pasta) => {
                return (
                  <Carousel.Item key={pasta.id}>
                    <img className="w-100" src={pasta.image} alt="dog pic" />
                    <Carousel.Caption>
                      <h3>{pasta.name}</h3>
                      <p>{pasta.description}</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                )
              })}
            </Carousel>
          </Col>
        </Row>

        <PastaReviews activePasta={this.state.activePasta} />
        {/* stiamo fornendo a PastaReviews quale sia la activePasta */}
      </Container>
    )
  }
}

export default Home
