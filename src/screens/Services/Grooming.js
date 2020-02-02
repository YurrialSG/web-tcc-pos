import React, { useEffect } from 'react'
import { Icon, Divider, Table, Button, Progress, notification } from 'antd'
import { useQuery, useMutation } from 'react-apollo'
import gql from 'graphql-tag'

function Grooming() {

    async function handleService(id, status) {
        const { errors } = await mutationUpdate({
            variables: {
                id: id,
                data: {
                    status: status
                }
            }
        })

        if (!errors) {
            refetch()
            window.location.reload()
        }
    }

    async function handlePay(id) {
        const { errors } = await mutationUpdate({
            variables: {
                id: id,
                data: {
                    payment: "PAGO"
                }
            }
        })

        if (!errors) {
            notification.success({
                message: `Pagamento realizado com sucesso!`,
                style: {
                    width: 350,
                    marginLeft: 50,
                    marginTop: 50,
                },
            })
            refetch()
        }
    }

    const columnsTableTosa = [
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
                status === 'TOSA' ?
                    <Progress
                        strokeColor={{
                            from: '#108ee9',
                            to: '#87d068',
                        }}
                        percent={100} showInfo={false} status="active" />
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
            title: 'Ações',
            dataIndex: 'payment',
            render: (payment, data) => (
                payment === 'PAGO' ?
                    <>
                        <Button onClick={() => handleService(data['id'], 'CONCLUIDO')} type="primary"><Icon type="play-circle" style={{ color: '#FFFFFF' }} /> Finalizar Serviço</Button>
                        <Divider type="vertical" />
                        <Button onClick={() => handleService(data['id'], 'BANHO')} type="dashed" shape="round"><Icon type="scissor" style={{ color: '#108ee9' }} /> Banho </Button>
                    </>
                    :
                    <>
                        <Button onClick={() => handlePay(data['id'])}><Icon type="dollar" style={{ color: '#108ee9' }} /> Pagar</Button>
                        <Divider type="vertical" />
                        <Button onClick={() => handleService(data['id'], 'BANHO')} type="dashed" shape="round"><Icon type="scissor" style={{ color: '#108ee9' }} /> Banho </Button>
                    </>
            )
        },
    ];

    const { data: dataTosa, loadingTosa, refetch } = useQuery(gql`
        query allServiceTosa {
            allServiceTosa {
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

    const [mutationUpdate] = useMutation(gql`
        mutation updateService($id: ID! $data: UpdateServiceInput) {
            updateService(id: $id, data: $data) {
                id
                date
                schedule
                status
                payment
            }
        }  
    `)

    useEffect(() => {
        refetch()
    }, [refetch])

    return (
        <div>
            <h2>Tosa</h2>
            <Table rowKey="uid" dataSource={dataTosa && dataTosa.allServiceTosa} loading={loadingTosa} size="middle" columns={columnsTableTosa}
                pagination={{ defaultPageSize: 3, pageSizeOptions: ['3', '5', '10'], showSizeChanger: true }} />
        </div>
    )
}

export default Grooming
