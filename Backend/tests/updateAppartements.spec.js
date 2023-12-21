const Appartment = require("../models/appartementModel"); // Assuming you have a model for Appartment
const { updateAppartement } = require("../controllers/appartementController");

describe("updateAppartement", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      params: { id: "apartmentId" },
      body: {
        
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mocking the logError function
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update the apartment and return success message", async () => {
    const updatedData = {
      /* updated data */
    };
    const updatedApartment = {
      /* updated apartment object */
    };

    Appartment.findByIdAndUpdate = jest
      .fn()
      .mockResolvedValue(updatedApartment);

    await updateAppartement(req, res);

    expect(Appartment.findByIdAndUpdate).toHaveBeenCalledWith(
      "apartmentId",
      updatedData
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Apartment updated successfully",
    });
  });

  it("should return 404 error if apartment is not found", async () => {
    Appartment.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

    await updateAppartement(req, res);

    expect(Appartment.findByIdAndUpdate).toHaveBeenCalledWith(
      "apartmentId",
      req.body
    );
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Appartement not found" });
  });
  
  it("should return 500 error if there is an error updating the apartment", async () => {
    const error = new Error("Failed to update apartment");
    Appartment.findByIdAndUpdate = jest.fn().mockRejectedValue(error);

    await updateAppartement(req, res);

    expect(Appartment.findByIdAndUpdate).toHaveBeenCalledWith(
      "apartmentId",
      req.body
    );
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to update apartment",
    });
    expect(console.error).toHaveBeenCalledWith(
        "Error updating apartment:",
        error
      );
  });
});