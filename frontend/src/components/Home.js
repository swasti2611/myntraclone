import React from "react";
import Wallpaper from './Wallpaper';
import Categorieslist from './Categorieslist';
import axios from 'axios';




class Home extends React.Component {
 constructor(){
     super();
     this.state = {
        SelectList:[],
         Categories:[]
     }
 }


componentDidMount(){
     

    axios({
        method: 'GET',
        url: 'http://localhost:2000/selectlist',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => this.setState({ SelectList: res.data.SelecList }))
        .catch(err => console.log(err))




        axios({
            method: 'GET',
            url: 'http://localhost:2000/categories',
            headers: { 'Content-Type': 'application/json' }
        }).then(res => this.setState({ Categories: res .data.Categories }))
            .catch(err => console.log(err))

    


}    


            
   



render(){
    const { SelectList, Categories}= this.state;
        return(
            <React.Fragment>
            <Wallpaper  SelectData = {SelectList} />
             <Categorieslist  Categorydata={Categories} />
             </React.Fragment>            
     
        )

    }
}


export default Home;