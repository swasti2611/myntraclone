import React from "react";
import { withRouter } from "react-router";
import '../Styles/home.css';
import '../Styles/image.css';
import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import images from './image'

import { Carousel } from "react-bootstrap";








class Wallpaper extends React.Component{
    

    render(){
        const { SelectListData}= this.props;
        return(
           
    <div className="container-fluid crousel-wrapper">
    <Carousel>
      {
        images && images["carousel-images"].map(item=>{
          return(  <Carousel.Item>
          <img
            className="d-block w-100"
            src={item}
            alt="First slide"
            width="100%"
            
          />
        
           </Carousel.Item>
          )
        })
      }

 </Carousel>

         
        
           
        
               



</div>
            
          )
     }
}
export default withRouter( Wallpaper);