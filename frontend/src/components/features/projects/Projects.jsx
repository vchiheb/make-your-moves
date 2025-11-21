import Project from "./Project";

export default function Projects({ data }) {
  return (
    <>
      {data &&
        data.map((item, index) => {
          return (
            <div key={index}>
              <Project data={item} />
            </div>
          );
        })}
    </>
  );
}
