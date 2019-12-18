import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Button, Avatar } from '@material-ui/core/';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../images/logo.png'

const { Header, Sider, Content } = Layout;


const useStyles = makeStyles(theme => ({
  trigger: {
    fontSize: 18,
    paddingLeft: 24,
    cursor: "pointer",
    '&:hover': {
      color: "#1890ff",
    }
  },

  divLogo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 16,
    height: 32,
    textAlign: "right",
  },

  nameLogo: {
    position: "absolute",
    top: 25,
    right: 40,
    color: "#FFFFFFFF",
    fontWeight: "bold",
    fontFamily: "sans-serif",
    fontSize: 17,
  },

  avatar: {
    backgroundColor: "rgba(0,0,0,0.1)",
  },

  divNameButton: {
    position: "absolute",
    top: 0,
    right: 10,
    textAlign: "right"
  },

  buttonLogout: {
    backgroundColor: '#199999',
    color: "#FFFFFF",
    '&:hover': {
      backgroundColor: "#1890ff",
    }
  },

  nameUser: {
    fontFamily: "monospace",
    fontWeight: "bold",
    marginRight: 20,
  }
}));

function HeaderMenu({ children }) {

  const classes = useStyles();
  const history = useHistory();

  const handleDrawer = () => {
    setCollapsed(!collapsed);
  };

  const handlePageHome = () => {
    history.push("/home")
  };

  const handlePageClients = () => {
    history.push("/clients")
  }

  const handlePagePets = () => {
    history.push("/pets")
  };

  function handleLogout() {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
    history.push("*")
  }

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={classes.divLogo}>
          <Avatar className={classes.avatar}>
            <img src={logo} alt="logo" width="40" height="40" />
          </Avatar>
          <span className={classes.nameLogo}>Pata Marca</span>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" onClick={handlePageHome}>
            <Icon type="user" />
            <span>Home</span>
          </Menu.Item>
          <Menu.Item key="2" onClick={handlePagePets}>
            <Icon type="video-camera" />
            <span>Pets</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="upload" />
            <span>Serviços</span>
          </Menu.Item>
          <Menu.Item key="4" onClick={handlePageClients}>
            <Icon type="upload" />
            <span>Clientes</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{
        background: 'rgba(255, 255, 255, 0.4)',
      }}>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Icon
            className={classes.trigger}
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={handleDrawer}
          />
          <div className={classes.divNameButton}>
            <span className={classes.nameUser}>Yuri Gonçalves da Silveira</span>
            <Button className={classes.buttonLogout}
              onClick={handleLogout}
            >
              Sair
            </Button>
          </div>
        </Header>
        <Breadcrumb style={{ margin: '16px 0px 0px 16px' }}>
          <Breadcrumb.Item>Login</Breadcrumb.Item>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{
            margin: '16px 0px 0px 0px',
            padding: 24,
            background: '#fff',
            height: 473
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default HeaderMenu