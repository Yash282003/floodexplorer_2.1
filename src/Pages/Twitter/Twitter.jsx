import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import TweetChart from '../../components/TweetChart/TweetChart';
const Twitter = () => {
const [twitsdata,setTwitsData]=useState([])
const [showData,setShowData]=useState([])
const [loading,setLoading]=useState(true)
const [plot,setPlot]=useState(false)
    async function fetchTwits(){
        const twits=await fetch('http://localhost:7000/tweets?sDate=05-10-2002&eDate=06-12-2011')
        const rep=await twits.json()
        setShowData(rep)
        setTwitsData(countTweetsByDate(rep))
    }

    function countTweetsByDate(data) {
        let tweetCounts = {};
      
        for (let i = 0; i < data.length; i++) {
          let tweet = data[i];
          let date = new Date(tweet.Datetime).toISOString().split('T')[0];
      
          if (tweetCounts[date]) {
            tweetCounts[date]++;
          } else {
            tweetCounts[date] = 1;
          }
        }
      
        return tweetCounts;
      }


  return (
    <>
  <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand" id="#tab" href="#"><i class="fa fa-twitter white"></i>&nbsp;Twitter Tab</a>
        <div class="navbar-icon-container">

          <a href="#" class="navbar-icon pull-right visible-xs" id="nav-btn"><i class="fa fa-bars fa-lg white"></i></a>
          <a href="#" class="navbar-icon pull-right visible-xs" id="sidebar-toggle-btn"><i
              class="fa fa-search fa-lg white"></i></a>
        </div>

      </div>

 </div>
                       </div>

  <div class="container">

    <div class="form-title text-center">
      <h2 class="text-dark">Search Flood Data On Twitter</h2>
      <span class="text-light">Use the below form to search tweets</span>
    </div>

    <div class="new_flood">

      <div class="form-group">
        <label for="start-date" class="text-light">Flood Start Date</label><br/>
        <input type="date" name="StartDate" id="twitstartdate" required/>
      </div>
      <div class="form-group">
        <label for="end-date" class="text-light">Flood End Date</label><br/>
        <input type="date" id="twitenddate" name="EndDate" required/>
      </div>
      <div class="form-group">
        <label for="country" class="text-light">Country</label><br/>

        <select id="twitcountry" name="CountryName">
        <option value="Bangladesh">Bangladesh</option>
          <option value="India">India</option>
          <option value="Indonesia">Indonesia</option>
          <option value="Japan">Japan</option>
          <option value="Laos">Laos</option>
          <option value="Malaysia">Malaysia</option>
          <option value="Philippines">Philippines</option>
          <option value="Srilanka">Srilanka</option>
          <option value="Thailand">Thailand</option>
          <option value="Vietnam">Vietnam</option>
        </select>
      </div>

      <div class="form-group">

        <button type="submit" onClick={()=>fetchTwits()} class="button button1">Submit</button>
      </div>
    </div>


  </div>
  <div id="graph">
  
     <TweetChart tweetCounts={twitsdata}/>
  

  </div>
  <div id="tweet-table">

    <main id="site-main">
      <div class="container">



        <table class="table twittable">
          <thead class="thead-dark">
            <tr>
              <th>S.N.</th>
              <th>StartDate</th>

              <th>Country</th>
              <th>Tweet</th>

            </tr>
          </thead>
          <tbody id="twitsbody">
            {showData?.map((e,index)=>{
              return (
                <>
                 <td>
                   <tr>{index+1}</tr>
                   <tr>{e.Datetime}</tr>
                   <tr>India</tr>
                  <tr><a href={`https://twitter.com/anyuser/status/${e.id}`} target="_blank" rel="noopener noreferrer">https://twitter.com/anyuser/status/${e.id}</a></tr>
                 </td>
                </>
              )
            })}
          </tbody>
        </table>


      </div>
    </main>
 
  </div>
    </>
  )
}

export default Twitter
