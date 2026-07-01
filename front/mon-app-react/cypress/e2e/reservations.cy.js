const API = 'http://localhost:8000'

describe('Réservations', () => {
  const email = `client_${Date.now()}@babi.com`
  const motDePasse = 'password123'
  let clientToken
  let idService

  before(() => {
    // Créer données de test (admin + service + catégorie + prestataire)
    cy.task('seedCypress').then((serviceId) => {
      idService = serviceId

      // Créer le client
      cy.request('POST', `${API}/api/register`, {
        prenom: 'Client',
        nom: 'Cypress',
        email,
        telephone: '0601020304',
        mot_de_passe: motDePasse,
        mot_de_passe_confirmation: motDePasse,
      })

      // Se connecter en tant que client
      cy.request('POST', `${API}/api/login`, {
        email,
        mot_de_passe: motDePasse,
      }).then((res) => {
        clientToken = res.body.token
      })
    })
  })

  it('redirige vers /connexion si on accède sans token', () => {
    cy.clearLocalStorage()
    cy.visit('/reservations')
    cy.url().should('include', '/connexion')
  })

  it('crée une réservation et la voit dans la liste', () => {
    // Créer la réservation via l'API
    cy.request({
      method: 'POST',
      url: `${API}/api/reservations`,
      headers: { Authorization: `Bearer ${clientToken}` },
      body: {
        id_service: idService,
        date_reservation: '2027-01-15',
        message: 'Test Cypress',
      },
    }).then((res) => {
      expect(res.status).to.eq(201)
    })

    // Se connecter sur le front et aller sur /reservations
    cy.window().then((win) => win.localStorage.setItem('token', clientToken))
    cy.visit('/reservations')

    cy.url().should('include', '/reservations')
    cy.contains('Service Cypress').should('be.visible')
  })

  it('l\'API réservations renvoie 401 sans token', () => {
    cy.request({
      method: 'GET',
      url: `${API}/api/reservations`,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(401)
    })
  })
})
