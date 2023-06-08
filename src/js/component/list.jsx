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
    })

    const obtenerLista = async() => {
        try {
            const response = await fetch('https://assets.breatheco.de/apis/fake/todos/user/nessarz')
            const data = await response.json()
            /*console.log(data)*/
            setLista(data)
        } catch(error) {
            console.log(error)
        }
    }

//Esta función agrega el valor nuevo
        
        function addDuty(e) {
            setToDo (e.target.value)
        }
//Esta función activa el enter
        function submit(e) {
            console.log('submit')
            setToDoArray ([...toDoArray,toDo])
            e.preventDefault();
        }
//Esta función borra los elementos
        function borrar (id) {
            let duties = []
            duties = toDoArray.filter((item,index) => {
                if (index !== id) {
                    return item
                }
            })
            setToDoArray(duties)
        }


	return (
        <>
            <div className='container'>
                <h1 className="text-light fw-light text-center">to do's</h1>
                <form onSubmit={submit} className="w-50 m-auto">
                        <input type="text" onChange={addDuty} value={toDo} aria-label=".form-control-lg example"/>
                        <ul className="list-group list-group-flush" >
                            {toDoArray.map((item, id) => 
                            <li key={id} >{item}<button className="btn" onClick={() => borrar(id)} type= "button" >✕</button></li>
                            )}
                            <li><h6>{toDoArray.length} items left</h6></li>
                        </ul>
                </form>
            </div>
        </>
    );
};

export default ToDoList;