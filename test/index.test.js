import chai from 'chai'
import chaiHttp from 'chai-http'
import { app } from '../index.js'
chai.should()
chai.use(chaiHttp)


// describe('/POST /articles', () => {
//   const newArticle = {
//     "title": "new article for testing 8",
//     "author": "Simon",
//     "content": "testing article Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco."

//   }
//   it('it creates a new article on the blog database', (done) => {
//     chai.request(app).post('/api/v1/blogs').send(newArticle).end((error, res) => {
//       res.should.have.status(201)
//       res.body.should.be.a('object')
//       res.body.should.have.property('status').eq('success')
//       res.body.should.have.property('results').include(newArticle)
//     })
//     done()
//   })
// })

describe('/POST /api/v1/blogs', () => {
  const newArticle = {
    // "title": "new article for testing 5",
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




















// describe('/GET', () => {
//   it('returns the homepage', (done) => {
//     chai.request(app).get('/').end((error, res) => {
//       res.should.have.status(200)
//     })
//     done()
//   })
// })



// describe('/GET api/v1/blgs', () => {
//   it('it does not get all article since wrong url', (done) => {
//     chai.request(app).get('/api/v1/blgs').end((error, res) => {
//       res.should.have.status(404)
//     })
//     done()
//   })
// })

// describe('/GET api/v1/blogs/:id', () => {
//   const articleId = '61e909694f8ba6e1729325b5'
//   it('returns a single article by own id', (done) => {
//     chai.request(app).get(`/api/v1/blogs/${articleId}`).end((error, res) => {
//       res.should.have.status(200)
//       res.body.should.be.a('object')
//       res.body.should.have.property('_id').eq(articleId)
//     })
//     done()
//   })
// })

// describe('/GET api/v1/blogs/:wrongId', () => {
//   const articleId = '909694f8ba6e1729325b5'
//   it('it does not get any article since wrong id', (done) => {
//     chai.request(app).get(`/api/v1/blogs/${articleId}`).end((error, res) => {
//       res.should.have.status(500)
//     })
//     done()
//   })
// })

// describe('/PUT api/v1/blogs/:id', () => {
//   const articleId = '61e909694f8ba6e1729325b5'
//   it('it edits article by own ID', (done) => {
//     chai.request(app).put(`/api/v1/blogs/${articleId}`).end((error, res) => {
//       res.should.have.status(200)
//     })
//     done()
//   })
// })