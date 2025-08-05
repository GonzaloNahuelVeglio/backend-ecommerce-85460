import { TicketModel } from '../models/Ticket.js';

export class TicketDAO {
  async findAll() {
    return TicketModel.find();
  }

  async findById(id) {
    return TicketModel.findById(id);
  }

  async create(ticketData) {
    return TicketModel.create(ticketData);
  }

  async findByCode(code) {
    return TicketModel.findOne({ code });
  }
}
