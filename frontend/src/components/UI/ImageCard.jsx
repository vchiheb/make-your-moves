export default function ImageCard({
  imageName,
  href,
  title,
  altText,
  artistName,
  sourceUrl,
  children,
}) {
  return (
    <div className="card">
      <div className="card-image">
        <div className="credit">
          <a href={sourceUrl} target="_blank" rel="noreferrer">
            Artist: {artistName}
          </a>
        </div>
        <a href={href}>
          <img className="responsive-img" src={`${imageName}`} alt={altText} />
        </a>
        <div className="card-title">{title}</div>
      </div>
      <div className="card-content">
        <div>{children}</div>
      </div>
    </div>
  );
}
