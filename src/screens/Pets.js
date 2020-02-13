import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'antd';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

function Pets() {

    const [pets, setPets] = useState([]);

    const { data, refetch } = useQuery(gql`
    query allPets {
        allPets {
            id
            name
            age
            breed
            pet
            user {
                id
                firstname
                lastname
                email
            }
        }
    }
`)

    useEffect(() => {
        refetch()
        if (data) {
            setPets(data.allPets)
        }
    }, [data, refetch])

    return (
        <div style={{ paddingTop: '15px' }}>
            <Row gutter={30}>
                {pets.map((pet, i) => {
                    return (
                        <Col span={8} key={i}>
                            <Card title={pet.user.firstname + " " + pet.user.lastname} bordered={true} style={{ marginBottom: '10px' }}>
                                {pet.pet}
                                <br />
                                Nome: {pet.name}
                                <br />
                                Idade: {pet.age}
                                <br />
                                Raça: {pet.breed}
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}

export default Pets
