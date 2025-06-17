// backend/src/models/Booking.js
const { Pool } = require('pg');
const pool = require('../utils/database');

class Booking {
  static async create(bookingData) {
    const {
      userId,
      driverId,
      pickupLocation,
      destinationLocation,
      vehicleType,
      estimatedFare,
      status = 'pending'
    } = bookingData;

    const query = `
      INSERT INTO bookings 
      (user_id, driver_id, pickup_location, destination_location, vehicle_type, estimated_fare, status, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
      RETURNING *
    `;

    try {
      const result = await pool.query(query, [
        userId, driverId, pickupLocation, destinationLocation, vehicleType, estimatedFare, status
      ]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }

  static async findById(id) {
    const query = `
      SELECT b.*, u.name as user_name, u.phone as user_phone,
             d.name as driver_name, d.phone as driver_phone, d.vehicle_info
      FROM bookings b
      LEFT JOIN users u ON b.user_id = u.id
      LEFT JOIN drivers d ON b.driver_id = d.id
      WHERE b.id = $1
    `;

    try {
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }

  static async updateStatus(id, status) {
    const query = `
      UPDATE bookings 
      SET status = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING *
    `;

    try {
      const result = await pool.query(query, [status, id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }
}

module.exports = Booking;
