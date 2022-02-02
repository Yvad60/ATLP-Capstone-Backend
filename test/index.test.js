import chai from 'chai'
import chaiHttp from 'chai-http'
import { app } from '../index.js'
chai.should()
chai.use(chaiHttp)

describe('/POST /articles', () => {
  const newArticle = {
    "title": "new article for testing 9",
    "author": "Simon",
    "content": "testing article Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco."
  }
  it('it creates a new article on the blog database', (done) => {
    chai.request(app).post('/api/v1/blogs').send(newArticle).end((error, res) => {
      res.should.have.status(201)
      res.body.should.be.a('object')
      res.body.should.have.property('status').eq('success')
      res.body.should.have.property('results').include(newArticle)
    })
    done()
  })
})

describe('/POST /articles', () => {
  const newArticle = {
    "strangefield": "virus code",
    "title": "new article for testing 8",
    "author": "Simon",
    "content": "testing article Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco."
  }
  it('it tries to create article with strange field', (done) => {
    chai.request(app).post('/api/v1/blogs').send(newArticle).end((error, res) => {
      res.should.have.status(400)
      res.body.should.be.a('object')
      res.body.should.have.property('status').eq('fail')
      res.body.should.have.property('results').include({ error: '"strangefield" is not allowed' })
    })
    done()
  })
})

// -------------------------------------------------------------------

describe('/POST /api/v1/blogs', () => {
  const newArticle = {
    "author": "Simon",
    "content": "testing article Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi"
  }
  it('tries to create an article without required inputs', (done) => {
    chai.request(app).post('/api/v1/blogs').send(newArticle).end((error, res) => {
      res.should.have.status(400)
      res.body.should.be.a('object')
      res.body.should.have.property('status').eq('fail')
      res.body.should.have.property('results').include({ "error": "article title is required" })
    })
    done()
  })
})

// -------------------------------------------------------------------

describe('/GET api/v1/blogs', () => {
  it('returns a list of all articles', (done) => {
    chai.request(app).get('/api/v1/blogs').end((error, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object')
      res.body.should.have.property('status').eq('success')
    })
    done();
  });
})

// -------------------------------------------------------------------

describe('/GET /api/v1/blogs/:articleId', () => {
  const articleId = '61f9415098dbcdd8b370b5a9'
  it("get a single article by it's ID", (done) => {
    chai.request(app).get(`/api/v1/blogs/${articleId}`).end((error, res) => {
      res.should.have.status(200)
      res.body.should.be.a('object')
      res.body.should.have.property('status').eq('success')
    })
    done();
  })
})

// -------------------------------------------------------------------

describe('/GET /api/v1/blogs/:wrongId', () => {
  const wrongId = '61f9456e76374432f'
  it("tries to get a single article with a wrong id", (done) => {
    chai.request(app).get(`/api/v1/blogs/${wrongId}`).end((error, res) => {
      res.should.have.status(404)
      res.body.should.be.a('object')
      res.body.should.have.property('status').eq('fail')
      res.body.should.have.property('results').include({ message: "article not found" })
    })
    done();
  })
})

// -------------------------------------------------------------------

describe('/PUT /api/v1/blogs/:articleId', () => {
  const articleId = '61f9456e4ee02db76374432f'
  const articleUpdates = {
    "author": "titi"
  }
  it("update the article by it's ID", (done) => {
    chai.request(app).put(`/api/v1/blogs/${articleId}`).send(articleUpdates).end((error, res) => {
      res.should.have.status(200)
      res.body.should.be.a('object')
      res.body.should.have.property('status').eq('success')
      res.body.should.have.property('results').include(articleUpdates)
    })
    done();
  })
})

// -------------------------------------------------------------------

describe('/PUT /api/v1/blogs/:wrongId', () => {
  const wrongId = '61f9456e76374432f'
  const articleUpdates = {
    "author": "titi"
  }
  it("tries to update the article with a wrong id", (done) => {
    chai.request(app).put(`/api/v1/blogs/${wrongId}`).send(articleUpdates).end((error, res) => {
      res.should.have.status(404)
      res.body.should.be.a('object')
      res.body.should.have.property('status').eq('fail')
      res.body.should.have.property('results').include({ message: "article not found" })
    })
    done();
  })
})

// -------------------------------------------------------------------

describe('/PUT /api/v1/blogs/:articleId', () => {
  const articleId = '61f94485620507cb1f4008e4'
  const emptyUpdates = {
  }
  it("tries to update an article with empty body", (done) => {
    chai.request(app).put(`/api/v1/blogs/${articleId}`).send(emptyUpdates).end((error, res) => {
      res.should.have.status(400)
      res.body.should.be.a('object')
      res.body.should.have.property('status').eq('fail')
      res.body.should.have.property('results').include({ "error": "must update either title,author or content" })
    })
    done();
  })
})

// -------------------------------------------------------------------

// describe('/DELETE /api/v1/blogs/:articleId', () => {
//   const articleId = '61f94344bcc7ebe02b5bfe1a'
//   it("deletes an article by it's ID", (done) => {
//     chai.request(app).delete(`/api/v1/blogs/${articleId}`).end((error, res) => {
//       res.should.have.status(200)
//       res.body.should.be.a('object')
//       res.body.should.have.property('status').eq('success')
//       res.body.should.have.property('results').include({ message: "article deleted" })
//     })
//     done();
//   })
// })

// -------------------------------------------------------------------

describe('/DELETE /api/v1/blogs/:articleId', () => {
  const wrongId = '61f94344bcc7ebe02ba'
  it("tries to deletes an article by wrong ID", (done) => {
    chai.request(app).delete(`/api/v1/blogs/${wrongId}`).end((error, res) => {
      res.should.have.status(404)
      res.body.should.be.a('object')
      res.body.should.have.property('status').eq('fail')
      res.body.should.have.property('results').include({ message: "article not found" })
    })
    done();
  })
})

// -------------------------------------------------------------------
//USERS TESTS
// -------------------------------------------------------------------

describe('/POST /api/v1/users', () => {
  const newUser = {
    "email": "test@test.com",
    "password": "Test@12345"
  }
  it('tries to create a new user without required inputs', (done) => {
    chai.request(app).post('/api/v1/users').send(newUser).end((error, res) => {
      res.should.have.status(400)
      res.body.should.be.a('object')
      res.body.should.have.property('status').eq('fail')
      res.body.should.have.property('results').include({ "error": "name is required" })
    })
    done()
  })
})

// describe('/POST /api/v1/users', () => {
//   const newUser = {
//     "name": "Ivad Yves",
//     "email": "test12345@test.com",
//     "password": "Test@12345"
//   }
//   it('create a new user successfully', (done) => {
//     chai.request(app).post('/api/v1/users').send(newUser).end((error, res) => {
//       res.should.have.status(201)
//       res.body.should.be.a('object')
//       res.body.should.have.property('status').eq('success')
//     })
//     done()
//   })
// })

describe('/POST /api/v1/users', () => {
  const newUser = {
    "name": "Ivad Yves",
    "email": "test12345@test.com",
    "password": "Test@12345"
  }
  it('tries to create a user with existing email', (done) => {
    chai.request(app).post('/api/v1/users').send(newUser).end((error, res) => {
      res.should.have.status(409)
      res.body.should.be.a('object')
      res.body.should.have.property('status').eq('fail')
      res.body.should.have.property('results').include({
        "error": "the email is already in use"
      })
    })
    done()
  })
})


describe('/GET api/v1/users', () => {
  it('returns a list of all users', (done) => {
    chai.request(app).get('/api/v1/users').end((error, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object')
      res.body.should.have.property('status').eq('success')
    })
    done();
  });
})

describe('/GET /api/v1/blogs/:userId', () => {
  const userId = '61f9bbd7968a55f5a9c20b9f'
  it("get a single user by his id", (done) => {
    chai.request(app).get(`/api/v1/users/${userId}`).end((error, res) => {
      res.should.have.status(200)
      res.body.should.be.a('object')
      res.body.should.have.property('status').eq('success')
    })
    done();
  })
})

describe('/DELETE /api/v1/blogs/:userId', () => {
  const wrongId = '61f94344bcc7ebe02ba'
  it("tries to deletes a user by wrong ID", (done) => {
    chai.request(app).delete(`/api/v1/users/${wrongId}`).end((error, res) => {
      res.should.have.status(404)
      res.body.should.be.a('object')
      res.body.should.have.property('status').eq('fail')
      res.body.should.have.property('results').include({ message: "user not found" })
    })
    done();
  })
})
