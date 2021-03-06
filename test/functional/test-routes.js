const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

const server = require('../../server/server');

// example functional tests of routes
describe('GET /', () => {
  it('responds with homepage', () => {
    return request(server)
      .get('/')
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .expect(200)
      .then(response => {
        expect(response.text).to.include(
          'You are currently running a Node.js app built for the IBM Cloud.'
        );
      });
  });
});

describe('GET /health', () => {
  it('responds with json', () => {
    return request(server)
      .get('/health/')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200, {
        status: 'UP',
      });
  });
});

describe('GET /swagger/api-docs', () => {
  it('responds with swagger', () => {
    return request(server)
      .get('/swagger/api-docs/')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(200)
      .then(response => {
        expect(response.text).to.include('Swagger');
      });
  });
});

describe('POST /fake/route', () => {
  it('responds with not found page', () => {
    return request(server)
      .post('/fake/route')
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .expect(200)
      .then(response => {
        expect(response.text).to.include(
          'Whoops! Looks like you got lost or couldn\'t find your page.'
        );
      });
  });
});

describe('GET /translator', () => {
  it('responds with translator', () => {
    return request(server)
      .get('/translator')
      .expect(200)
      .then(response => {
        expect(response.text).to.include(
          'Translator'
        );
      });
  });
});

describe('GET /translator/translate How r u', () => {
  it('responds with Oi! Como você está?', () => {
    return request(server)
      .get('/translator/translate?text=Hi%21+How+are+you%3F&de=en&para=pt')
      .expect(200)
      .then(response => {
        expect(response.text).to.include(
          'Oi! Como você está?'
        );
      });
  });
});

describe('GET API /translator/translated How r u', () => {
  it('responds with json', () => {
    return request(server)
      .get('/translator/translated?text=Hi%21+How+are+you%3F&de=en&para=pt')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200, {
        text: 'Oi! Como você está?',
      });
  });
});

describe('GET /translator/translate How r u', () => {
  it('responds with Oi! Como você está?', () => {
    return request(server)
      .get('/translator/translate?text=Hi%21+How+are+you%3F&de=&para=pt')
      .expect(200)
      .then(response => {
        expect(response.text).to.include(
          'Oi! Como você está?'
        );
      });
  });
});


describe('GET /translator/translate Erro', () => {
  it('responds with console print', () => {
    return request(server)
      .get('/translator/translate?text=Hi%21' +
      '+How+are+you%3F&de=qualquercoisa&para=qualquercoisa')
      .expect(404);
  });
});
