const createAppartement =  require ("../controllers/appartementController.js").createAppartement

const Appartement = require('../models/appartementModel.js');

jest.mock('../models/appartementModel.js');

describe('createAppartement', () => {
  it('should return an error response when validation fails', async () => {
    const req = {
      body: {
        
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createAppartement(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Validation failed' });
  });

  

  it('should create a new appartment', async () => {
    const req = {
      body: {
        address: '123 Example St',
        clientId: '1234567890' 
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const mockSavedAppartment = {
      address: '123 Example St',
      client: '1234567890',
    };

    Appartement.prototype.save.mockResolvedValue(mockSavedAppartment);

    await createAppartement(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockSavedAppartment);
  });
});