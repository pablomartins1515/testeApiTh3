import elevatyLogo from '../../assets/elevatyLogo.png';
import { MagnifyingGlass,  CaretDown, Trash } from 'phosphor-react';
import { HeaderContainer, FormStyles, ButtonSearch, Table } from './styles';

import { useClients } from '../../hooks/useClients';
import { Disclosure } from '@headlessui/react'
import { useState } from 'react';

export function Home() {
  const [startBirthday, setStartBirthday] = useState("1990-01-01");
  const [endBirthday, setEndBirthday] = useState("2000-12-31");
  const { clients, setFilteredClients, /*filteredClients,*/ isFetching, handleButtonSearchClick,  } = useClients(startBirthday, endBirthday);
  
  function handleStartBirthdayChange(event: React.ChangeEvent<HTMLInputElement>) {
    setStartBirthday(event.target.value);
  }
  
  function handleEndBirthdayChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEndBirthday(event.target.value);
  }

  function handleDeleteClick(id: number) {
    const updatedClients = clients?.filter((client) => client.id !== id);
    setFilteredClients(updatedClients);
    
  }

   return (    
    <div>
      <HeaderContainer> 
        <img src = {elevatyLogo} alt="Logo Elevaty" />

        <FormStyles>
          <input type="date" color='#fff' value={startBirthday} onChange={handleStartBirthdayChange} />
          <input type="date" value={endBirthday} onChange={handleEndBirthdayChange}/>
          <ButtonSearch type="button" onClick={handleButtonSearchClick} disabled={isFetching}>
            <MagnifyingGlass size={23} color='#FFF' weight='bold' />
          </ButtonSearch>
        </FormStyles>

      </HeaderContainer>    
     
      <Table>      
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Data de nascimento</th> 
            <th></th>
            <th></th>           
          </tr>
        </thead>       
       
        <tbody>
          {clients?.map((item) => (   
            <Disclosure key={item.id}>
              {({  }) => (
                <>
                  <Disclosure.Button >
                    <td key={item.id}>{item.firstname + ' ' + item.lastname}</td>                       
                    <td>{item.birthday}</td> 

                    <td><button><CaretDown size={23} weight="bold" color='#808080' /></button></td> 

                    <td><button onClick={() => handleDeleteClick(item.id)}><Trash size={23} weight="fill" color='#808080'/></button></td>                    
                  </Disclosure.Button>
                  
                  <Disclosure.Panel > 
                    <p><strong>Dados Pessoais:</strong></p>                   
                    <p> Nome Completo: {item.firstname + ' ' + item.lastname}</p>
                    <p> Email: {item.email}</p>
                    <p>Data de nascimento: {item.birthday}</p>
                    <p>Telefone: {item.phone}</p>
                    <br />

                    <p><strong>Endereço:</strong></p>
                    <p>Rua: {item.addresses.streetName}</p>
                    <p>Cidade: {item.addresses.city}</p>
                    <p>Código Postal: {item.addresses.zipcode}</p>
                    <br /> 
                    
                    <p><strong>Carão de Crédito</strong></p>                   
                    <p> Número do Cartão: {item.creditCard.number}</p>
                    <p> Data de expiração: {item.creditCard.expiration}</p>
                    <p>Bandeira: {item.creditCard.type}</p>

                  </Disclosure.Panel>
                </>
              )}
            </Disclosure> 
          ))}      
        </tbody>        
                
      </Table>   
    </div>    
  )
}
