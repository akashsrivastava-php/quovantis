import React from 'react';
import { toast } from 'react-toastify'; 
import SimpleReactValidator from 'simple-react-validator';
import { login } from './utils';

class Login extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            loading: false
        }
        this.validator = new SimpleReactValidator({autoForceUpdate: this});
    }

    handelChange = (e) => {
        this.setState({[e.name]: e.value})
    }

    handelSubmit = async (e) => {
        const { email, password } = this.state
        e.preventDefault()
        if (this.validator.allValid()) {
            this.setState({loading: true})
            const res = await login({ email, password })
            if(res.status){
                this.myFormRef.reset();
                toast.success('Logged in successfully')
                this.props.history.push('/dashboard')
            }else{
                toast.error(res.msg)
            }
            this.setState({loading: false})
        } else {
            this.validator.showMessages();
        }
    }

    render(){

        const { email, password, loading } = this.state

        return(
           <div className="container">
               <div className="row mt-5">
                    <div className="card m-auto col-8 col-md-8 col-sm-8 col-lg-8">
                        <div className="card-body">
                            <form onSubmit={(e)=>this.handelSubmit(e)} ref={(el) => this.myFormRef = el}>
                                <div className="form-group">
                                    <label for="formGroupExampleInput">Username</label>
                                    <input type="text" name="email" onChange={(e)=>this.handelChange(e.target)} className="form-control" id="formGroupExampleInput" placeholder="Enter User Name"/>
                                    <span className="text-danger">{this.validator.message('email', email, 'required|email')}</span>
                                </div>
                                <div className="form-group">
                                    <label for="formGroupExampleInput2">Password</label>
                                    <input type="password" name="password" onChange={(e)=>this.handelChange(e.target)} className="form-control" id="formGroupExampleInput2" placeholder="Enter Password"/>
                                    <span className="text-danger">{this.validator.message('password', password, 'required')}</span>
                                </div>
                                <button type="submit" className={ loading ? 'btn btn-primary disabled' : 'btn btn-primary' }>{ loading ? 'Processing...' : 'Sign in' }</button>
                            </form>
                        </div>
                    </div>
                </div>
           </div>
        )
    }
}

export default Login