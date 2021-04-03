import Part from "./Part";

const Content = ({ course }) => {
  const { parts } = course;
  return (
    <div>
      {parts.map((e, i) => {
        return (
          <div>
            <Part key={i} part={e.name} exercise={e.exercises} />
            {parts.length - 1 !== i && <br />}
          </div>
        );
      })}
    </div>
  );
};

export default Content;
