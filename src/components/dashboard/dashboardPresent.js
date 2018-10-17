/**
 * This is the home page of bodha onboarding application.
 * @author : Bala
 * File Name : dashboardPresent.js
 * Path : src/components/
 * Created Date : 14th Nov 2017
 */

import React from 'react';
import  PropTypes  from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import Header from '../common/header';
import Footer from '../common/footer';
import * as contentActions from '../../actions/content/contentActions';
import * as stageActions from '../../actions/stage/stageActions';
import * as userActions from '../../actions/user/userActions';
import * as currentStageActions from '../../actions/stage/currentStageActions';

class DashboardPresent extends React.Component {
	constructor(props,context) {
		super(props,context);
		this.viewContent = this.viewContent.bind(this);
	}

	componentDidMount() {
		setTimeout(function(){
			$('.bxslider').bxSlider();
			$('.VideoSec').each(function(){  
				let highestBox = 0;
				$('.EquHeightVid', this).each(function(){
				 if($(this).height() > highestBox) {
					highestBox = $(this).outerHeight(); 
				  }
				});  
				$('.EquHeightVid').css("min-height",highestBox+"px");
			  });
			  $(window).bind("resize",function() {
				  $('.EquHeightVid').css("min-height","");
				  let highestBox = 0;
				  $('.EquHeightVid').each(function(){
					  if($(this).height() > highestBox) {
							highestBox = $(this).outerHeight(); 
					  }
				  });
				  $('.EquHeightVid').css("min-height",highestBox+"px");	
			  });
		},500);
	}

	viewContent(e){
		console.log("came to view content")
		let userDetails =  this.props.userDetails;
		
		if(Object.keys(userDetails).length > 0){
			let linkElement = e.currentTarget;
			let redirectLink =  $(linkElement).attr("data-link");
			if(location.pathname != redirectLink){
				let that = this;
				let currentStage = (redirectLink).replace("/","").toUpperCase();
				this.props.actions.loadStages(userDetails.userName,this.props.loginDetails.accessToken).then(() => {
					setTimeout(function(){
						let curentStageData = that.props.stageDetails[currentStage];
						that.props.actions.loadCurrentStages(curentStageData);
					},50);
					setTimeout(function(){
						that.context.router.push(redirectLink);
						let subStageGroupBy =  that.props.currentStageDetails;
						let SubStageNames = Object.keys(subStageGroupBy);
						let currentContent = subStageGroupBy[SubStageNames[0]];
						if(currentContent != undefined){
							that.props.actions.loadContent(currentContent[0]['id'],that.props.loginDetails.accessToken);
						} else{
							that.props.actions.removeContent();
						}
					},100);
				});													
			}
		} else {
			$("html, body").animate({scrollTop:0}, 500, 'swing');
			if(! $('.LoginTxt').hasClass('Active')){
				$('.LoginTxt').trigger('click');
				$(".ErrorTxt").text("Please login to view content.");
			}
		}
	}

	render() {
		let userDetails =  this.props.userDetails;
		return (
			<div>
				<Header />
				<section className="SliderSection">
						<div className="Slider">
							<div className="bxslider">
								<div>
									<img src={require('../../images/Slide-1.png')} title="" />
									<div className="SliderTxt">
										<h1>Cognizant Digital Engineering (CDE)</h1>
										{/* <p>A foundation for tomorrow’s technology & practices.</p> */}
									</div>
								</div>
								<div>
									<img src={require('../../images/Slide-2.png')} title="" />
									<div className="SliderTxt">
										<h1>Openshift's Container Orchestration</h1>
										{/* <p>Simplifying move to cloud to help focus on business agility.</p> */}
									</div>
								</div>
								<div>
									<img src={require('../../images/Slide-3.png')} title="" />
									<div className="SliderTxt">
										<h1>Openshift Works On Docker Container</h1>
										{/* <p>Next-Gen Architecture for modern enterprise for innovation & value.</p> */}
									</div>
								</div>
							</div>
						</div>
					</section>
					<div className="MainContent">
					<section>
						<div className="container VideoSec">
							<div className="TwoColumn tleft EquHeightVid">
								<div className="GeneralInfo video-container">
									<iframe src="https://www.youtube.com/embed/D_Lj0rObunI" frameBorder="0" allowFullScreen webkitAllowFullscreen></iframe>
								</div>
							</div>
							<div className="TwoColumn fltright EquHeightVid">
								<div className="UserInfo">
									<h4>{Object.keys(userDetails).length > 0 ? userDetails.firstName : "What Is Red Hat's Openshift ?"}</h4>
									<p>Red Hat, Inc. the world's leading provider of open source solutions, brings you OpenShift Enterprise. The first enterprise-ready web-scale container application platform based on Docker formated Linux containers, Kubernetes orchestration and Red Hat Enterprise Linux 7, providing full support from the operating system to application runtimes.</p>
									<div className="ReadMore">
										<p><a href="https://www.openshift.com/" target="_blank" onclick="javascript:_paq.push(['trackEvent', 'ReadMoreButton', 'CDE_Outlink']);"><span className="VerticalAlign"><img src={require('../../images/left_arrow_small.png')} alt="Arrow" /></span><span className="VerticalAlign">Read More</span></a></p>
									</div>
								</div>
							</div>
						</div>
					</section>
					<section>
						<div className="container">
							<div className="ProcessTitle">
								<div className="DivLink" data-link="/discover" onClick={this.viewContent}>
									<div className="ThreeColumn thleft">
										<div className="ProcessImage Discover">
											<div className="ImagesMiddle">
												<img src={require('../../images/discover.png')} alt="Discover" />
											</div>
										</div>
										<div className="ProcessTxt">
											<h4 className="Disc"><strong>Lift & Shift</strong></h4>
											<p>Strategy for moving an application or operation from one environment to another – without redesigning the app.</p>
										</div>
									</div>
								</div>
								<div className="DivLink" data-link="/assimilate" onClick={this.viewContent}>
									<div className="ThreeColumn thleft">
										<div className="ProcessImage Assimilate">
											<div className="ImagesMiddle">
												<img src={require('../../images/Assimilate.png')} alt="Assimilate" />
											</div>
										</div>
										<div className="ProcessTxt">
											<h4 className="Assimi"><strong>Refactor</strong></h4>
											<p>The process of restructuring existing computer code—changing the factoring—without changing its external behavior.</p>
										</div>
									</div>
								</div>
								<div className="DivLink" data-link="/learn" onClick={this.viewContent}>
									<div className="ThreeColumn">
										<div className="ProcessImage Learn">
											<div className="ImagesMiddle">
												<img src={require('../../images/learn.png')} alt="Learn" />
											</div>
										</div>
										<div className="ProcessTxt">
											<h4 className="Lean"><strong>Replatform</strong></h4>
											<p>Replatform approach allows developers to reuse the resources they are accustomed to working with such as legacy programming languages, development frameworks, and existing caches in the application. </p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
				<Footer footerLink="Discover"/>
			</div>
		);
	}
}

function mapStateToProps (state, ownProps) {
	return {
		loginDetails: state.login,
		userDetails: state.userInfo,
		contentDetails : state.content,
		stageDetails : state.stage,
		currentStageDetails : state.currentStage
  }
}

function mapDispatchToProps(dispatch) {
	return {
		actions:bindActionCreators(Object.assign({},contentActions,stageActions,currentStageActions,userActions),dispatch)
	}
}

DashboardPresent.propTypes={ 
	
};

DashboardPresent.contextTypes = {
	router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps,mapDispatchToProps)(DashboardPresent);
