import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'


function List({data,setData}) {
  const remove = (id) => {
    // console.log(`${process.env.REACT_APP_SERVER}/abc/${id}`)
    axios.delete(`${process.env.REACT_APP_SERVER}/abc/${id}`)
    .then(res=>{
      console.log(res.data)
    }) 

  }
  return (
    <>
    {
      data.map(obj => (
      <li key = {obj.id}>
        {obj.msg}
        <button onClick={() => {remove (obj.id)}}>삭제</button>
      </li>
      ))
    }
    </>
  )
}

function Write() {
  let insert = (e) => {
    e.preventDefault();
    let msg = e.target.msg.value;
    axios.post(`${process.env.REACT_APP_SERVER}/insert`, {msg})
    .then(res => {
      console.log(res.data)
    })
  }
  return (
    <div>
      <form onSubmit={insert}>
        <input type='text' name='msg' />
        <input type='submit' value='저장' />
      </form>
    </div>
  );
}


function App() {
  const [data,setData] = useState([]);

  const getData = () =>{
    axios.get(`${process.env.REACT_APP_SERVER}/abc`)
      .then(res => {
        setData(res.data);
      });
  }

  useEffect(() => {
    getData();
    // useEffect 안에 getData로 변수를 만들어서 넣는 이유 : 랜더링이 계속 일어나서 반복작업을 무한 반복하기때문에 한번만 일이나게 하기위해 useEffect를 작성해서 안에 넣어줌
  },[data])


/*   axios.post('http://localhost:3030/insert', {id: 1000, name : '신규데이터'})
  .then(res =>{
      console.log(res)

    }); */

  return (
    <div>
      <h2>한줄 댓글(7)</h2>
      <Write />
      <ul>
        <List data={data} setData = {setData}/>
        {/* data = {data} <- 이게 props */}
      </ul>
    </div>
  );
}

export default App;
