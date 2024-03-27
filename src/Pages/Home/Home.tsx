import { Layout } from "antd";
import { FC, useEffect } from "react";
import useLayoutStyle from "../layoutStyle";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLocation } from "../../store/location";
import { setNoneState } from "../../store/moduleStateSlice";
import HomeContent from "./HomeContent";

const { Content } = Layout;

const Home: FC = () => {
  const { styles } = useLayoutStyle();

  const dispatch = useDispatch();

  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  useEffect(() => {
    dispatch(setLocation(pathnames[0]));
    dispatch(setNoneState());
  });
  return (
    <Layout>
      {/* <Header className={styles.header}>
        <Breadcrumb items={[{ title: "Home" }]} />
      </Header> */}
      <Content className={styles.content} style={{ height: "100vh" }}>
        <HomeContent />
      </Content>
    </Layout>
  );
};

export default Home;
