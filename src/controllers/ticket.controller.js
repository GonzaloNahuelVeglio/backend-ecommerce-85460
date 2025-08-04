import { TicketModel } from '../models/Ticket.js';

export const createTicket = async (req, res) => {
  try {
    const { code, amount, purchaser, products } = req.body;
    if (!code || !amount || !purchaser || !products) {
      return res.status(400).json({ message: 'Faltan campos requeridos.' });
    }
    const exists = await TicketModel.findOne({ code });
    if (exists) return res.status(409).json({ message: 'El código de ticket ya existe.' });
    const ticket = await TicketModel.create({ code, amount, purchaser, products });
    res.status(201).json({ message: 'Ticket creado.', ticket });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear ticket.' });
  }
};

export const getTickets = async (req, res) => {
  try {
    const tickets = await TicketModel.find();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener tickets.' });
  }
};

export const getTicketById = async (req, res) => {
  try {
    const { tid } = req.params;
    const ticket = await TicketModel.findById(tid);
    if (!ticket) return res.status(404).json({ message: 'Ticket no encontrado.' });
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener ticket.' });
  }
};
