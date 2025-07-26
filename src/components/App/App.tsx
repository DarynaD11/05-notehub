import css from "./App.module.css";
import NoteList from "../NoteList/NoteList";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import { useDebouncedCallback } from "use-debounce";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [SearchInput, setSearchInput] = useState("");
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, SearchInput],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search: SearchInput,
      }),
    placeholderData: keepPreviousData,
  });

  const updateSearchInput = useDebouncedCallback(setSearchInput, 300);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={SearchInput} onSearch={updateSearchInput} />
        {data && data.totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {data && !isLoading && <NoteList notes={data.notes} />}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCloseModal={() => setIsModalOpen(false)} />{" "}
        </Modal>
      )}
    </div>
  );
}
