import { useCalendarStore, useUiStore } from "../../hooks";

export const FabDelete = () => {
  const { startDeletingEvent, activeEvent } = useCalendarStore();
  const { closeDateModal } = useUiStore();
  const handleClickDelete = () => {
    startDeletingEvent(activeEvent.id);
    closeDateModal();
  };

  return (
    activeEvent?.id && (
      <button className="btn btn-danger fab-danger" onClick={handleClickDelete}>
        <i className="fas fa-trash-alt"></i>
      </button>
    )
  );
};
