import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Button, Avatar } from '@material-ui/core/';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../images/logo.png'

const { Header, Sider, Content } = Layout;


const useStyles = makeStyles(theme => ({
  menuLateral: {
    flex: 1,
    backgroundColor: "#78909c",
    height: '100vh'
  },

  menuButtons: {
    backgroundColor: "#78909c",
    color: "#4f5b62",
  },

  menuItens: {
    backgroundColor: "#78909c",
    color: "#4f5b62",
    '&:hover': {
      backgroundColor: "#f5f5f5",
      color: "#000a12",
    }
  },

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
    backgroundColor: "#FFFFFF",
  },

  divNameButton: {
    float: "right",
    marginRight: 20,
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
      <Sider trigger={null} collapsible className={classes.menuLateral} collapsed={collapsed}>
        <div className={classes.divLogo}>
          <Avatar className={classes.avatar}>
            <img src={logo} alt="logo" width="40" height="40" />
          </Avatar>
          {collapsed ?
            <span className={classes.nameLogo}></span>
            :
            <span className={classes.nameLogo}>Pata Marca</span>
          }
        </div>
        <Menu className={classes.menuButtons} mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item className={classes.menuItens} key="1" onClick={handlePageHome}>
            <Icon type="user" />
            <span>Home</span>
          </Menu.Item>
          <Menu.Item className={classes.menuItens} key="2" onClick={handlePagePets}>
            <Icon type="video-camera" />
            <span>Pets</span>
          </Menu.Item>
          <Menu.Item className={classes.menuItens} key="3">
            <Icon type="upload" />
            <span>Serviços</span>
          </Menu.Item>
          <Menu.Item className={classes.menuItens} key="4" onClick={handlePageClients}>
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
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default HeaderMenu