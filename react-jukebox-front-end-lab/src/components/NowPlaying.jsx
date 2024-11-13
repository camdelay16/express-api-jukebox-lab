const NowPlaying = ({ currentTrack }) => {
  if (!currentTrack) {
    return <div>No Track Playing</div>;
  }
  return (
    <>
      <h2>Now Playing</h2>
      <p>Name: {currentTrack.title}</p>
      <p>Artist: {currentTrack.artist}</p>
    </>
  );
};

export default NowPlaying;
