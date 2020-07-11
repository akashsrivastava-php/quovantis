import React from 'react';
import { toast } from 'react-toastify';
import { getUser } from './utils';

class Login extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            user: {},
        }
    }

    async componentDidMount(){
      const { match : { params : { id } } } = this.props
      const res = await getUser(id)
      if(res.status){
        this.setState({user: res.data.data})
      }else{
        toast.error(res.msg)
      }
    }

    render(){

        const { user } = this.state
        console.log(user)
        return(
           <div className="container">
               <div className="row mt-5 text-center">
                    <div className="card m-auto col-8 col-md-8 col-sm-8 col-lg-8 bg-light">
                        <div className="card-body">
                          {
                            user && user.id ?
                            <>
                              <img alt={user.first_name} src={user.avatar} className="rounded-circle"/>
                              <h5 className="mt-3">{`${user.first_name} ${user.last_name}`}</h5>
                              <h6 className="mt-3">{user.email}</h6>
                            </>
                            :
                            <div class="spinner-border" style={{width: '3rem', height: '3rem'}} role="status">
                              <span class="sr-only">Loading...</span>
                            </div>
                          }
                        </div>
                    </div>
                </div>
              <div className="row mt-5">
                <button type="submit" onClick={() => this.props.history.push('/dashboard')} className={'btn btn-primary m-auto mt-5' }>Back</button>
              </div>
           </div>
        )
    }
}

export default Login