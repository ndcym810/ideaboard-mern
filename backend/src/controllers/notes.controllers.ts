import { Request, Response, RequestHandler } from "express";
import Note from "../models/Note.model.js";

export const getAllNotes: RequestHandler = async (
  _: Request,
  res: Response
) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    console.log("Notes fetched successfully", notes);
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller", error);
    res.status(500).json({ message: "Error fetching notes" });
  }
};

export const getNoteById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).json({ message: "Note not found" });
      return;
    }
    res.status(200).json(note);
  } catch (error) {
    console.error("Error in getNoteById controller", error);
    res.status(500).json({ message: "Error fetching note" });
  }
};

export const createNote: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const note = new Note(req.body);
    await note.save();
    console.log("Note created successfully", note);
    res.status(201).json({ message: "Note created successfully", note });
  } catch (error) {
    console.error("Error in createNote controller", error);
    res.status(500).json({ message: "Error creating note" });
  }
};

export const updateNote: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedNote) {
      res.status(404).json({ message: "Note not found" });
      return;
    }
    console.log("Note updated successfully", updatedNote);
    res.status(200).json({ message: "Note updated successfully", updatedNote });
  } catch (error) {
    console.error("Error in updateNote controller", error);
    res.status(500).json({ message: "Error updating note" });
  }
};

export const deleteNote: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      res.status(404).json({ message: "Note not found" });
      return;
    }
    console.log("Note deleted successfully");
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error in deleteNote controller", error);
    res.status(500).json({ message: "Error deleting note" });
  }
};
