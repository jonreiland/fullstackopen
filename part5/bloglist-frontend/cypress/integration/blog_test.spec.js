describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('login successful')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.get('#create-new-blog').click()
      cy.get('#title').type('a new blog')
      cy.get('#author').type('Matti Luukkainen')
      cy.get('#url').type('test.com')
      cy.get('#create-new-blog-submit-button').click()
      cy.contains('a new blog')
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'first blog', author: 'Jon One', url: 'example1.com' })
        cy.createBlog({ title: 'second blog', author: 'Jon Two', url: 'example2.com' })
        cy.createBlog({ title: 'third blog', author: 'Jon Three', url: 'example3.com' })
        cy.visit('http://localhost:3000')
      })
  
      it('a blog can be liked', function () {
        cy.contains('first blog').parent().find('#view-button').click()
        cy.contains('first blog').parent().contains('like').click()
        cy.contains('first blog').parent().find('#togglableContent').contains('likes 1')
      })

      it('a blog can be deleted', function () {
        cy.contains('first blog').parent().find('#view-button').click()
        cy.contains('first blog').parent().find('#remove-button').click()
        cy.get('html').should('not.contain', 'first blog')
      })

      it('the blogs are ordered by likes', function () {
        cy.contains('first blog').parent().find('#view-button').click()
        cy.contains('first blog').parent().contains('like').click().click()
        cy.contains('second blog').parent().find('#view-button').click()
        cy.contains('second blog').parent().contains('like').click().click().click()
        cy.contains('third blog').parent().find('#view-button').click()
        let likesArray = []
        cy.get('.likes').each(div => {
          cy.wrap(div).find('#likesNum').invoke('text').then(text => {
            likesArray.push(parseInt(text))
          })
        }).then(result => {
          for (let index = 0; index < likesArray.length - 1; index++) {
            const value = likesArray[index];
            cy.wrap(value).should('be.gte', likesArray[index+1])
          }
        })
      })
    })
  })

})