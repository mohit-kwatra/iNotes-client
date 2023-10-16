import React from "react";
import AddNoteForm from "../components/AddNoteForm";
import Notes from "../components/Notes";
import AnimatedPage from "../components/AnimatedPage";

const Home = () => {
  return (
    <>
      <AnimatedPage>
        <AddNoteForm />
        <Notes />
      </AnimatedPage>
    </>
  );
};

export default Home;
