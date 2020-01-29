import React, { useEffect } from 'react'
import { Icon, Divider, Table, Button, Popconfirm, Tag } from 'antd'
import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'
import imgCat from '../images/cat.png';
import imgDog from '../images/dog.png';

function Services() {

    const columns = [
        {
            title: 'Data',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Horário',
            dataIndex: 'schedule',
            key: 'schedule',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: status => (
                status === 'PENDENTE' ?
                    <Tag color={"volcano"} key={status} >
                        {status}
                    </Tag >
                    :
                    <Tag color={"green"} key={status} >
                        {status}
                    </Tag >
            )
        },
        {
            title: 'Pagamento',
            dataIndex: 'payment',
            key: 'payment',
            render: payment => (
                payment === 'AGUARDANDO' ?
                    <Tag color={"purple"} key={payment} >
                        {payment}
                    </Tag >
                    :
                    <Tag color={"cyan"} key={payment} >
                        {payment}
                    </Tag >
            )
        },
        {
            title: 'Pet',
            dataIndex: 'pet.name',
            key: 'pet.name',
        },
        {
            title: 'Raça',
            dataIndex: 'pet.breed',
            key: 'pet.breed',
        },
        {
            title: 'Tipo',
            dataIndex: 'pet.pet',
            key: 'pet.pet',
            render: pet => (
                pet === 'CACHORRO' ?
                    <img src={imgDog} alt="logo" style={{ width: "38px", height: "38px" }} />
                    :
                    <img src={imgCat} alt="logo" style={{ width: "38px", height: "38px" }} />
            )
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
        // const { errors } = await mutationDelete({
        //     variables: {
        //         id: id
        //     }
        // })

        // if (!errors) {
        //     notification.success({
        //         message: `Cliente: '${description}' excluido(a) com sucesso!`,
        //         style: {
        //             width: 500,
        //             marginLeft: 100 - 200,
        //             marginTop: 50,
        //         },
        //     })
        //     refetch()
        // }
    }

    const { data, loading, refetch } = useQuery(gql`
        query allServiceStart {
            allServiceStart {
                id
                date
                schedule
                status
                payment
                pet {
                    id
                    name
                    age
                    breed
                    pet
                }
            }
        }
    `)

    // const [mutationDelete] = useMutation(gql`
    //     mutation deleteUser($id: ID!) {
    //         deleteUser(id: $id)
    //     }  
    // `)

    useEffect(() => {
        refetch()
    }, [refetch])


    return (
        <>
            <Table rowKey="uid" dataSource={data && data.allServiceStart} loading={loading} size="middle" columns={columns} 
            pagination={{defaultPageSize: 5, pageSizeOptions: ['5', '10', '15', '20'], showSizeChanger: true}}  />
        </>
    )
}

export default Services
