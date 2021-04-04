import Part from "./Part";

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((e) => {
        return (
          <p key={e.id}>
            <Part part={e.name} exercise={e.exercises} />
          </p>
        );
      })}
    </div>
  );
};

export default Content;
