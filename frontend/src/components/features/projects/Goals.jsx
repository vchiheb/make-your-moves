import Goal from "./Goal";

export default function Goals({ data, projectId }) {
  console.log("data 1: ", data);
  return (
    <>
      {data &&
        data.map((item, index) => (
          <Goal data={item} key={index} projectId={projectId} />
        ))}
    </>
  );
}
