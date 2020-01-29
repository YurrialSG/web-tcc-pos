import React, { useState, useEffect } from 'react'
import { Icon, Divider, Table, Button, notification, Popconfirm } from 'antd'
import { useQuery, useMutation } from 'react-apollo'
import gql from 'graphql-tag'
import InputAdmins from '../components/InputAdmins/index'

function Admins() {

    const columns = [
        {
            title: 'Nome',
            dataIndex: 'firstname',
            key: 'firstname',
        },
        {
            title: 'Sobrenome',
            dataIndex: 'lastname',
            key: 'lastname',
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Ações',
            key: 'action',
            render: (data) => (
                <span>
                    <Button><Icon type="edit" style={{ color: '#108ee9' }} /></Button>
                    <Divider type="vertical" />
                    <Popconfirm title="Certeza que deseja excluir?"
                        onConfirm={() => handleDelete(data['id'], data['firstname'])}
                    >
                        <Button><Icon type="delete" style={{ color: '#108ee9' }} /></Button>
                    </Popconfirm>
                </span>
            )
        },
    ];

    async function handleDelete(id, description) {
        const { errors } = await mutationDelete({
            variables: {
                id: id
            }
        })

        if (!errors) {
            notification.success({
                message: `Administrador: '${description}' excluido(a) com sucesso!`,
                style: {
                    width: 500,
                    marginLeft: 100 - 200,
                    marginTop: 50,
                },
            })
            refetch()
        }
    }

    const [active, setActive] = useState(false)

    const { data, loading, refetch } = useQuery(gql`
        query allUsersAdmin {
            allUsersAdmin {
                id
                firstname
                lastname
                email
                role
            }
        }
    `)

    const [mutationDelete] = useMutation(gql`
        mutation deleteUser($id: ID!) {
            deleteUser(id: $id)
        }  
    `)

    useEffect(() => {
        refetch()
    }, [active, refetch])


    return (
        <>
            {active ?
                <>
                    <Button type="danger" onClick={() => setActive(false)} 
                    style={{ 
                        marginBottom: 0, 
                        float: "right",
                        textAlign: "right"
                        }}>
                        X
                    </Button>
                    <InputAdmins />
                </>
                :
                <Button type="primary" onClick={() => setActive(true)} style={{ marginBottom: 16 }}>
                    Adicionar
                </Button>
            }
            <Table rowKey="uid" size="small" dataSource={data && data.allUsersAdmin} loading={loading} columns={columns} 
            pagination={{defaultPageSize: 5, pageSizeOptions: ['5', '10', '15', '20'], showSizeChanger: true}} />
        </>
    )
}

export default Admins