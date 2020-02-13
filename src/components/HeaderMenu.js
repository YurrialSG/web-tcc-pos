import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Icon, Popconfirm, Divider } from 'antd';
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
    color: "#4f5b60",
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

  const names = [];

  const handleDrawer = () => {
    setCollapsed(!collapsed);
  };

  const handlePageHome = () => {
    names.push("Home")
    localStorage.setItem("locais", JSON.stringify(names));
    history.push("/home")
  };

  const handlePageAdmins = () => {
    names.push("Home / Admins")
    localStorage.setItem("locais", JSON.stringify(names));
    history.push("/admins")
  }

  const handlePageClients = () => {
    names.push("Home / Clients")
    localStorage.setItem("locais", JSON.stringify(names));
    history.push("/clients")
  }

  const handlePagePets = () => {
    names.push("Home / Pets")
    localStorage.setItem("locais", JSON.stringify(names));
    history.push("/pets")
  };

  const handlePageServices = () => {
    names.push("Home / Services")
    localStorage.setItem("locais", JSON.stringify(names));
    history.push("/services")
  };

  const handlePageHistory = () => {
    names.push("Home / History")
    localStorage.setItem("locais", JSON.stringify(names));
    history.push("/history")
  }

  const handlePageCancel = () => {
    names.push("Home / Cancel")
    localStorage.setItem("locais", JSON.stringify(names));
    history.push("/cancel")
  }

  async function handleLogout() {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      localStorage.clear()
      console.log('Localstorage limpo')
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
            <Icon type="home" />
            <span>Home</span>
          </Menu.Item>
          <Menu.Item className={classes.menuItens} key="2" onClick={handlePageServices}>
            <Icon type="carry-out" />
            <span>Serviços</span>
          </Menu.Item>
          <Menu.Item className={classes.menuItens} key="3" onClick={handlePagePets}>
            <Icon type="bug" />
            <span>Pets</span>
          </Menu.Item>
          <Menu.Item className={classes.menuItens} key="4" onClick={handlePageClients}>
            <Icon type="user" />
            <span>Clientes</span>
          </Menu.Item>
          <Menu.Item className={classes.menuItens} key="5" onClick={handlePageCancel}>
            <Icon type="history" />
            <span>Serviços cancelados</span>
          </Menu.Item>
          <Menu.Item className={classes.menuItens} key="6" onClick={handlePageHistory}>
            <Icon type="history" />
            <span>Historico de Serviços</span>
          </Menu.Item>
          <Divider type="horizontal" />
          <Menu.Item className={classes.menuItens} key="7" onClick={handlePageAdmins}>
            <Icon type="dingding" />
            <span>Administradores</span>
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
            <span className={classes.nameUser}>{
            JSON.parse(localStorage.getItem("user")).firstname
            + " " +
            JSON.parse(localStorage.getItem("user")).lastname
            }</span>
            <Popconfirm title="Certeza que deseja sair?"
              placement="topRight"
              icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
              onConfirm={() => handleLogout()}>
              <Button className={classes.buttonLogout}>
                Sair
              </Button>
            </Popconfirm>
          </div>
        </Header>
        <Breadcrumb style={{ margin: '16px 0px 0px 16px' }}>
          <Breadcrumb.Item>{JSON.parse(localStorage.getItem("locais"))}</Breadcrumb.Item>
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