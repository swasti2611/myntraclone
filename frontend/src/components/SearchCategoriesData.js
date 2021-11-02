import React from "react";
import {withRouter} from "react-router-dom";
import '../Styles/home.css';

class SearchCategoriesData extends React.Component{
    handleNavigate = (cat_type)=>{
        
            this.props.history.push(`/filter?category=${cat_type}`);
        }
        
    render(){
       
        const {item}=this.props;

        return(     <div onClick={ () => this.handleNavigate(item.cat_type)} key={item.cat_type}className="rectangle-one" >
                      
                       <img src={`./${item.image}`} className="images-1"/>
                       <div className="item-1"><h3>{item.name}</h3></div>
                   
                       </div>
    
        )
    }
}
export default withRouter( SearchCategoriesData);