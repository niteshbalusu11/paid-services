const {confirmServiceUse} = require('./client');
const {getServiceSchema} = require('./client');
const {getServicesList} = require('./client');
const {makeServiceRequest} = require('./client');
const {manageTrades} = require('./trades');
const {schema} = require('./services');
const {servicePaidRequests} = require('./server');

const serviceIds = schema.types;

module.exports = {
  confirmServiceUse,
  getServiceSchema,
  getServicesList,
  makeServiceRequest,
  manageTrades,
  serviceIds,
  servicePaidRequests,
};
