import React, { useEffect, useState } from "react";

const ToDoList = () => {

    const [toDo,setToDo] = useState('¿Qué falta hacer?')
        const [toDoArray,setToDoArray] = useState([])
        const [lista, setLista] = useState([])

    const crearUsuario = async() => {
        const response = await fetch('https://assets.breatheco.de/apis/fake/todos/user/nessarz', {
            method: "POST",
            body: JSON.stringify([]),
            headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await response.json()
    console.log(data)
    }

    useEffect(()=> {
        /*crearUsuario()*/
        obtenerLista()
    },[])

    useEffect(()=> {
        actualizarLista()
    },[lista])

    const obtenerLista = async() => {
        try {
            const response = await fetch('https://assets.breatheco.de/apis/fake/todos/user/nessarz')
            const data = await response.json()
            // console.log(data)
            setLista(data)
        } catch(error) {
            console.log(error)
        }
    }

    const actualizarLista = async() => {
        try {
            const response = await fetch('https://assets.breatheco.de/apis/fake/todos/user/nessarz', {
                method: "PUT",
                body: JSON.stringify(lista),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()
        } catch (error) {
            console.log(error)
        }
    }

//Esta función agrega el valor nuevo
        
        function addDuty(e) {
            setToDo (e.target.value)
        }
//Esta función activa el enter
        function submit(e) {
            e.preventDefault();
            // console.log('submit')
            setLista ([...lista,{"label": toDo, "done": false}])
            // setToDoArray ([...toDoArray,toDo])
        }
//Esta función borra los elementos
        function borrar (id) {
            let duties = []
            duties = lista.filter((item,index) => {
                if (index !== id) {
                    return item
                }
            })
            setLista(duties)
        }


	return (
        <>
            <div className='container'>
                <h1 className="text-light fw-light text-center">to do's</h1>
                <form onSubmit={submit} className="w-50 m-auto">
                        <input type="text" onChange={addDuty} value={toDo} aria-label=".form-control-lg example"/>
                        <ul className="list-group list-group-flush" >
                            {lista.map((item, id) => 
                            <li key={id} >{item.label}<button className="btn" onClick={() => borrar(id)} type= "button" >✕</button></li>
                            )}
                            <li><h6>{lista.length} items left</h6></li>
                        </ul>
                </form>
            </div>
        </>
    );
};

export default ToDoList;