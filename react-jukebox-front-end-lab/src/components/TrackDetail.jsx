const TrackDetail = (props) => {
  const { selected, handleFormView, handleRemoveTrack } = props;
  if (!selected) {
    return (
      <div>
        <h1>No Details</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>{selected.title}</h1>
      <h2>{selected.artist}</h2>
      <button onClick={() => handleFormView(selected)}>Edit</button>
      <button onClick={() => handleRemoveTrack(selected._id)}>Delete</button>
    </div>
  );
};

export default TrackDetail;
