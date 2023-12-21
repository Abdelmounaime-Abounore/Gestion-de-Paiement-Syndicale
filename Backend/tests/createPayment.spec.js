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

        const mockError = new Error('Failed to save payment');
        Paiement.prototype.save.mockRejectedValue(mockError);

        // Use try-catch to catch the thrown error
        try {
            await createPaiement(req, res);
        } catch (error) {
            // Verify that the error is the same instance as the one thrown
            expect(error).toBe(mockError);
        }

        // Verify that the response status and json functions are called with the appropriate values
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Failed to create paiement' });
    });
});