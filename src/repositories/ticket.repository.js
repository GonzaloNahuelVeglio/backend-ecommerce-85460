import { TicketDAO } from '../daos/ticket.dao.js';

export class TicketRepository {
  constructor() {
    this.ticketDao = new TicketDAO();
  }

  async getAllTickets() {
    return this.ticketDao.findAll();
  }

  async getTicketById(id) {
    return this.ticketDao.findById(id);
  }

  async createTicket(ticketData) {
    return this.ticketDao.create(ticketData);
  }

  async getTicketByCode(code) {
    return this.ticketDao.findByCode(code);
  }
}
