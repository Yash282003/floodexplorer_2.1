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
    function formatDate(input) {

        var datePart = input.match(/\d+/g),
          year = datePart[0], // get only two digits
          month = datePart[1], day = datePart[2];
    
        return day + '/' + month + '/' + year;
      }
    // function gettwit() {
    //     requiredtwits.splice(0, requiredtwits?.length);
    //     notweets.splice(0, notweets?.length);
    //     tweetsanalysisdate.splice(0, tweetsanalysisdate?.length);
    
    //     var x = document.getElementById(twitstartdate").value
    //     var y = document.getElementById("twitenddate").value
    //     twitcountryselect = document.getElementById("twitcountry").value
    //     x = x.replace(/\-/g, '/');
    //     y = y.replace(/\-/g, '/');
    //     twitstart = formatDate(x);
    //     twitend = formatDate(y);
    //     //tweetdata-parsing
    //     for (var j = 0; j < twitsdata.length; j++) {
    
    //       twitdata = twitsdata[j]["twitdata"];
    //       tcountry = twitsdata[j]["CountryName"];
    //       console.log(twitdata);
    //       for (var i = 0; i < twitdata.length; i++) {
    //         tstartdate = twitdata[i]["Datetime"];
    //         tstartdate = tstartdate.replace(/\-/g, '/');
    
    
    //       var  d1 = twitstart.split("/");
    //        var d2 = twitend.split("/");
    //        var c1 = tstartdate.split("/");
    
    //         var from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]);  // -1 because months are from 0 to 11
    //         var to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
    //         var check1 = new Date(c1[2], parseInt(c1[1]) - 1, c1[0]);
    
    
    //         if ((check1 > from && check1 < to) && (twitcountryselect == tcountry)) {
    
    //           requiredtwits.push(twitdata[i]);
    
    
    
    //         }
    //       }
    //     }
    //     console.log(requiredtwits);
    
    
    //     twittab =";
    //     daterepeat = requiredtwits[0]["Datetime"];
    //     for (var k = 0; k < requiredtwits.length; k++) {
    
    //       if (daterepeat === requiredtwits[k]["Datetime"]) {
    //         tweetsondate = tweetsondate + 1;
    
    //       }
    //       else {
    //         notweets.push(tweetsondate);
    //         tweetsanalysisdate.push(daterepeat);
    //         tweetsondate = 1;
    //         daterepeat = requiredtwits[k]["Datetime"];
    //       }
    //       twittab += "<tr><td>" + k + "</td><td>" + requiredtwits[k]["Datetime"] + "</td><td>" + tcountry + "</td><td><img src='https://img.icons8.com/fluent/28/000000/twitter.png'/>   " + "<a add target='_blank'  href=" + "https://twitter.com/anyuser/status/".concat((requiredtwits[k]["Tweet Id"]).replace(/\#/g, '')) + ">https://twitter.com/anyuser/status/".concat(requiredtwits[k]["Tweet Id"]).replace(/\#/g, '') + "</a></td></tr>"
    
    
    //     }
        
    //     document.getElementById('twitsbody').innerHTML = twittab;
    //     console.log(notweets);
    //     console.log(tweetsanalysisdate)
    //     for (let i = 0; i < notweets?.length; i++) {
    //         dataPlot[tweetsanalysisdate[i]] = notweets[i];
    //     }
    //    console.log(dataPlot)
    //    setPlot(true)
    //   }
    
    //   const data={
    //     notweets,
    //     datasets: [{
    //         label: 'Tweet Analysis',
    //         data: dataPlot,
    //         backgroundColor: 'transparent',
    //         borderColor: '#0E75D3',
    //         borderWidth: 2
    //       }]
    //   }
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
