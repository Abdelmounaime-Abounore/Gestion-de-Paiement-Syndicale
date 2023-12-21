const createClient = require('../controllers/clientController').createClient;
const Client = require('../models/clientModel');

jest.mock('../models/clientModel');

describe('createClient', () => {
    it('should return an error response when validation fails', async () => {
        const req = {
          body: {
            
          },
        };
      
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
      
        await createClient(req, res);
      
        // Adjust the expectation to match the error message thrown by the validation logic
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid name or CIN format' });
      });

  it('should create a new client', async () => {
    const req = {
      body: {
        name: 'John Doe',
        cin: '1234567890',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockSavedClient = {
      name: 'John Doe',
      cin: '1234567890',
    };

    Client.prototype.save.mockResolvedValue(mockSavedClient);

    await createClient(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockSavedClient);
  });
});