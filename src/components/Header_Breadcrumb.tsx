import { Breadcrumb } from "antd";
import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setLocation } from "../store/location";
import { Project } from "../class/project";

const ModuelList = [
  {
    path: "/Model",
    title: "Model",
  },
  {
    path: "/Fabrication",
    title: "Fabrication",
  },
  {
    path: "/Schedule",
    title: "Schedule",
  },
];

interface IBreadcrumbProps {
  project?: Project;
}

const Breadcrumbs: FC<IBreadcrumbProps> = ({ project }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const isCurrent = pathnames.length === 1;
  const MenuitemsProps = ModuelList.filter(
    (item) => item.title != pathnames[0]
  );

  useEffect(() => {
    dispatch(setLocation(pathnames[0]));
  });

  return (
    <Breadcrumb
      items={[
        { title: "Home" },
        {
          title: isCurrent ? (
            <span>{pathnames}</span>
          ) : (
            <Link to={`/${pathnames[0]}`}>{pathnames[0]}</Link>
          ),
          menu: {
            items: MenuitemsProps.map((item) => ({
              title: <Link to={item.path}>{item.title} </Link>,
            })),
          },
        },
        pathnames.length > 1
          ? { title: `Project: ${project?.name}` }
          : { title: "" },
      ]}
    />
  );
};
export default Breadcrumbs;
