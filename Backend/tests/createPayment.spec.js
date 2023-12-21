const createPaiement = require('../controllers/paiementController').createPaiement;
const Paiement = require('../models/paiementModel');

jest.mock('../models/paiementModel');

describe('createPaiement', () => {
  it('should create a new payment', async () => {
    const req = {
      body: {
        appartement: 'appartment_id',
        month: 'January',
        year: 2023,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockSavedPaiement = {
      appartement: 'appartment_id',
      month: 'January',
      year: 2023,
    };

    Paiement.prototype.save.mockResolvedValue(mockSavedPaiement);

    await createPaiement(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockSavedPaiement);
  });

  it('should return an error if failed to create payment', async () => {
    const req = {
      body: {
        // Invalid or missing data that causes an error
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Paiement.prototype.save.mockRejectedValue(new Error('Failed to save payment'));

    await createPaiement(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to create paiement' });
  });
});