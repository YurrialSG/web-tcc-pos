import React, { useEffect } from 'react';
import { Table, Tag } from 'antd';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import imgCat from '../images/cat.png';
import imgDog from '../images/dog.png';

function Cancel() {

    const columnsTablePendentes = [
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
                status === 'CANCELADO' ?
                    <Tag color={"volcano"} key={status} >
                        {status}
                    </Tag >
                    :
                    <>
                    </>
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

    const { data: dataCancel, loading, refetch } = useQuery(gql`
    query allServiceCancel {
        allServiceCancel {
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
            <h2>Lista de Serviços Pendentes</h2>
            <Table rowKey="uid" dataSource={dataCancel && dataCancel.allServiceCancel} loading={loading} size="middle" columns={columnsTablePendentes}
                pagination={{ defaultPageSize: 10, pageSizeOptions: ['10', '20', '40'], showSizeChanger: true }} />
        </>
    )
}

export default Cancel
