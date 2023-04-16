import "../assets/css/home.scss";

import SliderContext from "../components/sider/SiderContext";
import { Layout } from "antd";
import HeaderContext from "../components/header/HeaderContext";
import { getSession, removeSession } from "../API/session";
import ContentContext from "../components/content/ContentContext";
import { useNavigate} from "react-router-dom";
import { exitSession } from "../API/url";
const { Header, Footer, Sider, Content } = Layout;

export default function Home() {
  const navigate = useNavigate();
  if (!getSession("user")) {
  return  navigate("/", { replace: true });
  }
  const user = getSession("user");
  const {username} = user
  const {loginAbout:{rolePower}} = user
  const exit = () => {
    navigate("/", { replace: true });
    exitSession();
    removeSession("user");
  };
  return (
    <Layout id="home">
      <Sider width={260}>
        <SliderContext rolePower = {rolePower}></SliderContext>
      </Sider>
      <Layout>
        <Header>
          <HeaderContext username={username} exit={exit}></HeaderContext>
        </Header>
        <Content>
          <ContentContext></ContentContext>
        </Content>
        <Footer></Footer>
      </Layout>
    </Layout>
  );
}


