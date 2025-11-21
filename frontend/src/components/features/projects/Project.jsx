import ProjectToolbar from "../../UI/toolbars/ProjectToolbar";
import Tasks from "./Tasks";
import Goals from "./Goals";
import NewGoal from "./NewGoal";
import NewTask from "./NewTask";

import ImageCard from "../../UI/elements/ImageCard";

export default function Project({ data }) {
  return (
    <>
      {data && Object.keys(data).length > 0 && (
        <ImageCard
          imageName={data.coverImage ? data.coverImage.fileName : ""}
          href={`/projects/${data._id}`}
          title={data.title}
        >
          <div className="row" style={{ position: "relative" }}>
            <div className="col s10 m11">{data.description}</div>
            <div
              className="col s1 m1 project-toolbar"
              style={{ position: "relative" }}
            >
              <ProjectToolbar project={data} />
            </div>
          </div>

          <NewTask project={data} />
          <Tasks data={data.tasks} projectId={data._id} />
          <NewGoal project={data} />
          <Goals data={data.goals} projectId={data._id} />
        </ImageCard>
      )}
    </>
  );
}
