export const CalendarEvent = ({ event }) => {
  const { title, user } = event;
  return (
    <div>
      <h6>{title}</h6>
      <p>
        {user.name} {user.lastName}
      </p>
    </div>
  );
};
