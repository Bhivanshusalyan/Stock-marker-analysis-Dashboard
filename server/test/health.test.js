import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.js';

test('GET /api/health reports a healthy API', async () => {
  const response = await request(app).get('/api/health');
  assert.equal(response.status, 200);
  assert.equal(response.body.ok, true);
});

test('stock search returns provider-labelled results without a key', async () => {
  const response = await request(app).get('/api/stocks/search?q=INFY');
  assert.equal(response.status, 200);
  assert.equal(response.body.stocks[0].symbol, 'INFY');
  assert.equal(response.body.isDemo, true);
});
