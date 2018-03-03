import React, { Component } from 'react';

class Clients extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            clients: {
                1:{
                    name:'jean',
                    tel:'06050103',
                    mail:'aaa@aaa.fr'
                },
                2:{
                    name:'jean',
                    tel:'06050103',
                    mail:'aaa@aaa.fr'
                },
                3:{
                    name:'jean',
                    tel:'06050103',
                    mail:'aaa@aaa.fr'
                },
                4:{
                    name:'jean',
                    tel:'06050103',
                    mail:'aaa@aaa.fr'
                }
            }
         }
    }

    renderClients() {
        return Object.values(this.state.clients).map((client,index) => {
            return (
                <div>
                    <p className='text-danger'>{client.name}</p>
                    <p>{client.tel}</p>
                    <p>{client.mail}</p>
                </div>
            )
        })
    }

    render() { 
        return ( 
            <div>

            </div>
         )
    }
}
 
export default Clients;