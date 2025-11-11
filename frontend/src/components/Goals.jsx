export default function Goals({ data }) {
  return (
    <>
      <div className="row">
        {data.map((item, index) => (
          <div key={index} className="col">
            {item.title}
          </div>
        ))}
      </div>
    </>
  );
}
