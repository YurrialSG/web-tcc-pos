import React, { useEffect } from 'react'
import { Icon, Divider, Table, Button, Progress } from 'antd'
import { useQuery, useMutation } from 'react-apollo'
import gql from 'graphql-tag'

function WaitingRoom() {

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

    const columnsTableSala = [
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
                status === 'ESPERA' ?
                    <Progress
                        strokeColor={{
                            from: '#108ee9',
                            to: '#87d068',
                        }}
                        percent={40} showInfo={false} size="small" status="active" />
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
            key: 'action',
            render: (data) => (
                <span>
                    <Button onClick={() => handleService(data['id'], 'TOSA')} type="dashed" shape="round"><Icon type="scissor" style={{ color: '#108ee9' }} /> Tosa </Button>
                    <Divider type="vertical" />
                    <Button onClick={() => handleService(data['id'], 'BANHO')} type="dashed" shape="round"><Icon type="box-plot" style={{ color: '#108ee9' }} /> Banho </Button>
                </span>
            )
        },
    ];

    const { data: dataSala, loadingSala, refetch } = useQuery(gql`
    query allServiceSala {
            allServiceSala {
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
            <h2>Sala de Espera</h2>
            <Table rowKey="id" dataSource={dataSala && dataSala.allServiceSala} loading={loadingSala} size="middle" columns={columnsTableSala}
                pagination={{ defaultPageSize: 3, pageSizeOptions: ['3', '5', '10'], showSizeChanger: true }} />
        </div>
    )
}

export default WaitingRoom
