import React from 'react';
import queryString from 'query-string';
import Modal from 'react-modal';


import { withRouter } from "react-router";
import "../Styles/Filter.css";
import axios from 'axios';




class Filter extends React.Component {
  constructor(){
    super();
    this.state = {
      NewCollections: [],
      selectlists:[],
      page:[],
      selectlist:undefined,
      category:undefined,
      brand:undefined,
      lcost:undefined,
      hcost:undefined,
      sort:undefined,
      page:undefined,
  
    
    }
  }
  
 

  componentDidMount(){
    const qs = queryString.parse(this.props.location.search);
    const { category, selectlist}=qs;

    const filterObj = {
      category: category,
      selectlist: selectlist
    };
    
  


    axios({
      url:'http://localhost:2000/filter',
      method:'POST',
      header:{'Content-Type':'application/json'},
      data: filterObj

  })
  .then(response=>{ this.setState({ NewCollections : response.data.NewCollections ,category:category,  selectlist:selectlist, page: response.data.page }) 
})
  .catch()

  
  axios({
    url:"http://localhost:2000/selectitems",
    method:'GET',
    header:{'Content-Type':'application/json'}
})
.then(response=>{ this.setState({ selectlists : response.data.selectlists}) })
.catch()
  }

  handleselectlistChange = (event)=> {
    const selectlist = event.target.value;
    const {category,  lcost, hcost, sort, page} = this.state
    const filterObj = {
          selectlist: selectlist,
           category :category,
           
           lcost:lcost,
           hcost:hcost,
           sort:sort, 
           page:page

    };
    axios({
      url:"http://localhost:2000/filter",
      method:'POST',
      header:{'Content-Type':'application/json'},
      data: filterObj

  })
  .then(response=>{ this.setState({ NewCollections : response.data.NewCollections, selectlist}) 
})
  .catch()

  this.props.history.push(`/filter?category=${category}&selectlist=${selectlist}`);
 }
 
 handleSortChange= (sort)=>{
  const {category , selectlist, cuisine, lcost,  hcost, page } = this.state
  const filterObj = {
        selectlist: selectlist,
         category :category,
        
         lcost:lcost,
         hcost:hcost,
         sort:sort, 
         page:page
         

  };
  axios({
    url:"http://localhost:2000/filter",
    method:'POST',
    header:{'Content-Type':'application/json'},
    data: filterObj

})
.then(response=>{ this.setState({ NewCollections : response.data.NewCollections, sort:sort,page: response.data.page }) 
})
.catch()
 }




handlePageChange = (page)=>{

  const {category, selectlist, sort, cuisine, lcost, hcost } = this.state;
    const filterObj = {
        selectlist: selectlist,
         category :category,
         cuisine : cuisine.length == 0 ? undefined : cuisine,
         lcost:lcost,
         hcost:hcost,
         sort:sort, 
         page:page

  };
  axios({
    url:"http://localhost:2000/filter",
    method:'POST',
    header:{'Content-Type':'application/json'},
    data: filterObj

})
.then(response=>{ this.setState({ NewCollections : response.data.NewCollections , page : response.data.page }) 
})
.catch()
}

handleCostChange = (lcost, hcost) => {
  /* This function will be invoked on cost filter value change from filter page,
   and would automatically invoke filter API to fetch the updated restaurants basis the changed selection */

  const { selectlist, cuisine,  category, sort, page } = this.state;

  // making the input object for filter API basis changed cost
  let filterObj = {
        selectlist: selectlist,
         category :category,
         
         lcost:lcost,
         hcost:hcost,
         sort:sort, 
         page:page
  };

  // Update the URL basis the changed selections
  

  axios({
      method: 'POST',
      url: 'http://localhost:2000/filter',
      headers: { 'Content-Type': 'application/json' },
      data: filterObj
  })
      .then(res => this.setState({
        NewCollections: res.data.NewCollections,
          lcost: Number(lcost),
          hcost: Number(hcost),
          page: res.data.page
      }))
      .catch(err => console.log(err))
}





handleCuisineChange = (brand)=>{
  const {category , selectlist,  lcost, sort, hcost, page } = this.state
  const filterObj = {
        selectlist: selectlist,
         category :category,
        brand:brand,
         lcost:lcost,
         hcost:hcost,
         sort:sort, 
         page:page
         

  };
  axios({
    url:"http://localhost:2000/filter",
    method:'POST',
    header:{'Content-Type':'application/json'},
    data: filterObj

})
.then(response=>{ this.setState({ NewCollections : response.data.NewCollections, brand:brand,page: response.data.page }) 
})
.catch()
 
 
 
}

handleNavigat = (resId) => {
  this.props.history.push(`/details?Newcollection=${resId}`);
}




render()
{
  const { NewCollections, selectlists, page ,itemsModalIsOpen, formModalIsOpen, galleryModalIsOpen,  handleNavigate,menuItems, subTotal  }=this.state;
  
  return (
      <div>
        <script type="text/javascript">
          var not1 = document.queryselector('h1');
        </script>

<div className="container-fluid">
        

        <div className="row">
          <div className="all-content">
          <div className="col-lg-3 col-sm-12">
            <div className="collapse-filter-block">
              <div className="collapse-head">Filters/Sort</div>
              <div className="fas fa-chevron-down down-arrow me-3 mt-2 chervon"
                data-bs-toggle="collapse" data-bs-target="#filter" aria-expanded="false"></div>
            </div>
            <div className="filtercontainer" id="filter">
              <div className="filter-heading">Filters</div>
              <div className="Selectselectlist"> 
              <label>Select selectlist</label></div>
              <select className="" onChange={this.handleselectlistChange}>
                                      <option value="0"> select  selectlist</option>
                                        {selectlists && selectlists.map((selectlists, index ) => {
                              return <option key={selectlists.selectlist_id} value={selectlists.selectlist_id}>{`${selectlists.name}, ${selectlists.city}`}</option>
                          })}   


                                                                              </select>
              <div className="subhead">BRAND</div>
              <div className="checkbox">
                <label><input type="checkbox" name="cuisine" onChange={()=> this. handleCuisineChange(1)}/>MITERA</label>
              </div>
              <div className="checkbox">
                <label><input type="checkbox" name="cuisine" onChange={()=> this. handleCuisineChange(2)}/>ANOUK</label>
              </div>
              <div className="checkbox">
                <label><input type="checkbox" name="cuisine" onChange={()=> this. handleCuisineChange(3)}/>CHENAI SILK</label>
              </div>
              <div className="checkbox">
                <label><input type="checkbox" name="cuisine"  onChange={()=> this. handleCuisineChange(4)} />POTHYS</label>
              </div>
              <div className="checkbox">
                <label><input type="checkbox" name="cuisine"   onChange={()=> this. handleCuisineChange(5)}/>INDDUS</label>
              </div>

             
              <div className="subhead">Cost for two</div>
              <div className="checkbox">
                <label><input type="radio" name="optradio" onChange={()=>this.handleCostChange(1, 500)} />Less than &#8377; 500</label>
              </div>
              <div className="checkbox">
                <label><input type="radio" name="optradio" onChange={()=>this.handleCostChange(500, 1000)} /> &#8377; 500 to  &#8377;1000</label>
              </div>
              <div className="checkbox">
                <label><input type="radio" name="optradio" onChange={()=>this.handleCostChange(1000, 1500)}/> &#8377; 1000 to  &#8377;1500</label>
              </div>
              <div className="checkbox">
                <label><input type="radio" name="optradio" onChange={()=>this.handleCostChange(1500, 2000)} /> &#8377; 1500 to  &#8377;2000</label>
              </div>
              <div className="checkbox">
                <label><input type="radio" name="optradio" onChange={()=>this.handleCostChange(20000, 50000)} /> &#8377; 2000+</label>
              </div>

              <div className="subhead">Sort</div>
              <div className="checkbox">
                <label><input type="radio" name="sort"  onChange={()=>this.handleSortChange(1)}/>Price low to high</label>
              </div>
              <div className="checkbox">
                <label><input type="radio" name="sort" onChange={()=>this.handleSortChange(-1)}/>Price high to low</label>
              </div>
            </div>
          </div>
          </div>
          </div>
          <div className="col-lg-9 col-sm-12">
            <div className="container">
              <div className="row">

          <div className="secondside">
            {NewCollections  && NewCollections. length  > 0 ?  NewCollections.map((item, index)=>{
              return <div className="Rectangle-two" key={item,index } onClick={()=> this.handleNavigat(item._id)}> 
                 
                        
                          <img src={`./${item.image}`} class="images" />
                          <div className="product-productMetaInfo">
                          <div className="item-2 col-sm-12" product-name>{item.name}</div>
                            <div className="speciality col-sm-12" >{item.speciality}</div>
                          <div className="RS col-sm-12"> RS</div> 
                          <div className ="price-2 col-sm-12"> {item.min_price}</div>
                         

                       </div>
                        </div>
                        
                        
                        
            }) : <div className="noData"> No Data Found</div>}
            </div>
            
        </div>

            </div>
          
            </div>
 </div>
</div>
  )
}
}

export default  Filter;
