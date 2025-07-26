import axios from "axios";
import type { Note, NewNoteData } from "../types/note";

interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

const axiosBase = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = "",
}: FetchNotesParams): Promise<NotesHttpResponse> => {
  const response = await axiosBase.get<NotesHttpResponse>("/notes", {
    params: {
      page,
      perPage,
      ...(search && { search }),
    },
  });

  return response.data;
};

export const createNote = async (noteData: NewNoteData) => {
  const response = await axiosBase.post<Note>(
    "https://notehub-public.goit.study/api/notes",
    noteData,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    }
  );
  return response.data;
};

export const deleteNote = async (noteId: number) => {
  await axiosBase.delete(`/notes/${noteId}`);
};
