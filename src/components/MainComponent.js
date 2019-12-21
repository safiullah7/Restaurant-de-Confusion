import React, {Component} from 'react';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import About from './AboutComponent';
import DishDetail from './DishdetailComponent';
import {Switch,Route,Redirect} from 'react-router-dom';
import { parse } from 'querystring';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      promotions: PROMOTIONS,
      leaders: LEADERS,
      comments: COMMENTS
    };
  }
  
  render() {
    const HomePage = () => {
      return (
        <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
              leader={this.state.leaders.filter((leader) => leader.featured)[0]}/>
      );
    };
    const DishWithId = ({match}) => {
      return (
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishid,10))[0]}
                    comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishid,10))} />
      );
    }
    return (
      <div>
        <Header/>
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route path="/contactus" component={Contact} />
          <Route exact path="/menu" component={ () => <Menu dishes={this.state.dishes}/> } />
          <Route path="/menu/:dishid" component={DishWithId}/>
          <Route path="/aboutus" component={() => <About leaders={this.state.leaders} />} />
          <Redirect to="/home" />
        </Switch>
        <Footer/>
      </div>
    );
  }
}

export default Main;
