import React from "react";
import '../Styles/home.css';
import SearchCategoriesData from "./SearchCategoriesData";
class Categorieslist extends React .Component{
    render(){
      const { Categorydata} = this.props
    return(
            
<div>
<div className="container-fluid">
            <div className="col-12 categories-to-bag"><h1>CATEGORIES TO BAG</h1></div>
            
            
            <div className="row">
            <div className="content-1" >
                
                    { Categorydata.map((item,index)=>{
                        return <SearchCategoriesData item={item } />
                     
                    })}
                     </div>
                
                  </div>
                  
            </div>

        </div>




               
                 
                
        )
    }

}
export default Categorieslist;