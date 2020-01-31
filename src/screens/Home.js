import React, { useEffect } from 'react'
import { Icon, Divider, Table, Button, Popconfirm, Progress } from 'antd'
import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'
import imgCat from '../images/cat.png';
import imgDog from '../images/dog.png';

function Home() {

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
                status === 'PENDENTE' ?
                    <Progress
                        strokeColor={{
                            from: '#108ee9',
                            to: '#87d068',
                        }}
                        percent={20} showInfo={false} status="active" />
                    :
                    <>
                    </>
            )
        },
        {
            title: 'Pagamento',
            dataIndex: 'payment',
            key: 'payment',
            render: payment => (
                payment === 'AGUARDANDO' ?
                    <>
                        <Progress type="circle" percent={0} width={20} status="exception" />
                        <Divider type="vertical" />
                        <Button onClick={handlePayment}><Icon type="dollar" style={{ color: '#108ee9' }} /> Pagar</Button>
                    </>
                    :
                    <>
                        <Progress type="circle" percent={100} width={20} />
                        <Divider type="vertical" />
                        <Progress type="circle" percent={100} width={20} />
                        <Divider type="vertical" />
                        <Progress type="circle" percent={100} width={20} />
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
        },
        {
            title: 'Ações',
            key: 'action',
            render: (data) => (
                <span>
                    <Button><Icon type="play-circle" style={{ color: '#108ee9' }} /> Iniciar Atendimento</Button>
                    <Divider type="vertical" />
                    <Popconfirm title="Certeza que deseja cancelar serviço?"
                        placement="bottomRight"
                        onConfirm={() => { }}
                    >
                        <Button><Icon type="close-circle" style={{ color: '#d32f2f' }} /> Cancelar</Button>
                    </Popconfirm>
                </span>
            )
        },
    ];

    const { data: dataPendente, loading, refetch } = useQuery(gql`
        query allServicePendente {
            allServicePendente {
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

    function handlePayment() {

    }


    return (
        <>
            <h2>Lista de Serviços Pendentes</h2>
            <Table rowKey="uid" dataSource={dataPendente && dataPendente.allServicePendente} loading={loading} size="middle" columns={columnsTablePendentes}
                pagination={{ defaultPageSize: 5, pageSizeOptions: ['5', '10'], showSizeChanger: true }} />
        </>
    )
}

export default Home
