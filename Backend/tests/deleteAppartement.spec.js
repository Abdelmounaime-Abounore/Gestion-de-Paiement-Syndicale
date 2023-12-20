const deleteAppartement = require('../controllers/appartementController').deleteAppartement;
const Appartment = require('../models/appartementModel');

jest.mock('../models/appartementModel.js');

describe('deleteAppartement', () => {
  it('should delete an existing appartement', async () => {
    const mockAppartement = {
      _id: 'some_id',
      deleteOne: jest.fn().mockResolvedValue({}), // Mocking deleteOne method
      // Other properties based on your model structure
    };

    const req = {
      params: {
        id: 'some_id' // Replace with a valid ID
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Mock Appartment model's findById to return the mockAppartement
    Appartment.findById.mockResolvedValue(mockAppartement);

    await deleteAppartement(req, res);

    expect(Appartment.findById).toHaveBeenCalledWith('some_id');
    expect(mockAppartement.deleteOne).toHaveBeenCalled(); // Check deleteOne is called
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Appartement deleted successfully' });
  });

  // Additional test cases...
});