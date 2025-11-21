import Task from "./Task";

export default function Tasks({ data, projectId }) {
  return (
    <>
      {data &&
        data.map((item, index) => (
          <Task data={item} key={index} projectId={projectId} />
        ))}
    </>
  );
}
