import React , { Component} from 'react';
import BT from '../Elements/Button/BT.js';
import CategoryListStyle from './CategoryList.css';
import Title from '../Elements/Title/Title.jsx';
import backImg from './arrow.png'
import img1 from './icon_stock/1.png';
import img2 from './icon_stock/2.png';
import img3 from './icon_stock/3.png';
import img4 from './icon_stock/4.png';
import img5 from './icon_stock/5.png';
import img6 from './icon_stock/6.png';
import img7 from './icon_stock/7.png';

class CategoryList extends Component {
	constructor(props) {
    super(props);
		this.state = {
			data: []
		}
		this.menuList = this.menuList.bind(this);
		this.goBack = this.goBack.bind(this);
	}

	componentWillMount(){
    this.menuList();
  }
	menuList(){
		this.setState({data:JSON.parse(localStorage.getItem("Dish_Categoty"))})
		console.log(this.state.data);

	}
	getDishByCategories(id){

		// console.log(id);
		fetch('http://54.37.125.180:8080//dish/get_by_category?dish_category_id='+id,
		{   mode:'cors',
				method: 'GET',
		})
		.then(res=>{
			res.json().then(res=>{
		localStorage.setItem("Dish_List",JSON.stringify(res));
		this.props.history.push('/dish_list');
      })
		})
	}
	goBack(){
		this.props.history.push('/bill');
	}


	render(){
		let img = ['',img1,img2,img3,img4,img5,img6,img7];
	    let categoryBt = this.state.data ? this.state.data.map((item, i)=>{
	      return(
	        <div className="col-CategoryList">
	          <div className="stock_to_cat-CategoryList" onClick = {()=>{this.getDishByCategories(item.id) }}>
							<img src={img[item.id]}/>
	            <BT BTname={item.name} id = {i} myStyle="bt_cat-CategoryList" press = {()=>{this.getDishByCategories(item.id) }}/>
	          </div>
	        </div>
	      )
	    }):'';

		return(
			<div>
				<div className="nav_bar_wrapper-CategoryList">
					<div className="nav_bar-CategoryList">
						<BT BTname="Вернуться" myStyle="bt_back-CategoryList" press={this.goBack}/>
						<Title cssClass="title-CategoryList" text="Категории" />
					</div>
				</div>
				<div className="container-CategoryList">
					<div className="category-container-CategoryList">
						{categoryBt}
					</div>
				</div>
			</div>

		)
	}

}

export default CategoryList;

// made by ArtemSvets
