import React, { useState, useEffect } from 'react'
import { Icon, Divider, Table, Button, notification, Popconfirm } from 'antd'
import { useQuery, useMutation } from 'react-apollo'
import gql from 'graphql-tag'

function Clients() {

    const columns = [
        {
            title: 'Nome',
            dataIndex: 'firstname',
            key: 'firstname',
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Endereço',
            dataIndex: 'address.street',
            key: 'address',
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
                message: `Cliente: '${description}' excluido(a) com sucesso!`,
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
        query allUsers {
            allUsers {
                id
                firstname
                lastname
                email
                role
                address {
                    id
                    street
                    number
                    complement
                    zip_code
                }
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
            <Button type="primary" onClick={() => setActive(true)} style={{ marginBottom: 16 }}>
                Adicionar
            </Button>
            <Table rowKey="uid" dataSource={data && data.allUsers} loading={loading} columns={columns} pagination={true} />
        </>
    )
}

export default Clients