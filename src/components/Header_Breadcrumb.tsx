import { Breadcrumb } from "antd";
import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  setFabricationState,
  setModelState,
  setScheduleState,
} from "../store/moduleStateSlice";
import { setLocation } from "../store/location";

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

const Breadcrumbs: FC = () => {
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
            <Link to={pathnames[0]}>{pathnames}</Link>
          ),
          menu: {
            items: MenuitemsProps.map((item) => ({
              title: (
                <Link
                  to={item.path}
                  onClick={() => {
                    item.title === "Model"
                      ? dispatch(setModelState())
                      : item.title === "Fabrication"
                      ? dispatch(setFabricationState())
                      : dispatch(setScheduleState());
                  }}
                >
                  {item.title}{" "}
                </Link>
              ),
            })),
          },
        },
        { title: "" },
      ]}
    />
  );
};
export default Breadcrumbs;
