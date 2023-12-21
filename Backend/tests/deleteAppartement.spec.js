const deleteAppartement = require('../controllers/appartementController').deleteAppartement;
const Appartment = require('../models/appartementModel');

jest.mock('../models/appartementModel.js');

describe('deleteAppartement', () => {
  it('should delete an existing appartement', async () => {
    const mockAppartement = {
      _id: 'some_id',
      deleteOne: jest.fn().mockResolvedValue({}), 
    };

    const req = {
      params: {
        id: 'some_id' 
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Appartment.findById.mockResolvedValue(mockAppartement);

    await deleteAppartement(req, res);

    expect(Appartment.findById).toHaveBeenCalledWith('some_id');
    expect(mockAppartement.deleteOne).toHaveBeenCalled(); 
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Appartement deleted successfully' });
  });

});