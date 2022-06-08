import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Card, Radio, Spinner } from '@components';

import './Home.css';
import { getProductData } from './Home.action';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            skip: 1,
            limit: 10,
            rating: null,
            category: null,
        };
    }

    static fetchData({ store }) {
        return store.dispatch(getProductData(0, 10, null, null));
    };

    componentDidMount() {
        //this.getProductByFilter();
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.productData !== this.props.productData) {
            const { skip } = this.state;
            const { isSuccess, isFailure, error } = this.props.productData;

            if(isSuccess) {
                this.setState({ skip: skip + 1 });
            }
            else if(isFailure) {
                alert(error);
            }    
        }
    }

    getProductByFilter() {
        const { skip, limit, rating, category } = this.state;
        this.props.actions.getProductData(skip, limit, rating, category);        
    }
    
    onSelect(event) {
        const { name, value, checked } = event.target;
        this.setState({
            skip: 0,
            [name]: value
        }, () => {
            this.getProductByFilter();
        });
    };

    render() {
        const { history, productData } = this.props;

        const { isLoading, data } = productData; 

        const category = [
            'Mobile', 'Laptop' 
        ];

        const rating = [
            '1', '2', '3', '4', '5'
        ]
        
        return (

            <div className='flex-container'>
                <div className='side'>

                    <div className='filter'>
                        
                        <br />
                        
                        <div className='filter-heading font-size--large'>
                            <div>Category</div>
                            <hr/>
                        </div>  
                        <div className='filter-content'>
                            {
                                category.map((value, index) => <Radio key={index} value={value} name='category' onClick={(event) => this.onSelect(event)} />)
                            }
                        </div>
                        
                        <br />

                        <div className='filter-heading font-size--large'>
                            <div>Rating</div>
                            <hr/>
                        </div>  
                        <div className='filter-content'>
                            {
                                rating.map((value, index) => <Radio key={index} value={value} name='launch' onClick={(event) => this.onSelect(event)} />)
                            }
                        </div>

                        <br />

                    </div>

                </div>

                <div className='main'>
                    <div className='product'> 
                    {
                        isLoading
                            ? <Spinner /> 
                            : data.map((product, index) => 
                                <Card key={index} product={product} history={history} />
                            )
                    }
                    </div>
                </div>

            </div>    
        )
    }
}


const mapStateToProps = (state) => {
    return {
        productData: state.home
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({getProductData}, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);