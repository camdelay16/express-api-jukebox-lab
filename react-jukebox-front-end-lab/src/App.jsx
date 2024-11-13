// src/App.jsx
import { useState, useEffect } from "react";
import TrackList from "./components/TrackList";
import TrackForm from "./components/TrackForm";
import TrackDetail from "./components/TrackDetail";
import NowPlaying from "./components/NowPlaying";
import * as trackService from "./services/trackService";

const App = () => {
  const [trackList, setTrackList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    const getTracks = async () => {
      try {
        const tracks = await trackService.index();
        if (tracks.error) {
          throw new Error(tracks.error);
        }
        setTrackList(tracks);
      } catch (error) {
        console.log(error);
      }
    };
    getTracks();
  }, []);

  const handlePlayTrack = (track) => {
    setCurrentTrack(track);
  };

  const updateSelected = (track) => {
    setSelected(track);
  };

  const handleFormView = (track) => {
    if (!track.title) setSelected(null);
    setIsFormOpen(!isFormOpen);
  };

  const handleAddTrack = async (formData) => {
    try {
      const newTrack = await trackService.create(formData);
      if (newTrack.error) {
        throw new Error(newTrack.error);
      }
      setTrackList([newTrack, ...trackList]);
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateTrack = async (formData, trackId) => {
    try {
      const updatedTrack = await trackService.update(formData, trackId);
      if (updatedTrack.error) {
        throw new Error(updatedTrack.error);
      }
      const updatedTrackList = trackList.map((track) =>
        track._id !== updatedTrack._id ? track : updatedTrack
      );
      setTrackList(updatedTrackList);
      setSelected(updatedTrack);
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveTrack = async (trackId) => {
    try {
      await trackService.deleteTrack(trackId);
      setTrackList(trackList.filter((track) => track._id !== trackId));
      setSelected(null);
      setIsFormOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TrackList
        trackList={trackList}
        updateSelected={updateSelected}
        handleFormView={handleFormView}
        handlePlayTrack={handlePlayTrack}
        isFormOpen={isFormOpen}
      />
      {isFormOpen ? (
        <TrackForm
          handleAddTrack={handleAddTrack}
          handleUpdateTrack={handleUpdateTrack}
          selected={selected}
        />
      ) : (
        <TrackDetail
          selected={selected}
          handleFormView={handleFormView}
          handleRemoveTrack={handleRemoveTrack}
        />
      )}
      <NowPlaying currentTrack={currentTrack} />
    </>
  );
};

export default App;
