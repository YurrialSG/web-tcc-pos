import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'antd';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

function Pets() {

    const [pets, setPets] = useState([]);

    const { data } = useQuery(gql`
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
        if (data) {
            setPets(data.allPets)
        }
    })

    return (
        <div style={{ paddingTop: '15px' }}>
            <Row gutter={30}>
                {pets.map((pet, i) => {
                    return (
                        <Col span={4.5} key={i}>
                            <Card title={pet.pet} bordered={true} style={{ marginBottom: '10px' }}>
                                Nome: {pet.name}
                                <br />
                                Idade: {pet.age}
                                <br />
                                Raça: {pet.breed}
                                <br />
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}

export default Pets
