import React from 'react';
import cookie from 'react-cookies' 
import { getAllUser } from './utils';

class Login extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      users : { data : [] }
    }
  }

  componentDidMount(){
    this.fetchUser()
  }

  fetchUser = async (page = 1) => {
    const res = await getAllUser(page)
    if(res.status){
      this.setState({users: res.data})
    }
  }

  logout = async () => {
    await cookie.remove('token')
    this.props.history.push('/')
  }

  pagination = () => {
    const { users : { total_pages, page } } = this.state
    const pageNumber = []
    if(total_pages){
      for ( let i = 1; total_pages >= i; i++ ) {
        pageNumber.push(i)
      }
      const pageElm = pageNumber.map((val, key)=>{
        return(
          <li key={key} className={ page == val ? 'page-item active' : 'page-item'}><a className="page-link" href="#" onClick={()=>this.fetchUser(val)} >{val}</a></li>
        )
      })
      return pageElm
    }
  }

    render(){
        const { users : { data } } = this.state
        return(
           <div className="container">
             <button type="submit" onClick={() => this.logout()} className={'btn btn-primary mt-5 mb-5 float-right' }>Logout</button>
              <table className="table table-bordered mt-5">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data && data.length > 0 ? data.map((val, key)=>{
                      return(
                        <tr key={key}>
                          <td>{`${val.first_name} ${val.last_name}`}</td>
                          <td>{val.email}</td>
                          <td><a className="link" href={`/user/${val.id}`}>View</a></td>
                        </tr>
                      )
                    }) : 
                    <tr>
                      <td colSpan="3">No Data Found!</td>
                    </tr>
                  }
                </tbody>
              </table>
              <div className="float-right">
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    { this.pagination() }
                  </ul>
                </nav>
              </div>
           </div>
        )
    }
}

export default Login