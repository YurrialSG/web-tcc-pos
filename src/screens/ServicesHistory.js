import React, { useEffect } from 'react'
import { Table, Tag } from 'antd'
import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'
import imgCat from '../images/cat.png';
import imgDog from '../images/dog.png';

function ServicesHistory() {

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
        }
    ];

    const { data, loading, refetch } = useQuery(gql`
        query allServiceConcluido {
            allServiceConcluido {
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

    useEffect(() => {
        refetch()
    }, [refetch])


    return (
        <>
            <Table rowKey="uid" dataSource={data && data.allServiceConcluido} loading={loading} size="middle" columns={columns}
                pagination={{ defaultPageSize: 10, pageSizeOptions: ['10', '20', '30', '40', '50'], showSizeChanger: true }} />
        </>
    )
}

export default ServicesHistory
