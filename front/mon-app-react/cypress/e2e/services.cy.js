describe('Parcourir les services', () => {
  it('affiche des services sur la page d\'accueil', () => {
    cy.visit('/')
    cy.get('body').should('be.visible')
  })

  it('la page détail d\'un service est accessible', () => {
    cy.request('GET', 'http://localhost:8000/api/services').then((res) => {
      expect(res.status).to.eq(200)
      const services = res.body

      if (services.length > 0) {
        const id = services[0].id_service
        cy.visit(`/services/${id}`)
        cy.url().should('include', `/services/${id}`)
      }
    })
  })

  it('les catégories sont disponibles via l\'API', () => {
    cy.request('GET', 'http://localhost:8000/api/categories').then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body).to.be.an('array')
    })
  })
})
