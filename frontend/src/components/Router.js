import { BrowserRouter ,Route, Switch } from "react-router-dom";
import Home, { carouselItem } from './Home';
import Filter from './Filter';
import cart from './cart';
import Details from "./Details";

function Router(){
       return(
           
           <BrowserRouter>
           
          
           <Route exact path="/" component={ Home} /> 
           <Route path="/filter" component={Filter} />
           <Route  path="/cart" component={cart} />
          <Route path="/details" component={Details}/> 
           
           </BrowserRouter>
           
       )
}

export default Router;