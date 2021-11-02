import React from 'react';
import queryString from 'query-string';
import axios from 'axios';
import '../Styles/details.css';
import Modal from 'react-modal';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'antiquewhite',
        border: 'solid 1px brown',
        width: '1014',
        height: '238'
        },
  
};

class Details extends React.Component {
    constructor() {
        super();
        this.state = {
            Newcollection: {},
            itemsModalIsOpen: false,
            formModalIsOpen: false,
            galleryModalIsOpen: false,
            restaurantId: undefined,
            Products:[],
            subTotal: 0,
            name: undefined,
            email: undefined,
            conatctNumber: undefined,
            address: undefined
           
        }
    }

    componentDidMount() {
        const qs = queryString.parse(this.props.location.search);
        const {Newcollection} = qs;

        axios({
            url: `http://localhost:2000/collections/${Newcollection}`,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(respone => {
                this.setState({ Newcollection:respone.data.Newcollection,ProId:Newcollection})
            })
            .catch()


            
    }

    handleOrder = () => {
        const { ProId } = this.state;
        axios({
            url: `http://localhost:2000/productitem/${ProId}`,
            method: 'GET',
            headers: {'Content-Type':'application/json'}
        })
            .then(respone => {
                this.setState({Products:respone.data.Products,itemsModalIsOpen:true})
            })
            .catch()
    }

    handleModalState = (state, value) => {
        if (state == 'formModalIsOpen' && value == true) {
            this.setState({ itemsModalIsOpen: false });
        }
        this.setState({ [state]: value });
    }

    addItems = (index, operationType) => {
        let total = 0;
        const items = [...this.state.Products];
        const item = items[index];

        if (operationType == 'add') {
            item.qty += 1;
        }
        else {
            item.qty -= 1;
        }
        items[index] = item;
        items.map((item) => {
            total += item.qty * item.price;
        })
        this.setState({Products:items, subTotal: total });
    }

    handleInputChange = (event, state) => {
        this.setState({ [state]:event.target.value });
    }

    isDate(val) {
        // Cross realm comptatible
        return Object.prototype.toString.call(val) === '[object Date]'
    }

    isObj = (val) => {
        return typeof val === 'object'
    }

    stringifyValue = (val) => {
        if (this.isObj(val) && !this.isDate(val)) {
            return JSON.stringify(val)
        } else {
            return val
        }
    }

    buildForm = ({ action, params }) => {
        const form = document.createElement('form')
        form.setAttribute('method', 'post')
        form.setAttribute('action', action)

        Object.keys(params).forEach(key => {
            const input = document.createElement('input')
            input.setAttribute('type', 'hidden')
            input.setAttribute('name', key)
            input.setAttribute('value', this.stringifyValue(params[key]))
            form.appendChild(input)
        })
        return form
    }

    post = (details) => {
        const form = this.buildForm(details)
        document.body.appendChild(form)
        form.submit()
        form.remove()
    }

    getData = (data) => {
        return fetch(`http://localhost:2000/payment`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(err => console.log(err))
    }

    Payment = () => {
        const { subTotal, email } = this.state;

        const paymentObj = {
            amount: subTotal,
            email
        };

        this.getData(paymentObj).then(response => {
            var information = {
                action: "https://securegw-stage.paytm.in/order/process",
                params: response
            }
            this.post(information)
        })
    }

    
    render() {
        const { Newcollection ,NewCollections,item ,itemsModalIsOpen, formModalIsOpen, galleryModalIsOpen, Products, subTotal} = this.state;
        return (
            <div>
              {Newcollection.name}
              
              <div className="gallery" onClick={()=>this.getimage(item.image)}>
                            { Newcollection && Newcollection.thumb && Newcollection.thumb.map((image) => {
                                return <div className="gallery2" >
                                    <img src={image} style={{width:'100%'}}/>
                                </div>

                            })}
                            </div>
                
                <button class="btn-order" onClick={this.handleOrder}>add TO CART</button>
                <button className="btn btn-danger order-button" onClick={() => this.handleModalState }> Pay Now</button>
                


                <Modal
                    isOpen={itemsModalIsOpen}
                    style={customStyles}
                >
                    <div>
                        <div className="glyphicon glyphicon-remove" style={{ float: 'right', margin: '5px', height:'423',width: '686'}} onClick={() => this.handleModalState('itemsModalIsOpen', false)}></div>
                        <div >
                            
                            <h3 className="item-total">SubTotal : {subTotal}</h3>
                            <button className="btn btn-danger order-button" onClick={() => this.handleModalState('formModalIsOpen', true)}> Pay Now</button>
                            {Products && Products.map((item, index) => {
                                return <div style={{ width: '44rem', marginTop: '10px', marginBottom: '10px',height:'423',width: '686', borderBottom: '2px solid #dbd8d8' }}>
                                    <div className="card" style={{ width: '43rem', margin: 'auto' }}>
                                        <div className="row" style={{ paddingLeft: '10px', paddingBottom: '10px' }}>
                                            <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 " style={{ paddingLeft: '10px', paddingBottom: '10px' }}>
                                                <span className="card-body">
                                                    <h5 className="item-name">{item.name}</h5>
                                                    <h5 className="item-price">&#8377;{item.min_price}</h5>
                                                    <p className="item-descp">{item.speciality}</p>
                                                </span>
                                            </div>
                                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3"> <img className="card-img-center title-img" src={`../${item.image}`} style={{ height: '148',width:'150' }} />
                                                {item.qty == 0 ? <div><button className="add-button" onClick={() => this.addItems(index, 'add')}>Add</button></div> :
                                                    <div className="add-number"><button onClick={() => this.addItems(index, 'subtract')}>-</button><span style={{ backgroundColor: 'white' }}>{item.qty}</span><button onClick={() => this.addItems(index, 'add')}>+</button></div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })}
                            <div className="card" style={{ width: '44rem', marginTop: '10px', marginBottom: '10px', margin: 'auto' }}>

                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
            

        )
    }
}

export default Details;